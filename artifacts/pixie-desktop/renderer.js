(() => {
  let scaleFactor = 2;
  let active = false;

  const S = { IDLE: 'idle', HOVER: 'hover', DRAG: 'drag', SELECTED: 'selected' };
  let state = S.IDLE;
  let captureMode = null;

  let ovCanvas, ovCtx;
  let selBox, dimLabel;
  let annCanvas, annCtx;
  let toolbar;
  let handles = {};
  let hoverTip = null;

  let selRect = null;
  let dragStart = null;
  let activeHandle = null;
  let resizeOrigin = null;
  let activeTool = null;
  let activeColor = '#ef4444';
  let isDrawing = false;
  let drawOrigin = null;
  let savedPixels = null;
  let selCornerRadius = 10;
  let isMovingSel = false;
  let moveStart = null;
  let lastMid = null;

  let windowRects = [];
  let hoveredWinRect = null;

  const W = () => window.innerWidth;
  const H = () => window.innerHeight;

  const COLORS = ['#ef4444','#f97316','#facc15','#00e676','#60a5fa','#e879f9','#ffffff'];
  const HIDS = ['nw','n','ne','e','se','s','sw','w'];
  const HCUR = { nw:'nw-resize',n:'n-resize',ne:'ne-resize',e:'e-resize',se:'se-resize',s:'s-resize',sw:'sw-resize',w:'w-resize' };

  function init() {
    ovCanvas = document.createElement('canvas');
    ovCanvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:10;display:none;';
    document.body.appendChild(ovCanvas);
    ovCtx = ovCanvas.getContext('2d');

    dimLabel = document.createElement('div');
    dimLabel.id = 'ec-dim';
    document.body.appendChild(dimLabel);

    selBox = document.createElement('div');
    selBox.id = 'ec-sel';
    document.body.appendChild(selBox);

    annCanvas = document.createElement('canvas');
    annCanvas.id = 'ec-ann';
    annCanvas.style.pointerEvents = 'none';
    annCanvas.addEventListener('mousedown', onAnnDown);
    annCanvas.addEventListener('mousemove', onAnnMove);
    annCanvas.addEventListener('mouseup', onAnnUp);
    document.body.appendChild(annCanvas);
    annCtx = annCanvas.getContext('2d', { willReadFrequently: true });

    for (const id of HIDS) {
      const h = document.createElement('div');
      h.className = 'ec-hnd';
      h.style.cursor = HCUR[id];
      h.dataset.handle = id;
      h.addEventListener('mousedown', onHandleDown);
      document.body.appendChild(h);
      handles[id] = h;
    }

    hoverTip = document.createElement('div');
    hoverTip.id = 'ec-hover-tip';
    hoverTip.textContent = 'Click to capture · Esc to cancel';
    document.body.appendChild(hoverTip);

    createToolbar();

    document.addEventListener('mousedown', onMouseDown, true);
    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('mouseup', onMouseUp, true);
    document.addEventListener('keydown', onKeyDown, true);
  }

  // ─── Hover mode ─────────────────────────────────────────────────────────────

  function drawHoverHighlight(rect) {
    const dpr = scaleFactor;
    const pw = Math.round(W() * dpr), ph = Math.round(H() * dpr);
    ovCanvas.width = pw; ovCanvas.height = ph;
    ovCanvas.style.width = W() + 'px';
    ovCanvas.style.height = H() + 'px';
    ovCanvas.style.display = 'block';

    ovCtx.clearRect(0, 0, pw, ph);
    ovCtx.fillStyle = 'rgba(0,0,0,0.35)';
    ovCtx.fillRect(0, 0, pw, ph);

    if (rect) {
      ovCtx.globalCompositeOperation = 'destination-out';
      ovCtx.beginPath();
      ovCtx.roundRect(rect.left * dpr, rect.top * dpr, rect.width * dpr, rect.height * dpr, 8 * dpr);
      ovCtx.fill();
      ovCtx.globalCompositeOperation = 'source-over';

      ovCtx.fillStyle = 'rgba(0,0,0,0.01)';
      ovCtx.beginPath();
      ovCtx.roundRect(rect.left * dpr, rect.top * dpr, rect.width * dpr, rect.height * dpr, 8 * dpr);
      ovCtx.fill();

      ovCtx.strokeStyle = 'rgba(0, 230, 118, 0.9)';
      ovCtx.lineWidth = 2.5 * dpr;
      ovCtx.beginPath();
      ovCtx.roundRect(rect.left * dpr, rect.top * dpr, rect.width * dpr, rect.height * dpr, 8 * dpr);
      ovCtx.stroke();

      ovCtx.shadowColor = 'rgba(0, 230, 118, 0.35)';
      ovCtx.shadowBlur = 18 * dpr;
      ovCtx.strokeStyle = 'rgba(0, 230, 118, 0.25)';
      ovCtx.lineWidth = 1.5 * dpr;
      ovCtx.stroke();
      ovCtx.shadowBlur = 0;
    }

    dimLabel.style.display = 'none';
  }

  function findWindowUnderCursor(mx, my) {
    for (const w of windowRects) {
      if (mx >= w.x && mx < w.x + w.w && my >= w.y && my < w.y + w.h) {
        return { left: w.x, top: w.y, width: w.w, height: w.h, owner: w.owner };
      }
    }
    return null;
  }

  function moveHoverTip(x, y) {
    if (!hoverTip) return;
    hoverTip.style.display = 'block';
    hoverTip.style.left = Math.min(x + 14, W() - 240) + 'px';
    hoverTip.style.top = Math.max(y - 36, 4) + 'px';
  }

  function hideHoverTip() {
    if (hoverTip) hoverTip.style.display = 'none';
  }

  // ─── Toolbar ────────────────────────────────────────────────────────────────

  function createToolbar() {
    toolbar = document.createElement('div');
    toolbar.id = 'ec-tb';

    function sep() { const d = document.createElement('div'); d.className = 'sep'; toolbar.appendChild(d); }

    const moveBtn = document.createElement('button');
    moveBtn.title = 'Move';
    moveBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 9l-3 3 3 3"/><path d="M9 5l3-3 3 3"/><path d="M15 19l-3 3-3-3"/><path d="M19 9l3 3-3 3"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>';
    moveBtn.dataset.tool = 'move';
    moveBtn.classList.add('active');
    moveBtn.addEventListener('click', () => setTool(null));
    toolbar.appendChild(moveBtn);

    const penBtn = document.createElement('button');
    penBtn.title = 'Pencil';
    penBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>';
    penBtn.dataset.tool = 'pen';
    penBtn.addEventListener('click', () => setTool(activeTool === 'pen' ? null : 'pen'));
    toolbar.appendChild(penBtn);

    const erBtn = document.createElement('button');
    erBtn.title = 'Eraser';
    erBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>';
    erBtn.dataset.tool = 'eraser';
    erBtn.addEventListener('click', () => setTool(activeTool === 'eraser' ? null : 'eraser'));
    toolbar.appendChild(erBtn);

    sep();

    const cornerBtn = document.createElement('button');
    cornerBtn.title = 'Toggle corners';
    cornerBtn.dataset.action = 'corners';
    const updateCornerIcon = () => {
      cornerBtn.innerHTML = selCornerRadius > 0
        ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="6"/></svg>'
        : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="0"/></svg>';
    };
    updateCornerIcon();
    cornerBtn.addEventListener('click', () => {
      selCornerRadius = selCornerRadius > 0 ? 0 : 10;
      updateCornerIcon();
      cornerBtn.classList.toggle('active', selCornerRadius === 0);
      if (selRect) { posSelBox(selRect); showOverlay(selRect); }
    });
    toolbar.appendChild(cornerBtn);

    sep();

    for (const c of COLORS) {
      const dot = document.createElement('div');
      dot.className = 'ec-col' + (c === activeColor ? ' active' : '');
      dot.style.background = c;
      dot.dataset.color = c;
      dot.addEventListener('click', () => { setColor(c); if (activeTool !== 'pen') setTool('pen'); });
      toolbar.appendChild(dot);
    }

    sep();

    const cap = document.createElement('button');
    cap.className = 'ec-cap';
    cap.textContent = 'Copy';
    cap.title = 'Copy to clipboard (⌘C)';
    cap.addEventListener('click', () => doCapture());
    toolbar.appendChild(cap);

    const sav = document.createElement('button');
    sav.className = 'ec-sav';
    sav.textContent = 'Save';
    sav.title = 'Save to Desktop (Enter)';
    sav.addEventListener('click', () => doSave());
    toolbar.appendChild(sav);

    sep();

    const close = document.createElement('button');
    close.className = 'ec-x';
    close.textContent = '×';
    close.addEventListener('click', () => clearSel());
    toolbar.appendChild(close);

    document.body.appendChild(toolbar);
  }

  function setTool(tool) {
    activeTool = tool;
    toolbar.querySelectorAll('[data-tool]').forEach(b => b.classList.remove('active'));
    if (tool === null) {
      const m = toolbar.querySelector('[data-tool="move"]');
      if (m) m.classList.add('active');
    } else {
      const b = toolbar.querySelector(`[data-tool="${tool}"]`);
      if (b) b.classList.add('active');
    }
    updateAnnCursor();
  }

  function setColor(color) {
    activeColor = color;
    toolbar.querySelectorAll('.ec-col').forEach(d => d.classList.toggle('active', d.dataset.color === color));
  }

  function updateAnnCursor() {
    if (!annCanvas) return;
    if (activeTool === 'pen') annCanvas.style.cursor = 'crosshair';
    else if (activeTool === 'eraser') annCanvas.style.cursor = 'crosshair';
    else annCanvas.style.cursor = 'move';
  }

  // ─── Overlay ────────────────────────────────────────────────────────────────

  function showOverlay(r) {
    const dpr = scaleFactor;
    const pw = Math.round(W() * dpr), ph = Math.round(H() * dpr);
    ovCanvas.width = pw; ovCanvas.height = ph;
    ovCanvas.style.width = W() + 'px';
    ovCanvas.style.height = H() + 'px';
    ovCanvas.style.display = 'block';

    ovCtx.clearRect(0, 0, pw, ph);
    ovCtx.fillStyle = 'rgba(0,0,0,0.52)';
    ovCtx.fillRect(0, 0, pw, ph);

    const radius = selCornerRadius * dpr;
    ovCtx.globalCompositeOperation = 'destination-out';
    ovCtx.beginPath();
    ovCtx.roundRect(r.left * dpr, r.top * dpr, r.width * dpr, r.height * dpr, radius);
    ovCtx.fill();
    ovCtx.globalCompositeOperation = 'source-over';

    const w = Math.round(r.width), h = Math.round(r.height);
    dimLabel.textContent = `${w} × ${h}`;
    dimLabel.style.display = 'block';
    const lw = dimLabel.offsetWidth || 64;
    const lh = dimLabel.offsetHeight || 20;
    let lx = r.left + r.width / 2 - lw / 2;
    let ly = r.top + r.height + 6;
    if (ly + lh > H() - 4) ly = r.top - lh - 6;
    lx = Math.max(4, Math.min(lx, W() - lw - 4));
    dimLabel.style.left = lx + 'px';
    dimLabel.style.top = ly + 'px';
  }

  function hideOverlay() {
    ovCanvas.style.display = 'none';
    dimLabel.style.display = 'none';
  }

  // ─── Selection ──────────────────────────────────────────────────────────────

  function posSelBox(r) {
    selBox.style.left = r.left + 'px';
    selBox.style.top = r.top + 'px';
    selBox.style.width = r.width + 'px';
    selBox.style.height = r.height + 'px';
    selBox.style.borderRadius = selCornerRadius + 'px';
    selBox.style.display = 'block';
  }

  function posHandles(r) {
    const HH = 4;
    const pos = {
      nw: [r.left-HH, r.top-HH], n: [r.left+r.width/2-HH, r.top-HH],
      ne: [r.left+r.width-HH, r.top-HH], e: [r.left+r.width-HH, r.top+r.height/2-HH],
      se: [r.left+r.width-HH, r.top+r.height-HH], s: [r.left+r.width/2-HH, r.top+r.height-HH],
      sw: [r.left-HH, r.top+r.height-HH], w: [r.left-HH, r.top+r.height/2-HH],
    };
    for (const id of HIDS) {
      handles[id].style.left = pos[id][0] + 'px';
      handles[id].style.top = pos[id][1] + 'px';
      handles[id].style.display = 'block';
    }
  }

  function hideHandles() { for (const id of HIDS) handles[id].style.display = 'none'; }

  function posAnnCanvas(r) {
    const dpr = scaleFactor;
    const pw = Math.round(r.width * dpr), ph = Math.round(r.height * dpr);
    annCanvas.style.left = r.left + 'px';
    annCanvas.style.top = r.top + 'px';
    annCanvas.style.width = r.width + 'px';
    annCanvas.style.height = r.height + 'px';
    annCanvas.style.display = 'block';
    annCanvas.style.pointerEvents = 'auto';
    if (annCanvas.width !== pw || annCanvas.height !== ph) {
      annCanvas.width = pw; annCanvas.height = ph;
      annCtx.scale(dpr, dpr);
      savedPixels = null;
    }
    annCtx.lineCap = 'round';
    annCtx.lineJoin = 'round';
    updateAnnCursor();
  }

  function posToolbar(r) {
    toolbar.style.display = 'flex';
    requestAnimationFrame(() => {
      const tw = toolbar.offsetWidth, th = toolbar.offsetHeight;
      let x = r.left + r.width / 2 - tw / 2;
      let y = r.top + r.height + 10;
      x = Math.max(8, Math.min(x, W() - tw - 8));
      if (y + th > H() - 8) y = r.top - th - 10;
      if (y < 4) y = r.top + r.height + 4;
      toolbar.style.left = x + 'px';
      toolbar.style.top = y + 'px';
    });
  }

  function showSel(r) {
    selRect = { ...r };
    activeTool = null;
    posSelBox(r); posHandles(r); posAnnCanvas(r); posToolbar(r);
    setTool(null);
    state = S.SELECTED;
  }

  function updateSel(r) {
    selRect = { ...r };
    posSelBox(r); posHandles(r); posAnnCanvas(r); posToolbar(r);
  }

  function clearSel() {
    state = S.IDLE;
    selRect = null; savedPixels = null;
    isMovingSel = false; moveStart = null;
    activeTool = null;
    selBox.style.display = 'none';
    annCanvas.style.display = 'none'; annCanvas.style.pointerEvents = 'none';
    toolbar.style.display = 'none';
    hideHandles(); hideOverlay(); hideHoverTip();
    hoveredWinRect = null;
    windowRects = [];
    if (active) { window.pixie.deactivate(); active = false; }
  }

  function savePx() { if (annCtx) savedPixels = annCtx.getImageData(0, 0, annCanvas.width, annCanvas.height); }
  function restorePx() { if (annCtx && savedPixels) annCtx.putImageData(savedPixels, 0, 0); }

  function canPos(e) {
    const r = annCanvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  // ─── Annotation events ─────────────────────────────────────────────────────

  function onAnnDown(e) {
    if (e.button !== 0) return;
    e.preventDefault(); e.stopPropagation();
    if (activeTool === null) {
      isMovingSel = true;
      moveStart = { x: e.clientX, y: e.clientY };
      return;
    }
    isDrawing = true;
    drawOrigin = canPos(e);
    lastMid = null;
    savePx();
  }

  function onAnnMove(e) {
    if (isMovingSel && selRect) {
      e.preventDefault();
      const dx = e.clientX - moveStart.x, dy = e.clientY - moveStart.y;
      moveStart = { x: e.clientX, y: e.clientY };
      updateSel({ left: selRect.left + dx, top: selRect.top + dy, width: selRect.width, height: selRect.height });
      showOverlay(selRect);
      return;
    }
    if (!isDrawing) return;
    e.preventDefault();
    const p = canPos(e);
    if (activeTool === 'pen') {
      annCtx.globalCompositeOperation = 'source-over';
      annCtx.strokeStyle = activeColor;
      annCtx.lineWidth = 2.5;
    } else {
      annCtx.globalCompositeOperation = 'destination-out';
      annCtx.lineWidth = 18;
    }
    const mid = { x: (drawOrigin.x + p.x) / 2, y: (drawOrigin.y + p.y) / 2 };
    annCtx.beginPath();
    if (lastMid) { annCtx.moveTo(lastMid.x, lastMid.y); annCtx.quadraticCurveTo(drawOrigin.x, drawOrigin.y, mid.x, mid.y); }
    else { annCtx.moveTo(drawOrigin.x, drawOrigin.y); annCtx.lineTo(mid.x, mid.y); }
    annCtx.stroke();
    lastMid = mid;
    drawOrigin = p;
    if (activeTool === 'eraser') annCtx.globalCompositeOperation = 'source-over';
  }

  function onAnnUp(e) {
    if (isMovingSel) { e.preventDefault(); isMovingSel = false; moveStart = null; return; }
    if (!isDrawing) return;
    e.preventDefault(); e.stopPropagation();
    isDrawing = false; lastMid = null;
    annCtx.globalCompositeOperation = 'source-over';
    savePx(); drawOrigin = null;
  }

  function onHandleDown(e) {
    if (e.button !== 0) return;
    e.preventDefault(); e.stopPropagation();
    activeHandle = e.currentTarget.dataset.handle;
    resizeOrigin = { x: e.clientX, y: e.clientY, rect: { ...selRect } };
    document.addEventListener('mousemove', onResizeMove, true);
    document.addEventListener('mouseup', onResizeUp, true);
  }

  function onResizeMove(e) {
    if (!activeHandle) return;
    const dx = e.clientX - resizeOrigin.x, dy = e.clientY - resizeOrigin.y;
    const o = resizeOrigin.rect;
    let { left, top, width, height } = o;
    if (activeHandle.includes('w')) { left += dx; width -= dx; }
    if (activeHandle.includes('e')) { width += dx; }
    if (activeHandle.includes('n')) { top += dy; height -= dy; }
    if (activeHandle.includes('s')) { height += dy; }
    if (width < 20) { width = 20; if (activeHandle.includes('w')) left = o.left + o.width - 20; }
    if (height < 20) { height = 20; if (activeHandle.includes('n')) top = o.top + o.height - 20; }
    updateSel({ left, top, width, height });
    showOverlay(selRect);
  }

  function onResizeUp() {
    document.removeEventListener('mousemove', onResizeMove, true);
    document.removeEventListener('mouseup', onResizeUp, true);
    activeHandle = null; resizeOrigin = null;
  }

  function mkRect(a, b) {
    return { left: Math.min(a.x, b.x), top: Math.min(a.y, b.y), width: Math.abs(b.x - a.x), height: Math.abs(b.y - a.y) };
  }

  // ─── Mouse events ──────────────────────────────────────────────────────────

  function onMouseDown(e) {
    if (!active || e.button !== 0) return;
    if (e.target.closest('#ec-tb') || e.target.classList.contains('ec-hnd')) return;

    if (state === S.HOVER) {
      e.preventDefault();
      if (hoveredWinRect) {
        hideHoverTip();
        showSel(hoveredWinRect);
        showOverlay(selRect);
      }
      return;
    }

    if (state === S.IDLE) {
      dragStart = { x: e.clientX, y: e.clientY };
      state = S.DRAG;
      e.preventDefault();
    } else if (state === S.SELECTED) {
      if (!e.target.closest('#ec-ann')) clearSel();
    }
  }

  function onMouseMove(e) {
    if (!active) return;

    if (state === S.HOVER) {
      const win = findWindowUnderCursor(e.clientX, e.clientY);
      hoveredWinRect = win;
      drawHoverHighlight(win);
      if (win) {
        hoverTip.textContent = `${win.owner} — click to capture`;
        moveHoverTip(e.clientX, e.clientY);
      } else {
        hideHoverTip();
      }
      return;
    }

    if (state === S.DRAG && dragStart) {
      const r = mkRect(dragStart, { x: e.clientX, y: e.clientY });
      posSelBox(r);
      showOverlay(r);
    }
  }

  function onMouseUp(e) {
    if (!active || e.button !== 0) return;
    if (state === S.DRAG) {
      e.preventDefault();
      const r = mkRect(dragStart, { x: e.clientX, y: e.clientY });
      dragStart = null;
      hideOverlay();
      if (r.width < 10 || r.height < 10) {
        selBox.style.display = 'none';
        state = S.IDLE;
        return;
      }
      showSel(r);
      showOverlay(selRect);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      if (state === S.SELECTED) clearSel();
      else if (active) { clearSel(); window.pixie.deactivate(); active = false; }
    }
    if (e.key === 'Enter' && state === S.SELECTED) { e.preventDefault(); doSave(); }
    if (e.key === 'c' && (e.metaKey || e.ctrlKey) && state === S.SELECTED) { e.preventDefault(); doCapture(); }
  }

  // ─── Capture ────────────────────────────────────────────────────────────────

  async function doCapture() {
    if (!selRect) return;
    selBox.style.display = 'none';
    toolbar.style.display = 'none';
    annCanvas.style.visibility = 'hidden';
    hideHandles(); hideOverlay();
    await sleep(80);

    const base64 = await window.pixie.takeScreenshot();
    if (!base64) { toast('Screenshot failed', true); restoreUI(); return; }

    try {
      const merged = await mergeToBase64(base64);
      await window.pixie.copyToClipboard(merged);
      toast('Copied to clipboard ✓');
      clearSel();
    } catch (err) {
      toast('Failed: ' + err.message, true);
      restoreUI();
    }
  }

  async function doSave() {
    if (!selRect) return;
    selBox.style.display = 'none';
    toolbar.style.display = 'none';
    annCanvas.style.visibility = 'hidden';
    hideHandles(); hideOverlay();
    await sleep(80);

    const base64 = await window.pixie.takeScreenshot();
    if (!base64) { toast('Screenshot failed', true); restoreUI(); return; }

    try {
      const merged = await mergeToBase64(base64);
      await window.pixie.saveToDesktop(merged);
      toast('Saved to Desktop ✓');
      clearSel();
    } catch (err) {
      toast('Save failed: ' + err.message, true);
      restoreUI();
    }
  }

  function restoreUI() {
    if (selRect) {
      posSelBox(selRect); posHandles(selRect);
      toolbar.style.display = 'flex';
      annCanvas.style.visibility = 'visible';
      showOverlay(selRect);
    }
  }

  async function mergeToBase64(screenshotB64) {
    const dpr = scaleFactor;
    const r = selRect;
    const img = await loadImage('data:image/png;base64,' + screenshotB64);
    const sx = Math.round(r.left * dpr), sy = Math.round(r.top * dpr);
    const sw = Math.round(r.width * dpr), sh = Math.round(r.height * dpr);
    const c = document.createElement('canvas');
    c.width = sw; c.height = sh;
    const ctx = c.getContext('2d');
    const rad = Math.round(selCornerRadius * dpr);
    if (rad > 0) { ctx.beginPath(); ctx.roundRect(0, 0, sw, sh, rad); ctx.clip(); }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    if (annCanvas && annCanvas.width > 0) ctx.drawImage(annCanvas, 0, 0, sw, sh);
    const dataUrl = c.toDataURL('image/png');
    return dataUrl.replace(/^data:image\/png;base64,/, '');
  }

  function loadImage(src) {
    return new Promise((res, rej) => {
      const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src;
    });
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function toast(msg, isError = false) {
    const old = document.getElementById('ec-toast');
    if (old) old.remove();
    const t = document.createElement('div');
    t.id = 'ec-toast';
    t.style.cssText = `background:${isError ? 'rgba(40,4,4,0.92)' : 'rgba(4,24,12,0.92)'};border:1px solid ${isError ? 'rgba(220,38,38,0.5)' : 'rgba(0,200,100,0.4)'};color:${isError ? '#f87171' : '#4ade80'};opacity:0;transform:translateY(8px);`;
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(8px)'; setTimeout(() => t.remove(), 280); }, 2600);
  }

  // ─── IPC listeners ──────────────────────────────────────────────────────────

  window.pixie.onInit((data) => {
    scaleFactor = data.scaleFactor || 2;
    init();
  });

  window.pixie.onActivateHover((data) => {
    active = true;
    windowRects = data.windows || [];
    state = S.HOVER;
    captureMode = 'hover';
    hoveredWinRect = null;
    document.body.style.cursor = 'crosshair';
    drawHoverHighlight(null);
  });

  window.pixie.onActivateDrag(() => {
    active = true;
    state = S.IDLE;
    captureMode = 'drag';
    document.body.style.cursor = 'crosshair';
  });

  window.pixie.onDeactivate(() => {
    active = false;
    clearSel();
    document.body.style.cursor = 'default';
    hoveredWinRect = null;
    windowRects = [];
    hideHoverTip();
    hideOverlay();
  });

  window.pixie.onToast((msg) => { toast(msg); });
})();
