import shortcuts      from 'renderer/misc/shortcuts'
import { useEffect }  from "react"

export const useShortcuts = () => {
  useEffect(() => {
    window.electron.ipcRenderer.on('shortcuts', (keybinding: any) => {
      const shortcut = shortcuts.find(s => s.keybinding === keybinding)
      shortcut?.command()
    })
  }, [])
}
