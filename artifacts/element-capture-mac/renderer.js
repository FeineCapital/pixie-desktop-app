/* ═══════════════════════════════════════════════════════════════
   Element Capture — Electron renderer
   Works on any macOS window, not just Chrome.
═══════════════════════════════════════════════════════════════ */

/* ── constants ── */
const S = { IDLE: 0, DRAG: 1, SELECTED: 2 };
const COLORS = ['#ffffff', '#ef4444', '#f97316', '#facc15', '#4ade80', '#60a5fa', '#a78bfa'];
const STROKE_W = 3;

/* ── state ── */
let state    = S.IDLE;
let active   = false;
let scaleFactor = 1;

/* ── drag ── */
let dragStart = null;
let selRect   = null;

/* ── annotation ── */
let drawing   = false;
let tool      = 'pencil';  // 'pencil' | 'eraser'
let color     = '#ffffff';
let lastAnn   = null;

/* ── DOM refs ── */
let selBox    = null;
let handles   = [];
let toolbar   = null;
let annCanvas = null;
let annCtx    = null;
let ovCanvas  = null;
let ovCtx     = null;
let dimLabel  = null;
let toastEl   = null;
let hintEl    = null;
let toastTimer = null;

/* ═══════════════════════════════════════════════════════════════
   BOOTSTRAP
═══════════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  injectCSS();
  buildDOM();

  window.ec.onInit(d => { scaleFactor = d.scaleFactor || 1; });
  window.ec.onActivate(activate);
  window.ec.onDeactivate(deactivate);
});

function injectCSS() {
  const l = document.createElement('link');
  l.rel  = 'stylesheet';
  l.href = 'styles.css';
  document.head.appendChild(l);
}

function buildDOM() {
  /* overlay canvas — shows dim + cutout during drag */
  ovCanvas = document.createElement('canvas');
  ovCanvas.id = 'ec-ov';
  Object.assign(ovCanvas.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100vw', height: '100vh',
    display: 'none', zIndex: '5',
    pointerEvents: 'none',
  });
  document.body.appendChild(ovCanvas);

  /* dim label */
  dimLabel = document.createElement('div');
  dimLabel.id = 'ec-dim';
  Object.assign(dimLabel.style, {
    position: 'fixed', display: 'none', zIndex: '15',
    padding: '3px 8px', borderRadius: '6px',
    background: 'rgba(0,0,0,0.65)',
    color: 'rgba(255,255,255,0.85)',
    font: '11px -apple-system,BlinkMacSystemFont,sans-serif',
    pointerEvents: 'none', whiteSpace: 'nowrap',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.1)',
  });
  document.body.appendChild(dimLabel);

  /* selection box */
  selBox = document.createElement('div');
  selBox.id = 'ec-sel';
  document.body.appendChild(selBox);

  /* 8 handles */
  const CORNERS = ['nw','n','ne','e','se','s','sw','w'];
  CORNERS.forEach(c => {
    const h = document.createElement('div');
    h.className = 'ec-hnd';
    h.dataset.c = c;
    document.body.appendChild(h);
    handles.push(h);
  });

  /* annotation canvas */
  annCanvas = document.createElement('canvas');
  annCanvas.id = 'ec-ann';
  Object.assign(annCanvas.style, {
    position: 'fixed', display: 'none', zIndex: '12', cursor: 'crosshair',
  });
  document.body.appendChild(annCanvas);
  annCtx = annCanvas.getContext('2d');

  /* toolbar */
  toolbar = buildToolbar();
  document.body.appendChild(toolbar);

  /* toast */
  toastEl = document.createElement('div');
  toastEl.id = 'ec-toast';
  document.body.appendChild(toastEl);

  /* hint */
  hintEl = document.createElement('div');
  hintEl.id = 'ec-hint';
  hintEl.innerHTML = 'Drag to select an area &nbsp;·&nbsp; <span>Esc</span> to cancel';
  document.body.appendChild(hintEl);
}

