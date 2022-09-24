import { useStore } from "renderer/store"
import SimpleSwitch from "renderer/components/common/SimpleSwitch"

const Highlight = () => {
  const store = useStore()

  return (
    <SimpleSwitch
      label="Highlight"
      isChecked={store.highlightEnabled}
      setChecked={store.setHighlightEnabled}
      onClick={() => store.toggleCurrentlyActiveEnabledState("Highlight")}
      info="Highlights the currently spoken sentence. This is useful for following along with the audio."
    />
  )
}

export default Highlight
