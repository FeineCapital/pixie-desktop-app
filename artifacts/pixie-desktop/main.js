const {
  app, BrowserWindow, globalShortcut, desktopCapturer,
  clipboard, nativeImage, ipcMain, screen, Tray, Menu
} = require('electron');
const path = require('path');
const fs   = require('fs');
const os   = require('os');

let overlayWin = null;
let tray       = null;

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

function createTray() {
  const icon = nativeImage.createEmpty();
  tray = new Tray(icon);
  tray.setTitle('⊡');
  const menu = Menu.buildFromTemplate([
    { label: 'Pixie', enabled: false },
    { type: 'separator' },
    { label: 'Capture  (⌘⇧6)', click: activateCapture },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setContextMenu(menu);
  tray.setToolTip('Pixie — ⌘⇧6 to capture');
}

function activateCapture() {
  if (!overlayWin) return;
  overlayWin.setFocusable(true);
  overlayWin.setIgnoreMouseEvents(false);
  overlayWin.focus();

  desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: { width: 1, height: 1 }
  }).then(async (sources) => {
    if (!sources.length) return;
    overlayWin.webContents.send('activate');
  });
}

function deactivateCapture() {
  if (!overlayWin) return;
  overlayWin.setIgnoreMouseEvents(true);
  overlayWin.setFocusable(false);
  overlayWin.webContents.send('deactivate');
}

ipcMain.handle('take-screenshot', async () => {
  const primary = screen.getPrimaryDisplay();
  const { bounds, scaleFactor } = primary;

  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: {
      width: Math.round(bounds.width * scaleFactor),
      height: Math.round(bounds.height * scaleFactor)
    }
  });

  if (!sources.length) return null;
  const img = sources[0].thumbnail;
  return img.toPNG().toString('base64');
});

ipcMain.handle('copy-to-clipboard', async (_e, base64) => {
  const img = nativeImage.createFromBuffer(Buffer.from(base64, 'base64'));
  clipboard.writeImage(img);
  return true;
});

ipcMain.handle('save-to-desktop', async (_e, base64) => {
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filePath = path.join(os.homedir(), 'Desktop', `pixie-${ts}.png`);
  fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
  return filePath;
});

ipcMain.on('deactivate', () => deactivateCapture());

app.dock.hide();

app.whenReady().then(() => {
  createOverlay();
  createTray();

  globalShortcut.register('CommandOrControl+Shift+6', () => {
    activateCapture();
  });
});

app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', (e) => e.preventDefault());
