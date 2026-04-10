const {
  app, BrowserWindow, globalShortcut, desktopCapturer,
  clipboard, nativeImage, ipcMain, screen, Tray, Menu
} = require('electron');
const path = require('path');
const fs   = require('fs');
const os   = require('os');

let overlayWin = null;
let tray       = null;

/* ─────────────────────────────────────────
   Overlay window
───────────────────────────────────────── */
function createOverlay() {
  const primary = screen.getPrimaryDisplay();
  const { bounds, scaleFactor } = primary;

  overlayWin = new BrowserWindow({
    x:      bounds.x,
    y:      bounds.y,
    width:  bounds.width,
    height: bounds.height,
    transparent:   true,
    frame:         false,
    alwaysOnTop:   true,
    focusable:     false,
    skipTaskbar:   true,
    hasShadow:     false,
    resizable:     false,
    movable:       false,
    webPreferences: {
      preload:          path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration:  false,
    },
  });

  overlayWin.setIgnoreMouseEvents(true);
  overlayWin.setAlwaysOnTop(true, 'screen-saver');
  overlayWin.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  overlayWin.loadFile('index.html');

  overlayWin.webContents.once('did-finish-load', () => {
    overlayWin.webContents.send('init', { scaleFactor });
  });
}

/* ─────────────────────────────────────────
   Tray icon (keeps app alive without dock)
───────────────────────────────────────── */
function createTray() {
  const icon = nativeImage.createEmpty();
  tray = new Tray(icon);
  tray.setTitle('⊡');
  const menu = Menu.buildFromTemplate([
    { label: 'Element Capture', enabled: false },
    { type: 'separator' },
    { label: 'Capture  (⌘⇧6)', click: activateCapture },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setContextMenu(menu);
  tray.setToolTip('Element Capture — ⌘⇧6 to activate');
}

function activateCapture() {
  if (!overlayWin) return;
  overlayWin.setFocusable(true);
  overlayWin.setIgnoreMouseEvents(false);
  overlayWin.focus();
  overlayWin.webContents.send('activate');
}

/* ─────────────────────────────────────────
   App ready
───────────────────────────────────────── */
app.whenReady().then(() => {
  app.dock && app.dock.hide();  // hide from Dock; lives in menu bar
  createOverlay();
  createTray();

  const ok = globalShortcut.register('CommandOrControl+Shift+6', activateCapture);
  if (!ok) console.warn('[element-capture] Could not register global shortcut.');
});

app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', () => { /* keep alive in tray */ });

/* ─────────────────────────────────────────
   IPC handlers
───────────────────────────────────────── */

/* Capture the screen (hide overlay first so our UI is not in the shot) */
ipcMain.handle('capture-screen', async () => {
  const primary = screen.getPrimaryDisplay();
  const { bounds, scaleFactor } = primary;

  overlayWin.hide();
  await delay(120);

  let dataURL;
  try {
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: {
        width:  Math.round(bounds.width  * scaleFactor),
        height: Math.round(bounds.height * scaleFactor),
      },
    });
    if (!sources.length) throw new Error('No screen source');
    dataURL = sources[0].thumbnail.toDataURL();
  } finally {
    overlayWin.show();
  }
  return dataURL;
});

/* Enable / disable mouse passthrough */
ipcMain.handle('set-ignore-mouse', (_, ignore) => {
  if (!overlayWin) return;
  if (ignore) {
    overlayWin.setFocusable(false);
    overlayWin.setIgnoreMouseEvents(true);
  } else {
    overlayWin.setFocusable(true);
    overlayWin.setIgnoreMouseEvents(false);
    overlayWin.focus();
  }
});

/* Write PNG to clipboard */
ipcMain.handle('write-clipboard', (_, dataURL) => {
  clipboard.writeImage(nativeImage.createFromDataURL(dataURL));
});

/* Save PNG to Desktop */
ipcMain.handle('save-file', async (_, dataURL) => {
  const buf  = Buffer.from(dataURL.split(',')[1], 'base64');
  const ts   = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const dest = path.join(os.homedir(), 'Desktop', `capture-${ts}.png`);
  fs.writeFileSync(dest, buf);
  return dest;
});

/* Renderer tells main it's done; go back to passthrough */
ipcMain.handle('deactivate', () => {
  if (!overlayWin) return;
  overlayWin.setFocusable(false);
  overlayWin.setIgnoreMouseEvents(true);
  overlayWin.webContents.send('deactivate');
});

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
