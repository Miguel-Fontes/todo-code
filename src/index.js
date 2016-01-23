/*'use strict'
var directory = require('./directory')({path: './/..//', recursive: true, extensions: ['.js'], ignore: ['node_modules', '.git', 'vscode', 'dist']}) // Para um teste mais legal -> .//..//..//loja-concept//
var file = require('./file')({parse: [require('./todo-parse'), require('./slash-parse')]})
var container = require('./container')

try {
  let archive = container({value: directory.getContent()})

  archive.map(function (f) {
    return file
      .open(f)
      .parse()
      .getData()
  })

  archive.filter((f) => {
    if (f.content.length > 0) {
      return true
    }
  })

  archive.log()

} catch (e) {
  console.log(e)
}*/

const electron = require('electron')
const app = electron.app; // Module to control application life.
const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})
