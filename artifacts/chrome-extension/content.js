(() => {
  if (window.__elementCaptureActive !== undefined) return;
  window.__elementCaptureActive = false;

  let hoveredEl = null;
  let tooltip   = null;

  /* ─── Inject styles once ─── */
  function injectStyles() {
    if (document.getElementById('__ec_styles')) return;
    const s = document.createElement('style');
    s.id = '__ec_styles';
    s.textContent = `
      .__ec-hl {
        outline: 1.5px solid #00e676 !important;
        outline-offset: 2px !important;
        cursor: crosshair !important;
      }
      #__ec-tip {
        position: fixed !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        background: rgba(0,0,0,0.7) !important;
        color: #fff !important;
        font: 400 11.5px/-apple-system, BlinkMacSystemFont, sans-serif !important;
        padding: 4px 9px !important;
        border-radius: 5px !important;
        white-space: nowrap !important;
        backdrop-filter: blur(4px) !important;
        -webkit-backdrop-filter: blur(4px) !important;
        line-height: 1.4 !important;
        letter-spacing: 0 !important;
        text-transform: none !important;
        box-shadow: none !important;
      }
      #__ec-toast {
        position: fixed !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        bottom: 20px !important;
        right: 20px !important;
        font: 500 12px/-apple-system, BlinkMacSystemFont, sans-serif !important;
        padding: 9px 14px !important;
        border-radius: 8px !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        transition: opacity 0.25s ease, transform 0.25s ease !important;
      }
    `;
    document.documentElement.appendChild(s);
  }

  /* ─── Tooltip ─── */
  function createTooltip() {
    if (document.getElementById('__ec-tip')) {
      tooltip = document.getElementById('__ec-tip');
      return;
    }
    tooltip = document.createElement('div');
    tooltip.id = '__ec-tip';
    tooltip.textContent = 'Click to capture';
    tooltip.style.cssText = 'font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:11.5px;';
    document.documentElement.appendChild(tooltip);
  }

  function moveTooltip(e) {
    if (!tooltip) return;
    const x = e.clientX + 12;
    const y = e.clientY - 30;
    tooltip.style.left = Math.min(x, window.innerWidth  - 140) + 'px';
    tooltip.style.top  = Math.max(y, 4) + 'px';
  }

  /* ─── Smart parent: walk up to nearest multi-child container ─── */
  function findBestTarget(startEl) {
    if (!startEl || startEl === document.body || startEl === document.documentElement) return null;
    if (startEl.id && startEl.id.startsWith('__ec')) return null;

    // Step 1: escape inline elements
    let el = startEl;
    while (el && el !== document.body) {
      const d = window.getComputedStyle(el).display;
      if (d === 'block' || d === 'flex' || d === 'grid' ||
          d === 'inline-block' || d === 'inline-flex' ||
          d === 'table-cell' || d === 'list-item') break;
      el = el.parentElement;
    }
    if (!el || el === document.body) return startEl;

    // Step 2: walk up to find multi-child container; return the child just below it
    let current   = el;
    let candidate = el;
    for (let i = 0; i < 8 && current && current !== document.body; i++) {
      const kids = Array.from(current.children).filter(c => {
        const cs = window.getComputedStyle(c);
        return cs.display !== 'none' && cs.visibility !== 'hidden';
      });
      if (kids.length >= 2) return candidate;
      candidate = current;
      current   = current.parentElement;
    }
    return candidate;
  }

  /* ─── Highlight ─── */
  function highlight(el) {
    if (el === hoveredEl) return;
    unhighlight();
    if (!el || el.id && el.id.startsWith('__ec')) return;
    hoveredEl = el;
    el.classList.add('__ec-hl');
  }

  function unhighlight() {
    if (hoveredEl) { hoveredEl.classList.remove('__ec-hl'); hoveredEl = null; }
  }

  /* ─── Events ─── */
  function onMouseMove(e) {
    moveTooltip(e);
    const raw = document.elementFromPoint(e.clientX, e.clientY);
    if (!raw || raw.id === '__ec-tip') return;
    highlight(findBestTarget(raw));
  }

  function onClick(e) {
    if (!window.__elementCaptureActive || !hoveredEl) return;
    e.preventDefault();
    e.stopPropagation();

    const el   = hoveredEl;
    const rect = el.getBoundingClientRect();

    // Remove highlight before screenshot
    el.classList.remove('__ec-hl');

    setTimeout(() => {
      chrome.runtime.sendMessage({
        type: 'CAPTURE_ELEMENT',
        rect: { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
        devicePixelRatio: window.devicePixelRatio || 1
      });
    }, 60);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') deactivate();
  }

  /* ─── Activate / Deactivate ─── */
  function activate() {
    if (window.__elementCaptureActive) return;
    window.__elementCaptureActive = true;
    injectStyles();
    createTooltip();
    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('click',     onClick,     true);
    document.addEventListener('keydown',   onKeyDown,   true);
    chrome.runtime.sendMessage({ type: 'TAB_ACTIVATED' });
  }

  function deactivate() {
    if (!window.__elementCaptureActive) return;
    window.__elementCaptureActive = false;
    unhighlight();
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('click',     onClick,     true);
    document.removeEventListener('keydown',   onKeyDown,   true);
    if (tooltip) { tooltip.remove(); tooltip = null; }
    chrome.runtime.sendMessage({ type: 'TAB_DEACTIVATED' });
  }

  /* ─── Messages ─── */
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.type === 'ACTIVATE')   { activate();   sendResponse({ ok: true }); }
    if (msg.type === 'DEACTIVATE') { deactivate(); sendResponse({ ok: true }); }

    if (msg.type === 'DO_CLIPBOARD') {
      // Re-add highlight after screenshot
      if (hoveredEl) hoveredEl.classList.add('__ec-hl');

      const byteStr = atob(msg.base64);
      const arr = new Uint8Array(byteStr.length);
      for (let i = 0; i < byteStr.length; i++) arr[i] = byteStr.charCodeAt(i);
      const blob = new Blob([arr], { type: 'image/png' });

      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        .then(() => toast('Copied to clipboard ✓'))
        .catch(err => toast('Clipboard failed: ' + err.message, true));
    }

    if (msg.type === 'CAPTURE_ERROR') {
      if (hoveredEl) hoveredEl.classList.add('__ec-hl');
      toast('Capture failed: ' + msg.error, true);
    }

    return true;
  });

  /* ─── Toast ─── */
  function toast(msg, isError = false) {
    const old = document.getElementById('__ec-toast');
    if (old) old.remove();
    const t = document.createElement('div');
    t.id = '__ec-toast';
    t.style.cssText = `
      background:${isError ? 'rgba(40,4,4,0.92)' : 'rgba(4,24,12,0.92)'};
      border:1px solid ${isError ? 'rgba(220,38,38,0.5)' : 'rgba(0,200,100,0.4)'};
      color:${isError ? '#f87171' : '#4ade80'};
      opacity:0;transform:translateY(8px);
      font-family:-apple-system,BlinkMacSystemFont,sans-serif;
    `;
    t.textContent = msg;
    document.documentElement.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
    setTimeout(() => {
      t.style.opacity = '0'; t.style.transform = 'translateY(8px)';
      setTimeout(() => t.remove(), 280);
    }, 2600);
  }
})();