function buildToolbar() {
  const tb = document.createElement('div');
  tb.id = 'ec-tb';

  const pencilBtn = mkBtn('✏', 'Pencil', () => setTool('pencil'));
  pencilBtn.id = 'ec-pencil';
  pencilBtn.classList.add('active');
  tb.appendChild(pencilBtn);

  const eraserBtn = mkBtn('⌫', 'Eraser', () => setTool('eraser'));
  eraserBtn.id = 'ec-eraser';
  tb.appendChild(eraserBtn);

  tb.appendChild(sep());

  COLORS.forEach(c => {
    const dot = document.createElement('div');
    dot.className = 'ec-col' + (c === color ? ' active' : '');
    dot.style.background = c;
    dot.title = c;
    dot.addEventListener('click', () => {
      document.querySelectorAll('.ec-col').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      color = c;
      setTool('pencil');
    });
    tb.appendChild(dot);
  });

  tb.appendChild(sep());

  const copyBtn = mkBtn('Copy', 'Copy to clipboard', doCapture);
  copyBtn.className = 'ec-cap';
  tb.appendChild(copyBtn);

  const saveBtn = mkBtn('Save', 'Save to Desktop', doSave);
  saveBtn.className = 'ec-sav';
  tb.appendChild(saveBtn);

  tb.appendChild(sep());

  const closeBtn = mkBtn('×', 'Cancel', () => deactivate());
  closeBtn.className = 'ec-x';
  tb.appendChild(closeBtn);

  return tb;
}

function mkBtn(label, title, handler) {
  const b = document.createElement('button');
  b.textContent = label;
  b.title = title;
  b.addEventListener('click', e => { e.stopPropagation(); handler(); });
  return b;
}

function sep() {
  const d = document.createElement('div');
  d.className = 'sep';
  return d;
}

/* ═══════════════════════════════════════════════════════════════
   ACTIVATE / DEACTIVATE
═══════════════════════════════════════════════════════════════ */
function activate() {
  if (active) return;
  active = true;
  state  = S.IDLE;

  hintEl.style.display = 'block';

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup',   onMouseUp);
  document.addEventListener('keydown',   onKeyDown);
}

function deactivate() {
  active = false;
  state  = S.IDLE;
  dragStart = null;
  selRect   = null;

  hintEl.style.display   = 'none';
  ovCanvas.style.display = 'none';
  dimLabel.style.display = 'none';
  selBox.style.display   = 'none';
  handles.forEach(h => h.style.display = 'none');
  if (toolbar)   toolbar.style.display   = 'none';
  if (annCanvas) annCanvas.style.display = 'none';
  if (annCtx)    annCtx.clearRect(0, 0, annCanvas.width, annCanvas.height);

  document.removeEventListener('mousedown', onMouseDown);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup',   onMouseUp);
  document.removeEventListener('keydown',   onKeyDown);

  window.ec.setIgnoreMouse(true);
}

/* ═══════════════════════════════════════════════════════════════
   MOUSE HANDLERS
═══════════════════════════════════════════════════════════════ */
function onMouseDown(e) {
  if (e.target.closest('#ec-tb, #ec-ann')) return;
  if (state === S.SELECTED) clearSel();

  dragStart = { x: e.clientX, y: e.clientY };
  state = S.DRAG;
  hintEl.style.display = 'none';

  // Init overlay canvas
  ovCanvas.width  = window.innerWidth;
  ovCanvas.height = window.innerHeight;
  ovCanvas.style.display = 'block';
  drawOverlay({ left: e.clientX, top: e.clientY, width: 0, height: 0 });
}

function onMouseMove(e) {
  if (state === S.DRAG && dragStart) {
    const r = mkRect(dragStart, { x: e.clientX, y: e.clientY });
    drawOverlay(r);
    showDimLabel(r);
  }

  if (state === S.SELECTED && drawing && annCtx) {
    const rect = annCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'eraser') {
      annCtx.globalCompositeOperation = 'destination-out';
      annCtx.lineWidth = 18;
    } else {
      annCtx.globalCompositeOperation = 'source-over';
      annCtx.strokeStyle = color;
      annCtx.lineWidth   = STROKE_W;
    }

    if (lastAnn) {
      annCtx.beginPath();
      annCtx.moveTo(lastAnn.x, lastAnn.y);
      annCtx.lineTo(x, y);
      annCtx.stroke();
    }
    lastAnn = { x, y };
  }
}

function onMouseUp(e) {
  if (state !== S.DRAG || !dragStart) return;
  const r = mkRect(dragStart, { x: e.clientX, y: e.clientY });
  dragStart = null;

  if (r.width < 8 || r.height < 8) {
    ovCanvas.style.display = 'none';
    dimLabel.style.display = 'none';
    state = S.IDLE;
    hintEl.style.display = 'block';
    return;
  }

  state   = S.SELECTED;
  selRect = r;

  ovCanvas.style.display = 'none';
  dimLabel.style.display = 'none';

  posSelBox(r);
  posHandles(r);
  showToolbar(r);
  setupAnnCanvas(r);
}

