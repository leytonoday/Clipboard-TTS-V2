import globalShortcuts      from 'renderer/misc/globalShortcuts'
import { useEffect }  from "react"

// These shortcuts will be ran regardless of the application being in focus or not.
// The issue with these is that they capture the keybinding from other applications as well. So if ClipboardTTS is running,
// and another application uses the same keybinding as one of ClipboardTTS's shortcuts, it will not work for the other application.
export const useGlobalShortcuts = () => {
  useEffect(() => {
    window.electron.ipcRenderer.on('shortcuts', (keybinding: any) => {
      const shortcut = globalShortcuts.find(s => s.keybinding === keybinding)
      shortcut?.command()
    })
  }, [])
}
