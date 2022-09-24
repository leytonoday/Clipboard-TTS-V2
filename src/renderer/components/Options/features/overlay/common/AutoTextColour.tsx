import { useStore } from 'renderer/store';
import SimpleSwitch from "renderer/components/common/SimpleSwitch"

const AutoTextColour = () => {
  const store = useStore()

  return (
    <SimpleSwitch
      label="Auto Text Colour"
      isChecked={store.autoOverlayTextColour}
      setChecked={store.setAutoOverlayTextColour}
      info="Automatically adjusts the text colour of the output box to be the most visible colour.
        For example, if the overlay colour is very light, the text colour will be dark. If
        the overlay colour is very dark, the text colour will be light.
        This option is overridden within highlighted text when highlighting Auto Text Colour is enabled."
    />
  )
}

export default AutoTextColour
