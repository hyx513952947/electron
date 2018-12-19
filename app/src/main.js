'use strict';
const {app, BrowserWindow} = require('electron');
let url = require('url');
let path = require('path');
let mainWindow
let ws = require('./d/FileService')
ws(function (result) {
    mainWindow.webContents.send('asynchronous-reply',result)
})
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900
    })
    // mainWindow.loadURL('http://localhost:3000/')
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:'
    }))
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

