import { Divider }        from "@chakra-ui/react"
import OptionHeader       from "../../../common/OptionHeader"
import VoiceSelection     from "./components/VoiceSelection"
import AutoTranslatation  from "../common/AutoTranslatation"

const LanguageOption = () => {

  return (
    <>
      <OptionHeader
        title="Language and Translation"
        subtitle="Here you can change voice, language and translation configuration"
      />

      <AutoTranslatation />

      <Divider margin="1em 0" />

      <VoiceSelection />

    </>
  )
}

export default LanguageOption
