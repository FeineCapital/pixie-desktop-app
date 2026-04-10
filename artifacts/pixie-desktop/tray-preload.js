const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pixieTray', {
  action: (type) => ipcRenderer.send('tray-action', type),
});
