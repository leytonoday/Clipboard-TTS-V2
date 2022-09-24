import React          from "react"
import { Divider }    from "@chakra-ui/react"
import AccentPicker   from "../common/AccentPicker"
import CharacterLimit from "../common/CharacterLimit"
import ShortcutsTable from "../common/ShortcutsTable"

const SettingsOptionPreview: React.FC = () => {
  return (
    <>
      <AccentPicker />
      <Divider margin="1em 0 0.5em 0" />
      <ShortcutsTable />
      <CharacterLimit />
    </>
  )
}

export default SettingsOptionPreview;
