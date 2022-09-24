import { useStore } from "renderer/store"
import SimpleSwitch from "renderer/components/common/SimpleSwitch"

const Overlay = () => {
  const store = useStore()

  return (
    <SimpleSwitch
      label="Overlay"
      isChecked={store.overlayEnabled}
      setChecked={store.setOverlayEnabled}
      onClick={() => store.toggleCurrentlyActiveEnabledState("Overlay")}
      info="Changes the background of the output box for improved text visibility and readability. This is especially useful for users with dyslexia."
    />
  )
}

export default Overlay
