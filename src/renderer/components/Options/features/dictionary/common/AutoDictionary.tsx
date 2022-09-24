import { useStore } from "renderer/store";
import SimpleSwitch from "renderer/components/common/SimpleSwitch";

const AutoDictionary = () => {
  const store = useStore();

  return (
    <SimpleSwitch
      label="Auto Dictionary"
      isChecked={store.autoDictionary}
      setChecked={store.setAutoDictionary}
      info="Automatically reads the definition of a word when it is copied to the clipboard"
    />
  )
}

export default AutoDictionary;
