import { useStore } from "renderer/store"
import SimpleSwitch from "renderer/components/common/SimpleSwitch"

const AutoTextColour = () => {
  const store = useStore()

  return (
    <SimpleSwitch
      label="Auto Text Colour"
      isChecked={store.autoHighlightTextColour}
      setChecked={store.setAutoHighlightTextColour}
      info="Automatically adjusts the text colour of highlighted text to be the most visible colour.
            For example, if the highlight colour is very light, the text colour will be dark. If
            the highlight colour is very dark, the text colour will be light."
    />
  )
}

export default AutoTextColour
