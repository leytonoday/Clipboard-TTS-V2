import { useStore } from "renderer/store";
import SimpleSwitch from "renderer/components/common/SimpleSwitch";

const Substitutions = () => {
  const store = useStore();

  return (
    <SimpleSwitch
      label="Substitutions"
      isChecked={store.substitutionsEnabled}
      setChecked={store.setSubstitutionsEnabled}
      info="If enabled, the words or phrases you add here will be replaced with the text you specify. You can specify a simple string,
      or a regular expression"
    />
  )
}

export default Substitutions;
