(() => {
  // Guard: don't double-inject
  if (window.__elementCaptureActive !== undefined) {
    // Already injected — nothing to do, the existing listener handles messages
    return;
  }
  window.__elementCaptureActive = false;

  /* ─── State ─── */
  let hoveredEl = null;
  let tooltip   = null;
  let overlay   = null;

  /* ─── Inject global styles once ─── */
  function injectStyles() {
    if (document.getElementById('__ec_styles')) return;
    const s = document.createElement('style');
    s.id = '__ec_styles';
    s.textContent = `
      .__ec-highlight {
        outline: 2px solid #00ff88 !important;
        outline-offset: 2px !important;
        box-shadow:
          0 0 0 2px rgba(0, 255, 136, 0.15),
          0 0 12px rgba(0, 255, 136, 0.4),
          inset 0 0 8px rgba(0, 255, 136, 0.05) !important;
        cursor: crosshair !important;
        transition: outline 0.1s ease, box-shadow 0.15s ease !important;
        animation: __ec-glow 1.8s ease-in-out infinite !important;
      }

      @keyframes __ec-glow {
        0%,  100% { box-shadow: 0 0 0 2px rgba(0,255,136,0.15), 0 0 12px rgba(0,255,136,0.4), inset 0 0 8px rgba(0,255,136,0.05); }
        50%        { box-shadow: 0 0 0 3px rgba(0,255,136,0.25), 0 0 22px rgba(0,255,136,0.6), inset 0 0 12px rgba(0,255,136,0.08); }
      }

      #__ec-tooltip {
        position: fixed;
        z-index: 2147483647;
        pointer-events: none;
        background: rgba(8, 8, 15, 0.92);
        border: 1px solid rgba(0,255,136,0.3);
        border-radius: 6px;
        padding: 5px 10px;
        font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
        font-size: 11px;
        font-weight: 500;
        color: #00ff88;
        letter-spacing: 0.01em;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        box-shadow: 0 0 12px rgba(0,255,136,0.2), 0 2px 8px rgba(0,0,0,0.5);
        white-space: nowrap;
        transition: opacity 0.15s ease;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      #__ec-tooltip::before {
        content: '';
        width: 5px; height: 5px;
        border-radius: 50%;
        background: #00ff88;
        box-shadow: 0 0 6px #00ff88;
        animation: __ec-dot 1.5s ease-in-out infinite;
        flex-shrink: 0;
      }

      @keyframes __ec-dot {
        0%,  100% { opacity: 1; }
        50%        { opacity: 0.4; }
      }

      #__ec-flash {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        pointer-events: none;
        background: rgba(0,255,136,0.08);
        opacity: 0;
        transition: opacity 0.15s ease;
      }

      #__ec-flash.show {
        opacity: 1;
      }
    `;
    document.documentElement.appendChild(s);
  }

  /* ─── Create tooltip ─── */
  function createTooltip() {
    if (document.getElementById('__ec-tooltip')) return;
    tooltip = document.createElement('div');
    tooltip.id = '__ec-tooltip';
    tooltip.textContent = 'Click to capture';
    document.documentElement.appendChild(tooltip);
  }

  /* ─── Create flash overlay ─── */
  function createFlash() {
    if (document.getElementById('__ec-flash')) return;
    overlay = document.createElement('div');
    overlay.id = '__ec-flash';
    document.documentElement.appendChild(overlay);
  }

  /* ─── Move tooltip near cursor ─── */
  function moveTooltip(e) {
    if (!tooltip) return;
    const x = e.clientX + 16;
    const y = e.clientY + 16;
    const tw = 140;
    const th = 28;
    const cx = (x + tw > window.innerWidth)  ? e.clientX - tw - 8 : x;
    const cy = (y + th > window.innerHeight) ? e.clientY - th - 8 : y;
    tooltip.style.left = cx + 'px';
    tooltip.style.top  = cy + 'px';
  }

  /* ─── Highlight element ─── */
  function highlight(el) {
    if (el === hoveredEl) return;
    unhighlight();
    // Skip our own injected elements
    if (el.id === '__ec-tooltip' || el.id === '__ec-flash' || el.id === '__ec_styles') return;
    hoveredEl = el;
    el.classList.add('__ec-highlight');
  }

  function unhighlight() {
    if (hoveredEl) {
      hoveredEl.classList.remove('__ec-highlight');
      hoveredEl = null;
    }
  }

  /* ─── Flash on capture ─── */
  function flashScreen() {
    if (!overlay) return;
    overlay.classList.add('show');
    setTimeout(() => overlay && overlay.classList.remove('show'), 200);
  }

  /* ─── Event handlers ─── */
  function onMouseMove(e) {
    moveTooltip(e);
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || el === tooltip || el === overlay) return;
    highlight(el);
  }

  function onClick(e) {
    if (!window.__elementCaptureActive) return;
    e.preventDefault();
    e.stopPropagation();

    if (!hoveredEl) return;

    const rect = hoveredEl.getBoundingClientRect();
    const dpr  = window.devicePixelRatio || 1;

    // Briefly flash the screen
    flashScreen();

    // Remove highlight before screenshot so the green border isn't in the image
    const captured = hoveredEl;
    captured.classList.remove('__ec-highlight');

    // Small delay so the outline is visually gone before the screenshot
    setTimeout(() => {
      chrome.runtime.sendMessage({
        type: 'CAPTURE_ELEMENT',
        rect: {
          x:      rect.left,
          y:      rect.top,
          width:  rect.width,
          height: rect.height
        },
        devicePixelRatio: dpr
      });
    }, 60);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      deactivate();
    }
  }

  /* ─── Activate / Deactivate ─── */
  function activate() {
    if (window.__elementCaptureActive) return;
    window.__elementCaptureActive = true;

    injectStyles();
    createTooltip();
    createFlash();

    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('click',     onClick,     true);
    document.addEventListener('keydown',   onKeyDown,   true);

    // Tell background we're live
    chrome.runtime.sendMessage({ type: 'TAB_ACTIVATED' });
  }

  function deactivate() {
    if (!window.__elementCaptureActive) return;
    window.__elementCaptureActive = false;

    unhighlight();

    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('click',     onClick,     true);
    document.removeEventListener('keydown',   onKeyDown,   true);

    // Fade out and remove tooltip
    if (tooltip) {
      tooltip.style.opacity = '0';
      setTimeout(() => { tooltip && tooltip.remove(); tooltip = null; }, 200);
    }
    if (overlay) { overlay.remove(); overlay = null; }

    // Tell background
    chrome.runtime.sendMessage({ type: 'TAB_DEACTIVATED' });
  }

  /* ─── Listen for background/popup messages ─── */
  function handleMessage(msg, _sender, sendResponse) {
    if (msg.type === 'ACTIVATE') {
      activate();
      sendResponse({ ok: true });
    }
    if (msg.type === 'DEACTIVATE') {
      deactivate();
      sendResponse({ ok: true });
    }
    if (msg.type === 'CAPTURE_SUCCESS') {
      // Show a subtle on-page notification
      showCaptureToast('Captured!');
    }
    if (msg.type === 'CAPTURE_ERROR') {
      showCaptureToast('Capture failed: ' + msg.error, true);
    }
    return true;
  }

  chrome.runtime.onMessage.addListener(handleMessage);

  /* ─── On-page toast ─── */
  function showCaptureToast(msg, isError = false) {
    const old = document.getElementById('__ec-toast');
    if (old) old.remove();

    const t = document.createElement('div');
    t.id = '__ec-toast';
    Object.assign(t.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: '2147483647',
      background: isError ? 'rgba(20,4,4,0.95)' : 'rgba(4,16,10,0.95)',
      border: `1px solid ${isError ? 'rgba(255,77,109,0.4)' : 'rgba(0,255,136,0.3)'}`,
      borderRadius: '10px',
      padding: '10px 16px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
      fontSize: '12px',
      fontWeight: '500',
      color: isError ? '#ff4d6d' : '#00ff88',
      backdropFilter: 'blur(12px)',
      webkitBackdropFilter: 'blur(12px)',
      boxShadow: `0 0 20px ${isError ? 'rgba(255,77,109,0.2)' : 'rgba(0,255,136,0.2)'}, 0 4px 16px rgba(0,0,0,0.5)`,
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: '0',
      transform: 'translateY(8px)',
      pointerEvents: 'none',
    });
    t.textContent = msg;
    document.documentElement.appendChild(t);

    requestAnimationFrame(() => {
      t.style.opacity  = '1';
      t.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      t.style.opacity   = '0';
      t.style.transform = 'translateY(8px)';
      setTimeout(() => t.remove(), 300);
    }, 2800);
  }
})();
