const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ec', {
  captureScreen:  ()      => ipcRenderer.invoke('capture-screen'),
  setIgnoreMouse: ignore  => ipcRenderer.invoke('set-ignore-mouse', ignore),
  writeClipboard: dataURL => ipcRenderer.invoke('write-clipboard', dataURL),
  saveFile:       dataURL => ipcRenderer.invoke('save-file', dataURL),
  deactivate:     ()      => ipcRenderer.invoke('deactivate'),

  onInit:         cb => ipcRenderer.on('init',       (_, d) => cb(d)),
  onActivate:     cb => ipcRenderer.on('activate',   () => cb()),
  onDeactivate:   cb => ipcRenderer.on('deactivate', () => cb()),
});
