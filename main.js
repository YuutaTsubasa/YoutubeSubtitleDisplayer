const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require("path");
const fs = require("fs");
const SrtParser = require("./srt-parser");

let playerWindow, subtitleWindow;
let subtitles = [];

app.whenReady().then(() => {
    createMainWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile('index.html');

    ipcMain.handle('select-subtitle-file', async () => {
        const result = await dialog.showOpenDialog({
            filters: [{name: 'Subtitles', extensions: ['srt']}],
            properties: ['openFile'],
        });

        if (!result.canceled) {
            const fileContent = fs.readFileSync(result.filePaths[0], 'utf-8');
            const parser = new SrtParser();
            subtitles = parser.parse(fileContent);

            return true;
        }

        return false;
    });

    ipcMain.on('start-play', (_, youtubeUrl) => {
        createPlayerWindow(youtubeUrl);
        createSubtitleWindow();
    });
}

function createPlayerWindow(youtubeUrl) {
    playerWindow = new BrowserWindow({
        width: 800,
        height: 450,
        webPreferences: {
            preload: path.join(__dirname, "preload_player.js"),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });
    playerWindow.loadURL(youtubeUrl);
    // 開始追蹤影片時間
    playerWindow.webContents.once('did-finish-load', () => {
        playerWindow.webContents.executeJavaScript('window.electron.startTrackingVideoTime()');
    });
}

function createSubtitleWindow() {
    subtitleWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });
    subtitleWindow.loadFile('subtitles.html');
    subtitleWindow.webContents.once('did-finish-load', () => {
      subtitleWindow.webContents.send('load-subtitles', subtitles);
    });
  
    ipcMain.on('video-time-update', (event, currentTime) => {
        if (!subtitleWindow || subtitleWindow.isDestroyed())
            return;
        subtitleWindow.webContents.send('update-time', currentTime);
    });
  }