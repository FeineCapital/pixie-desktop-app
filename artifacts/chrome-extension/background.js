// Per-tab activation state
const activeTabs = new Set();

/* ─── Helpers ─── */
function canInjectTab(url) {
  if (!url) return false;
  return !url.startsWith('chrome://') &&
         !url.startsWith('chrome-extension://') &&
         !url.startsWith('about:') &&
         !url.startsWith('edge://') &&
         !url.startsWith('devtools://');
}

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab || null;
}

async function activateTab(tabId, url) {
  if (!canInjectTab(url)) return false;
  try {
    await chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] });
    activeTabs.add(tabId);
    chrome.tabs.sendMessage(tabId, { type: 'ACTIVATE' }).catch(() => {});
    return true;
  } catch (e) {
    return false;
  }
}

async function deactivateTab(tabId) {
  activeTabs.delete(tabId);
  chrome.tabs.sendMessage(tabId, { type: 'DEACTIVATE' }).catch(() => {});
}

/* ─── Clean up state when tab closes or navigates ─── */
chrome.tabs.onRemoved.addListener((tabId) => activeTabs.delete(tabId));
chrome.tabs.onUpdated.addListener((tabId, info) => {
  if (info.status === 'loading') activeTabs.delete(tabId);
});

/* ─── Safe sendResponse wrapper ─── */
function safeSend(sendResponse, data) {
  try { sendResponse(data); } catch (_) {}
}

/* ─── Message handler ─── */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  if (msg.type === 'GET_STATE') {
    // Return active state for the current tab
    getCurrentTab().then(tab => {
      safeSend(sendResponse, { active: tab ? activeTabs.has(tab.id) : false });
    });
    return true;
  }

  if (msg.type === 'ACTIVATE_GLOBAL') {
    // Activate only the current active tab
    getCurrentTab().then(async (tab) => {
      if (!tab) { safeSend(sendResponse, { ok: false }); return; }
      const ok = await activateTab(tab.id, tab.url);
      safeSend(sendResponse, { ok });
    });
    return true;
  }

  if (msg.type === 'DEACTIVATE_GLOBAL') {
    // Deactivate only the current active tab
    getCurrentTab().then(async (tab) => {
      if (tab) await deactivateTab(tab.id);
      safeSend(sendResponse, { ok: true });
    });
    return true;
  }

  if (msg.type === 'TAB_ACTIVATED') {
    if (sender.tab) activeTabs.add(sender.tab.id);
    safeSend(sendResponse, { ok: true });
    return false;
  }

  if (msg.type === 'TAB_DEACTIVATED') {
    if (sender.tab) activeTabs.delete(sender.tab.id);
    safeSend(sendResponse, { ok: true });
    return false;
  }

  // Screenshot: capture visible tab and send back
  if (msg.type === 'TAKE_SCREENSHOT') {
    const tabId    = sender.tab ? sender.tab.id      : null;
    const windowId = sender.tab ? sender.tab.windowId : undefined;
    if (!tabId) return false;
    (async () => {
      try {
        const dataUrl = await chrome.tabs.captureVisibleTab(windowId, { format: 'png' });
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = '';
        const CHUNK = 8192;
        for (let i = 0; i < bytes.length; i += CHUNK)
          binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
        chrome.tabs.sendMessage(tabId, {
          type: 'SCREENSHOT_RESULT', base64: btoa(binary)
        }).catch(() => {});
      } catch (err) {
        chrome.tabs.sendMessage(tabId, {
          type: 'SCREENSHOT_RESULT', error: err.message
        }).catch(() => {});
      }
    })();
    return false;
  }

  if (msg.type === 'CAPTURE_ELEMENT') {
    const { rect, devicePixelRatio } = msg;
    const tabId    = sender.tab.id;
    const windowId = sender.tab.windowId;

    (async () => {
      try {
        const dataUrl = await chrome.tabs.captureVisibleTab(windowId, { format: 'png' });
        const response = await fetch(dataUrl);
        const blob     = await response.blob();
        const bitmap   = await createImageBitmap(blob);

        const dpr = devicePixelRatio || 1;
        const sx  = Math.round(rect.x      * dpr);
        const sy  = Math.round(rect.y      * dpr);
        const sw  = Math.round(rect.width  * dpr);
        const sh  = Math.round(rect.height * dpr);

        const clampedSX = Math.max(0, Math.min(sx, bitmap.width));
        const clampedSY = Math.max(0, Math.min(sy, bitmap.height));
        const offsetX   = clampedSX - sx;
        const offsetY   = clampedSY - sy;
        const clampedSW = Math.min(sw - offsetX, bitmap.width  - clampedSX);
        const clampedSH = Math.min(sh - offsetY, bitmap.height - clampedSY);

        if (clampedSW <= 0 || clampedSH <= 0) {
          chrome.tabs.sendMessage(tabId, {
            type: 'CAPTURE_ERROR', error: 'Element out of viewport'
          }).catch(() => {});
          return;
        }

        const canvas = new OffscreenCanvas(sw, sh);
        const ctx    = canvas.getContext('2d');
        ctx.drawImage(bitmap, clampedSX, clampedSY, clampedSW, clampedSH, offsetX, offsetY, clampedSW, clampedSH);

        const pngBlob = await canvas.convertToBlob({ type: 'image/png' });
        const ab = await pngBlob.arrayBuffer();
        const bytes = new Uint8Array(ab);
        let binary = '';
        const CHUNK = 8192;
        for (let i = 0; i < bytes.length; i += CHUNK)
          binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));

        chrome.tabs.sendMessage(tabId, {
          type: 'DO_CLIPBOARD', base64: btoa(binary)
        }).catch(() => {});
      } catch (err) {
        chrome.tabs.sendMessage(tabId, {
          type: 'CAPTURE_ERROR', error: err.message
        }).catch(() => {});
      }
    })();
    return false;
  }
});

/* ─── Keyboard shortcut: toggle on current tab only ─── */
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'activate-capture') return;
  const tab = await getCurrentTab();
  if (!tab || !tab.id) return;

  if (activeTabs.has(tab.id)) {
    await deactivateTab(tab.id);
    chrome.runtime.sendMessage({ type: 'MODE_DEACTIVATED' }).catch(() => {});
  } else {
    await activateTab(tab.id, tab.url);
    chrome.runtime.sendMessage({ type: 'MODE_ACTIVATED' }).catch(() => {});
  }
});
