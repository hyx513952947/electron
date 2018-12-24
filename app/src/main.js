'use strict';
const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');
// let ws = require('./d/FileService');
let mainWindow;

// ws(function (result) {
//     mainWindow.webContents.send('asynchronous-reply',result)
// })
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:'
    }));
    mainWindow.on('closed', function () {
        mainWindow = null
    });
    mainWindow.webContents.openDevTools();//开发模式时候才有，打包时候需要注释掉
    require('electron-connect').server.create(mainWindow)//开发模式时候才有，打包时候需要注释掉
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});

