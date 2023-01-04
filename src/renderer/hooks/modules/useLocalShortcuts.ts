import localShortcuts from 'renderer/misc/localShortcuts'
import { useEffect, useMemo }  from "react"

// Shortcuts that will only be ran when the application is in focus.
export const useLocalShortcuts = () => {
  const keyStates = useMemo(() => {
    return localShortcuts.map(shortcut => {
      return {
        keybinding: shortcut.keybinding,
        down: false,
      }
    })
  }, [])

  const onKeyDown = (e: any) => {
    const keyState = keyStates.find((keyState) => keyState.keybinding === e.code)
    if (keyState)
      localShortcuts.find(s => s.keybinding === keyState.keybinding)?.command()
  }

  useEffect(() => {
    window.addEventListener('keydown', (e: any) => onKeyDown(e))

    return () =>
      window.removeEventListener('keydown', (e: any) => onKeyDown(e))
  }, [])
}
