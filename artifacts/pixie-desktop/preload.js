const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pixie', {
  onInit:           (cb) => ipcRenderer.on('init', (_e, data) => cb(data)),
  onActivateHover:  (cb) => ipcRenderer.on('activate-hover', (_e, data) => cb(data)),
  onActivateDrag:   (cb) => ipcRenderer.on('activate-drag', () => cb()),
  onDeactivate:     (cb) => ipcRenderer.on('deactivate', () => cb()),
  onToast:          (cb) => ipcRenderer.on('toast', (_e, msg) => cb(msg)),
  deactivate:       ()   => ipcRenderer.send('deactivate'),
  takeScreenshot:   ()   => ipcRenderer.invoke('take-screenshot'),
  copyToClipboard:  (b64) => ipcRenderer.invoke('copy-to-clipboard', b64),
  saveToDesktop:    (b64) => ipcRenderer.invoke('save-to-desktop', b64),
});