/* ═══════════════════════════════════════════════════════════════
   KEYBOARD
═══════════════════════════════════════════════════════════════ */
function onKeyDown(e) {
  if (e.key === 'Escape') { deactivate(); return; }
  if (state !== S.SELECTED) return;
  if (e.key === 'Enter')                             { e.preventDefault(); doSave(); }
  if (e.key === 'c' && (e.metaKey || e.ctrlKey))    { e.preventDefault(); doCapture(); }
}

/* ═══════════════════════════════════════════════════════════════
   OVERLAY CANVAS
═══════════════════════════════════════════════════════════════ */
function drawOverlay(r) {
  const W = ovCanvas.width, H = ovCanvas.height;
  ovCtx = ovCanvas.getContext('2d');
  ovCtx.clearRect(0, 0, W, H);

  ovCtx.fillStyle = 'rgba(0,0,0,0.48)';
  ovCtx.fillRect(0, 0, W, H);

  if (r.width > 0 && r.height > 0) {
    ovCtx.save();
    ovCtx.globalCompositeOperation = 'destination-out';
    ovCtx.beginPath();
    const rad = 10;
    ovCtx.moveTo(r.left + rad, r.top);
    ovCtx.arcTo(r.left + r.width, r.top,            r.left + r.width, r.top + r.height, rad);
    ovCtx.arcTo(r.left + r.width, r.top + r.height, r.left,           r.top + r.height, rad);
    ovCtx.arcTo(r.left,           r.top + r.height, r.left,           r.top,            rad);
    ovCtx.arcTo(r.left,           r.top,             r.left + r.width, r.top,            rad);
    ovCtx.closePath();
    ovCtx.fill();
    ovCtx.restore();
  }
}

function showDimLabel(r) {
  dimLabel.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
  dimLabel.style.display = 'block';
  let lx = r.left + r.width / 2 - 30;
  let ly = r.top + r.height + 8;
  if (ly + 24 > window.innerHeight) ly = r.top - 28;
  dimLabel.style.left = `${lx}px`;
  dimLabel.style.top  = `${ly}px`;
}

/* ═══════════════════════════════════════════════════════════════
   SELECTION BOX & HANDLES
═══════════════════════════════════════════════════════════════ */
function posSelBox(r) {
  selBox.style.left    = `${r.left}px`;
  selBox.style.top     = `${r.top}px`;
  selBox.style.width   = `${r.width}px`;
  selBox.style.height  = `${r.height}px`;
  selBox.style.display = 'block';
}

const HANDLE_POS = {
  nw: r => [r.left,              r.top],
  n:  r => [r.left + r.width/2,  r.top],
  ne: r => [r.left + r.width,    r.top],
  e:  r => [r.left + r.width,    r.top + r.height/2],
  se: r => [r.left + r.width,    r.top + r.height],
  s:  r => [r.left + r.width/2,  r.top + r.height],
  sw: r => [r.left,              r.top + r.height],
  w:  r => [r.left,              r.top + r.height/2],
};

function posHandles(r) {
  handles.forEach(h => {
    const [x, y] = HANDLE_POS[h.dataset.c](r);
    h.style.left    = `${x - 4}px`;
    h.style.top     = `${y - 4}px`;
    h.style.display = 'block';
  });
}

function hideHandles() { handles.forEach(h => h.style.display = 'none'); }

function clearSel() {
  selRect = null; state = S.IDLE;
  selBox.style.display = 'none';
  hideHandles();
  if (toolbar)   toolbar.style.display   = 'none';
  if (annCanvas) annCanvas.style.display = 'none';
  if (annCtx)    annCtx.clearRect(0, 0, annCanvas.width, annCanvas.height);
  hintEl.style.display = 'block';
}

/* ═══════════════════════════════════════════════════════════════
   TOOLBAR POSITION
═══════════════════════════════════════════════════════════════ */
function showToolbar(r) {
  toolbar.style.display = 'flex';
  const tbW = toolbar.offsetWidth  || 360;
  const tbH = toolbar.offsetHeight || 52;
  let tx = r.left + r.width / 2 - tbW / 2;
  let ty = r.top + r.height + 12;
  if (tx < 8) tx = 8;
  if (tx + tbW > window.innerWidth  - 8) tx = window.innerWidth  - tbW - 8;
  if (ty + tbH > window.innerHeight - 8) ty = r.top - tbH - 12;
  toolbar.style.left = `${tx}px`;
  toolbar.style.top  = `${ty}px`;
}

