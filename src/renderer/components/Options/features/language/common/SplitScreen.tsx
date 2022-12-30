import { useStore } from "renderer/store"
import SimpleSwitch from 'renderer/components/common/SimpleSwitch';

const SplitScreen = () => {
  const store = useStore()

  return (
    <SimpleSwitch
      info="When Auto-translation is enabled, and a translation is required, the output box will be split in two, one for the original text and one for the translated text."
      warning="Auto-translation must be enabled to enable this feature."
      isChecked={store.splitScreenEnabled}
      label="Split Screen"
      setChecked={(value: boolean) => {
        // if (store.splitScreenVoiceCode !== null) {
        //   store.setSplitScreenActive(value)
        // }
        store.setSplitScreenEnabled(value)
      }}
      disabled={!store.translationEnabled}
    />
  )
}

export default SplitScreen;
