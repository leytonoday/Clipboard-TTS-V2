import React            from "react"
import ShortcutsTable   from "../../../common/ShortcutsTable"
import SubOptionHeader  from "renderer/components/options/common/SubOptionHeader"
import Instructions from "./components/Instructions"
import TipsAndTricks from "./components/TipsAndTricks"
import FAQs from "./components/FAQs"

const Help: React.FC = () => {
  return (
    <>
      <SubOptionHeader
        title="Help"
        subtitle="Instructions, tips and tricks, FAQs, and keyboard shortcuts"
      />

      <Instructions />

      <TipsAndTricks />

      <FAQs />

      <ShortcutsTable />

    </>
  )
}

export default Help