/* ═══════════════════════════════════════════════════════════════
   ANNOTATION CANVAS
═══════════════════════════════════════════════════════════════ */
function setupAnnCanvas(r) {
  annCanvas.width  = r.width;
  annCanvas.height = r.height;
  annCanvas.style.left    = `${r.left}px`;
  annCanvas.style.top     = `${r.top}px`;
  annCanvas.style.width   = `${r.width}px`;
  annCanvas.style.height  = `${r.height}px`;
  annCanvas.style.display = 'block';

  annCtx.clearRect(0, 0, r.width, r.height);
  annCtx.lineCap  = 'round';
  annCtx.lineJoin = 'round';

  annCanvas.addEventListener('mousedown', annStart);
  annCanvas.addEventListener('mousemove', onMouseMove);
  annCanvas.addEventListener('mouseup',   annEnd);
  annCanvas.addEventListener('mouseleave', annEnd);
}

function annStart(e) {
  drawing = true;
  const rect = annCanvas.getBoundingClientRect();
  lastAnn = { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function annEnd() { drawing = false; lastAnn = null; }

function setTool(t) {
  tool = t;
  document.getElementById('ec-pencil').classList.toggle('active', t === 'pencil');
  document.getElementById('ec-eraser').classList.toggle('active', t === 'eraser');
}

/* ═══════════════════════════════════════════════════════════════
   CAPTURE — COPY
═══════════════════════════════════════════════════════════════ */
async function doCapture() {
  if (!selRect) return;
  hideUI();
  await sleep(65);

  let ok = false;
  try {
    const base64 = await window.ec.captureScreen();  // main hides window, captures, shows
    const dataURL = await mergeToDataURL(base64);
    await window.ec.writeClipboard(dataURL);
    toast('Copied to clipboard ✓');
    ok = true;
  } catch (err) {
    toast('Copy failed: ' + err.message, true);
    restoreUI();
  }

  if (ok) { await window.ec.deactivate(); deactivate(); }
}

/* ═══════════════════════════════════════════════════════════════
   CAPTURE — SAVE
═══════════════════════════════════════════════════════════════ */
async function doSave() {
  if (!selRect) return;
  hideUI();
  await sleep(65);

  let ok = false;
  try {
    const base64 = await window.ec.captureScreen();
    const dataURL = await mergeToDataURL(base64);
    const dest    = await window.ec.saveFile(dataURL);
    toast('Saved to Desktop ✓');
    ok = true;
  } catch (err) {
    toast('Save failed: ' + err.message, true);
    restoreUI();
  }

  if (ok) { await window.ec.deactivate(); deactivate(); }
}

/* ─── helpers ─── */
function hideUI() {
  selBox.style.display        = 'none';
  toolbar.style.display       = 'none';
  annCanvas.style.visibility  = 'hidden';
  hintEl.style.display        = 'none';
  hideHandles();
}

function restoreUI() {
  if (!selRect) return;
  posSelBox(selRect);
  posHandles(selRect);
  toolbar.style.display      = 'flex';
  annCanvas.style.visibility = 'visible';
}

async function mergeToDataURL(base64) {
  const dpr = scaleFactor;
  const r   = selRect;

  const img = await loadImage('data:image/png;base64,' + base64);
  const sx = Math.round(r.left   * dpr);
  const sy = Math.round(r.top    * dpr);
  const sw = Math.round(r.width  * dpr);
  const sh = Math.round(r.height * dpr);

  const c = document.createElement('canvas');
  c.width = sw; c.height = sh;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

  // Merge annotations (scale up to match screenshot DPR)
  if (annCanvas && annCanvas.width > 0) {
    ctx.drawImage(annCanvas, 0, 0, sw, sh);
  }

  return c.toDataURL('image/png');
}

function loadImage(src) {
  return new Promise((res, rej) => {
    const i = new Image();
    i.onload  = () => res(i);
    i.onerror = rej;
    i.src     = src;
  });
}

/* ═══════════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════════ */
function toast(msg, isErr = false) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.className   = 'show' + (isErr ? ' err' : '');
  toastTimer = setTimeout(() => { toastEl.className = ''; }, 2800);
}

/* ═══════════════════════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════════════════════ */
function mkRect(a, b) {
  return {
    left:   Math.min(a.x, b.x),
    top:    Math.min(a.y, b.y),
    width:  Math.abs(b.x - a.x),
    height: Math.abs(b.y - a.y),
  };
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
