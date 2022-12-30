import { Divider, VStack }        from "@chakra-ui/react"
import OptionHeader       from "../../../common/OptionHeader"
import VoiceSelection     from "./components/VoiceSelection"
import AutoTranslatation  from "../common/AutoTranslatation"
import SplitScreen from "../common/SplitScreen"

const LanguageOption = () => {

  return (
    <>
      <OptionHeader
        title="Language and Translation"
        subtitle="Here you can change voice, language and translation configuration"
      />

      <VStack spacing="1.25em">
        <AutoTranslatation />
        <SplitScreen />
      </VStack>

      <Divider margin="1em 0" />

      <VoiceSelection />

    </>
  )
}

export default LanguageOption
