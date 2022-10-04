import { ClipboardAction, SpellingSuggestions, UploadedFile } from "renderer/types";

export function electronStoreGet(key: string): any {
  return window.electron.ipcRenderer.sendMessageSync("ipc", ["electron-store-get", key])
}

export function electronStoreSet(key: string, value: any): void {
  window.electron.ipcRenderer.sendMessage("ipc", ["electron-store-set", { key, value }])
}

export function electronStoreClear(): void {
  window.electron.ipcRenderer.sendMessage("ipc", ["electron-store-clear"])
}

export function electronClipboard(action: ClipboardAction, ...data: any): any {
  return window.electron.ipcRenderer.sendMessageSync("ipc", [action, ...data])
}

export function getSpellingSuggestions(text: string): SpellingSuggestions[] {
  return window.electron.ipcRenderer.sendMessageSync("ipc", ["get-spelling-suggestions", text]) as SpellingSuggestions[]
}

export function electronLoadFile(path: string): UploadedFile {
  return window.electron.ipcRenderer.sendMessageSync("ipc", ["electron-load-file", path]) as UploadedFile
}

export function titlebarControl(control: string): any {
  return window.electron.ipcRenderer.sendMessageSync("ipc", ["titlebar-control", control])
}

export function getPlatform(): string {
  return window.electron.ipcRenderer.sendMessageSync("ipc", ["get-platform"]) as string
}

export function toastNotification(title: string, message: string) {
  window.electron.ipcRenderer.sendMessage("ipc", ["toast-notification", title, message])
}
