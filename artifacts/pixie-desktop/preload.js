const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pixie', {
  onInit:       (cb) => ipcRenderer.on('init', (_e, data) => cb(data)),
  onActivate:   (cb) => ipcRenderer.on('activate', () => cb()),
  onDeactivate: (cb) => ipcRenderer.on('deactivate', () => cb()),
  deactivate:   ()   => ipcRenderer.send('deactivate'),
  takeScreenshot:   () => ipcRenderer.invoke('take-screenshot'),
  copyToClipboard:  (b64) => ipcRenderer.invoke('copy-to-clipboard', b64),
  saveToDesktop:    (b64) => ipcRenderer.invoke('save-to-desktop', b64),
});
