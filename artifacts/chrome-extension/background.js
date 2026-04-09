// Track which tabs have capture mode active
const activeTabs = new Set();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_STATE') {
    sendResponse({ active: activeTabs.has(msg.tabId) });
    return true;
  }

  if (msg.type === 'TAB_ACTIVATED') {
    activeTabs.add(sender.tab.id);
    sendResponse({ ok: true });
    return true;
  }

  if (msg.type === 'TAB_DEACTIVATED') {
    activeTabs.delete(sender.tab.id);
    // Forward to popup if open
    chrome.runtime.sendMessage({ type: 'MODE_DEACTIVATED' }).catch(() => {});
    sendResponse({ ok: true });
    return true;
  }

  if (msg.type === 'CAPTURE_ELEMENT') {
    const { rect, devicePixelRatio } = msg;
    const tabId = sender.tab.id;

    (async () => {
      try {
        // Capture the full visible tab
        const dataUrl = await chrome.tabs.captureVisibleTab(sender.tab.windowId, { format: 'png' });

        // Crop to element bounds in an OffscreenCanvas
        const blob = await fetch(dataUrl).then(r => r.blob());
        const bitmap = await createImageBitmap(blob);

        const dpr = devicePixelRatio || 1;
        const sx = Math.round(rect.x * dpr);
        const sy = Math.round(rect.y * dpr);
        const sw = Math.round(rect.width * dpr);
        const sh = Math.round(rect.height * dpr);

        // Clamp to bitmap bounds
        const clampedSW = Math.min(sw, bitmap.width  - sx);
        const clampedSH = Math.min(sh, bitmap.height - sy);

        if (clampedSW <= 0 || clampedSH <= 0) {
          chrome.tabs.sendMessage(tabId, { type: 'CAPTURE_ERROR', error: 'Element out of view' });
          return;
        }

        const canvas = new OffscreenCanvas(clampedSW, clampedSH);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, sx, sy, clampedSW, clampedSH, 0, 0, clampedSW, clampedSH);

        const pngBlob = await canvas.convertToBlob({ type: 'image/png' });
        const pngUrl  = URL.createObjectURL(pngBlob);

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const filename  = `capture-${timestamp}.png`;

        await chrome.downloads.download({ url: pngUrl, filename, saveAs: false });

        // Notify content script
        chrome.tabs.sendMessage(tabId, { type: 'CAPTURE_SUCCESS' });
        // Notify popup
        chrome.runtime.sendMessage({ type: 'CAPTURE_SUCCESS' }).catch(() => {});
      } catch (err) {
        chrome.tabs.sendMessage(tabId, { type: 'CAPTURE_ERROR', error: err.message });
      }
    })();

    sendResponse({ ok: true });
    return true;
  }
});

// Clean up when tab closes or navigates
chrome.tabs.onRemoved.addListener((tabId) => activeTabs.delete(tabId));
chrome.tabs.onUpdated.addListener((tabId, info) => {
  if (info.status === 'loading') activeTabs.delete(tabId);
});
