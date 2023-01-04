/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, globalShortcut, clipboard } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { resolveHtmlPath, trimPunctuation } from './util';
import Store from "electron-store"
import nspell from 'nspell'
import fs from "fs"
import mime from "mime-types"
import isTextPath from "is-text-path"
import notifier from "node-notifier"

const RESOURCES_PATH = app.isPackaged
? path.join(process.resourcesPath, 'assets')
: path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

// 15 Megabytes in bytes
const fileSizeLimit = 15 * 1024 * 1024

let spelling: nspell | null = null
async function  loadSpelling() {
  const aff = fs.readFileSync(getAssetPath("en_GB.aff"), "utf8")
  const dic = fs.readFileSync(getAssetPath("en_GB.dic"), "utf8")
  spelling = nspell(aff, dic)
}
loadSpelling()

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const electronStore = new Store()
ipcMain.on('ipc', async (event, arg) => {
  const method = arg[0];

  switch (method) {
    case 'is-window-focused': {
      event.returnValue = mainWindow!.isFocused();
      break;
    }
    case 'toast-notification': {
      notifier.notify({
        title: arg[1],
        message: arg[2],
        icon: getAssetPath("IconLight.png"),
        sound: true,
        appID: "Clipboard TTS",
      })
      break;
    }
    case 'get-platform': {
      event.returnValue = process.platform as string;
      break;
    }
    case 'titlebar-control': {
      const control = arg[1];

      switch (control) {
        case 'minimize': {
          mainWindow!.minimize();
          event.returnValue = true
          break;
        }
        case 'maximize': {
          mainWindow!.isMaximized() ? mainWindow!.unmaximize() : mainWindow!.maximize();
          event.returnValue = true
          break;
        }
        case 'close': {
          mainWindow!.close();
          event.returnValue = true
          break;
        }
        case 'isMaximized': {
          event.returnValue = mainWindow!.isMaximized()
          break;
        }
      }
      break;
    }
    case 'electron-store-get':
      event.returnValue = electronStore.get(arg[1]);
      break;
    case 'electron-store-set':
      electronStore.set(arg[1].key, arg[1].value);
      break;
    case 'electron-store-clear': {
      electronStore.store = {}
      break;
    }
    case 'electron-load-file': {
      if (fs.lstatSync(arg[1]).isDirectory()) {
        event.returnValue = { error: "Cannot load a directory" }
        return
      }

      if (fs.lstatSync(arg[1]).size > fileSizeLimit) {
        event.returnValue = { error: "File too large. 15MB Max" }
        break;
      }

      const file = await fs.promises.readFile(arg[1])
      const stats = fs.statSync(arg[1])

      if (!stats.isFile()) {
        event.returnValue = { error: 'File type not supported'}
        return
      }

      const mimeType = mime.lookup(arg[1])

      if (!mimeType ||                                                    // If no mime type
          (mimeType === "text/html" && isTextPath(arg[1])) ||             // If it's a html file (have to check isTextPath because sometimes text/html is an image)
          mimeType === "image/gif" ||                                     // If it's a gif
          (!mimeType.includes("image/") && !mimeType.includes("text/"))   // If it's not an image or text
        ) {
        event.returnValue = { error: "File type not supported" }
        break;
      }

      event.returnValue = {
        file,
        mimeType
      }
      break;
    }
    case 'electron-clipboard-read': {
      event.returnValue = clipboard.read("clipboard")
      break;
    }
    case 'electron-clipboard-read-text': {
      event.returnValue = clipboard.readText("clipboard")
      break;
    }
    case 'electron-clipboard-write-text': {
      clipboard.writeText(arg[1], "clipboard")
      event.returnValue = true
      break;
    }
    case 'electron-clipboard-read-image': {
      event.returnValue = clipboard.readImage("clipboard").toDataURL()
      break;
    }
    case 'electron-clipboard-format': {
      event.returnValue = clipboard.availableFormats("clipboard")[0] || []
      break;
    }
    case 'get-spelling-suggestions': {
      // remove all punctuation
      const text = arg[1].split(" ").map((i: string) => trimPunctuation(i)).join(" ")
      let words = text.split(" ")

      // filter and remove all numbers from the text
      words = words.filter((i: string) => isNaN(+i))

      // remove all words that don't have any letters
      words = words.filter((i: string) => i.match(/[a-zA-Z]/))

      const misspelled = words.filter((word: string) => !spelling!.correct(word))

      const corrections: { word: string, suggestions: string[] }[] = misspelled.map((word: string) => {
        const suggestions = spelling!.suggest(word)
        return { word, suggestions }
      })

      event.returnValue = corrections
      break;
    }
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 850,
    autoHideMenuBar: true,
    minWidth: 750,
    minHeight: 650,
    frame: process.platform === 'win32' ? false : true,
    icon: getAssetPath("IconLight.png"),
    webPreferences: {
      sandbox: false,
      backgroundThrottling: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  const shortcuts = ["Control+[", "Control+]", "Control+Alt+]", "Control+,", "Control+.", "Control+/"]
  shortcuts.forEach(shortcut => globalShortcut.register(shortcut, () => mainWindow!.webContents.send('shortcuts', shortcut)))

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
