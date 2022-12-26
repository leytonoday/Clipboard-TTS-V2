import { useStore } from "renderer/store";
import SimpleSwitch from "renderer/components/common/SimpleSwitch";

const Substitutions = () => {
  const store = useStore();

  return (
    <SimpleSwitch
      label="Substitutions"
      isChecked={store.substitutionsEnabled}
      setChecked={store.setSubstitutionsEnabled}
      info="Replace instances of words or phrases within copied text. You can specify a simple string, or a regular expression"
    />
  )
}

export default Substitutions;
