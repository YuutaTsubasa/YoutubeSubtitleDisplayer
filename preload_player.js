const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  startTrackingVideoTime: () => {
    const video = document.querySelector('video');
    if (video) {
        setInterval(() => {
            ipcRenderer.send('video-time-update', video.currentTime); // 傳遞當前播放時間
        }, 500); // 每 500 毫秒發送一次
    }
  },
});