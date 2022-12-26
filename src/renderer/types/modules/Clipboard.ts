
export type ClipboardAction = 'electron-clipboard-read' | 'electron-clipboard-read-text' | 'electron-clipboard-read-image' | 'electron-clipboard-format' | 'electron-clipboard-write-text'

export type ClipboardData = {
  mimeType: string,
  data: string
}
