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
        let sx = Math.round(rect.x * dpr);
        let sy = Math.round(rect.y * dpr);
        const sw = Math.round(rect.width  * dpr);
        const sh = Math.round(rect.height * dpr);

        // Clamp source origin to bitmap bounds (handles partially off-screen elements)
        const clampedSX = Math.max(0, Math.min(sx, bitmap.width));
        const clampedSY = Math.max(0, Math.min(sy, bitmap.height));
        const offsetX   = clampedSX - sx;  // positive when left edge was off-screen
        const offsetY   = clampedSY - sy;

        const clampedSW = Math.min(sw - offsetX, bitmap.width  - clampedSX);
        const clampedSH = Math.min(sh - offsetY, bitmap.height - clampedSY);

        if (clampedSW <= 0 || clampedSH <= 0) {
          chrome.tabs.sendMessage(tabId, { type: 'CAPTURE_ERROR', error: 'Element out of view' });
          return;
        }

        // Canvas is the full element size; crop starts at offset if element was partially off-screen
        const canvas = new OffscreenCanvas(sw, sh);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, clampedSX, clampedSY, clampedSW, clampedSH, offsetX, offsetY, clampedSW, clampedSH);

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
