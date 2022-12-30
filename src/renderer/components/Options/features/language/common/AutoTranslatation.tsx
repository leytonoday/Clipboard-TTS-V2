import { useStore } from "renderer/store"
import SimpleSwitch from 'renderer/components/common/SimpleSwitch';

const AutoTranslatation = () => {
  const store = useStore()

  return (
    <SimpleSwitch
      info="If enabled, Clipboard TTS will automatically detect the language of the text and translate it to your voice language."
      warning="To avoid incurring extra costs, we recommend that you disable this feature when you aren't actively translating text."
      isChecked={store.translationEnabled}
      label="Auto Translation"
      setChecked={store.setTranslationEnabled}
      onClick={() => {
        store.toggleCurrentlyActiveEnabledState("Language & Translation")
        store.setSplitScreenEnabled(false)
        store.setSplitScreenActive(false)
      }}
    />
  )
}

export default AutoTranslatation;
