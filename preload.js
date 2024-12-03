const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args)),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  },
});