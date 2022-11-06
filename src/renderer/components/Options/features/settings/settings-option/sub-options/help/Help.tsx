import React            from "react"
import FAQs from "./components/FAQs"
import Pricing from "./components/Pricing"
import Instructions from "./components/Instructions"
import TipsAndTricks from "./components/TipsAndTricks"
import ShortcutsTable   from "../../../common/ShortcutsTable"
import SubOptionHeader  from "renderer/components/options/common/SubOptionHeader"

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

      <Pricing />
    </>
  )
}

export default Help
