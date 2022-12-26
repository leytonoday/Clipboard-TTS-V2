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
      warning="Beware of the order of the substitutions. They are applied in the order they are listed. To change the order, you can drag and drop the substitutions when editing"
    />
  )
}

export default Substitutions;
