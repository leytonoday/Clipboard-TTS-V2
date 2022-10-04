import { useStore } from "renderer/store";
import SimpleSwitch from "renderer/components/common/SimpleSwitch";

const SpellCheck = () => {
  const store = useStore();

  return (
    <SimpleSwitch
      label="Auto Spell Check"
      isChecked={store.spellCheckEnabled}
      setChecked={store.setSpellCheckEnabled}
      info="Automatically checks for spelling errors in the copied text, and prompts the user to resolve them"
      warning="Only works with an English voice. If a non-English voice is used, this option is disabled"
    />
  )
}

export default SpellCheck
