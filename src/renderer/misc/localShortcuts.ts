import { Shortcut } from "renderer/types"
import { useStore } from "renderer/store"
import { isWindowFocused } from "renderer/utils"

const localShortcuts: Shortcut[] = [
  {
    keybinding: "Space",
    command: async () => {
      if (!useStore.getState().shortcutsEnabled || !(isWindowFocused())) return

      // pause speaking
      const store = useStore.getState()
      if (store.currentlySpeaking) {
        store.setCurrentlyPaused(false)
        useStore.setState({ ...store, pauseSpeech: store.pauseSpeech + 1 })
      }
    },
    commandName: "Pause / Resume (When window focused)",
    tooltip: "Pause or resume the current speech when the window is focused"
  }
]

export default localShortcuts;
