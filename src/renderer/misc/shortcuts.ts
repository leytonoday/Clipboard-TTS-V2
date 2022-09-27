import {
  translate,
  debuggingOutput,
  getAnnouncement,
  playBase64Audio,
  toggleOptionEnabled,
  getVoiceLanguageCode,
} from "renderer/utils"
import { Shortcut }     from "renderer/types"
import { useStore }     from "renderer/store"
import { isApiKeySet }  from "renderer/utils"

const translateAnnouncement = async (text: string) => {
  const store = useStore.getState()

  if (store.voice.languageCodes[0] === "en-US")
    return text

  const translatedText = await translate(text, getVoiceLanguageCode(store.voice.name))
  return translatedText.text
}

const shortcuts: Shortcut[] = [
  {
    keybinding: "Control+[",
    command: async () => {
      if (!useStore.getState().shortcutsEnabled) return

      toggleOptionEnabled("Enable / Disable")
      debuggingOutput(useStore.getState().shortcutsDebuggingOutput, "shortcutsDebuggingOutput", "Shortcut used - Enable / Disable")

      if (!isApiKeySet()) return
      const announcement = getAnnouncement("Enable / Disable", "Enabled", "Disabled")
      try {
        const translatedAnnouncement = await translateAnnouncement(announcement)
        await playBase64Audio(translatedAnnouncement);
      } catch {}
    },
    commandName: "Enable / Disable",
    tooltip: "Turn on or off the application TTS"
  },
  {
    keybinding: "Control+]",
    command: async () => {
      if (!useStore.getState().shortcutsEnabled) return

      // stop speaking
      const store = useStore.getState()
      store.setCurrentlySpeaking(false)
      useStore.setState({ ...store, stopSpeech: store.stopSpeech + 1 })

      debuggingOutput(useStore.getState().shortcutsDebuggingOutput, "shortcutsDebuggingOutput", "Shortcut used - Stop Speech")
    },
    commandName: "Stop Speech",
    tooltip: "Stop the current speech"
  },
  {
    keybinding: "Control+,",
    command: async () => {
      if (!useStore.getState().shortcutsEnabled) return

      const translationEnabled = useStore.getState().translationEnabled
      useStore.getState().setTranslationEnabled(!translationEnabled)
      debuggingOutput(useStore.getState().shortcutsDebuggingOutput, "shortcutsDebuggingOutput", "Shortcut used - Toggle Translation")

      if (!isApiKeySet()) return
      const announcement = translationEnabled ? "Translation disabled" : "Translation enabled"
      try {
        const translatedAnnouncement = await translateAnnouncement(announcement)
        await playBase64Audio(translatedAnnouncement);
      } catch {}
    },
    commandName: "Toggle Auto Dictionary",
    tooltip: "Toggle the auto dictionary"
  },
  {
    keybinding: "Control+.",
    command: async () => {
      if (!useStore.getState().shortcutsEnabled) return

      const substitutionsEnabled = useStore.getState().substitutionsEnabled
      useStore.getState().setSubstitutionsEnabled(!substitutionsEnabled)
      debuggingOutput(useStore.getState().shortcutsDebuggingOutput, "shortcutsDebuggingOutput", "Shortcut used - Toggle Substitutions")

      if (!isApiKeySet()) return
      const announcement = substitutionsEnabled ? "Substitutions disabled" : "Substitutions enabled"
      try {
        const translatedAnnouncement = await translateAnnouncement(announcement)
        await playBase64Audio(translatedAnnouncement);
      } catch {}
    },
    commandName: "Toggle Translation",
    tooltip: "Toggle the translation"
  },
  {
    keybinding: "Control+/",
    command: async () => {
      if (!useStore.getState().shortcutsEnabled) return

      const autoDictionary = useStore.getState().autoDictionary
      useStore.getState().setAutoDictionary(!autoDictionary)
      debuggingOutput(useStore.getState().shortcutsDebuggingOutput, "shortcutsDebuggingOutput", "Shortcut used - Toggle Auto Dictionary")

      if (!isApiKeySet()) return
      const announcement = autoDictionary ? "Auto dictionary disabled" : "Auto dictionary enabled"
      try {
        const translatedAnnouncement = await translateAnnouncement(announcement)
        await playBase64Audio(translatedAnnouncement);
      } catch {}
    },
    commandName: "Toggle Substitutions",
    tooltip: "Toggle the substitutions"
  }
]

export default shortcuts;
