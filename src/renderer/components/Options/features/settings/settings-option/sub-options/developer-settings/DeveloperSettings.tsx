import React            from "react"
import { VStack }       from "@chakra-ui/react"
import { useStore }     from "renderer/store"
import SimpleSwitch     from "renderer/components/common/SimpleSwitch"
import SubOptionHeader  from "renderer/components/options/common/SubOptionHeader"

const DeveloperSettings: React.FC = () => {
  const store = useStore()

  return (
    <>
      <SubOptionHeader
        title="Developer Settings"
        subtitle="Developer settings for debugging"
      />

      <VStack spacing="1em">

        {/* textToSpeechOutput */}
        <SimpleSwitch
          label="Text-to-Speech Debugging Output"
          info="Enable text-to-speech console output for debugging"
          isChecked={store.textToSpeechDebuggingOutput}
          setChecked={store.setTextToSpeechDebuggingOutput}
        />

        {/* languageOptionOutput */}
        <SimpleSwitch
          label="Language Option Debugging Output"
          info="Enable language option console output for debugging"
          isChecked={store.languageOptionDebuggingOutput}
          setChecked={store.setLanguageOptionDebuggingOutput}
        />

        {/* substitutionOptionOutput */}
        <SimpleSwitch
          label="Substitution Option Debugging Output"
          info="Enable substitution option console output for debugging"
          isChecked={store.substitutionOptionDebuggingOutput}
          setChecked={store.setSubstitutionOptionDebuggingOutput}
        />

        {/* dictionaryOptionOutput */}
        <SimpleSwitch
          label="Dictionary Option Debugging Output"
          info="Enable dictionary option console output for debugging"
          isChecked={store.dictionaryOptionDebuggingOutput}
          setChecked={store.setDictionaryOptionDebuggingOutput}
        />

        {/* highlightOptionOutput */}
        <SimpleSwitch
          label="Highlight Option Debugging Output"
          info="Enable highlight console output for debugging"
          isChecked={store.highlightOptionDebuggingOutput}
          setChecked={store.setHighlightOptionDebuggingOutput}
        />

        {/* shortcutsOutput */}
        <SimpleSwitch
          label="Shortcuts Debugging Output"
          info="Enable shortcuts console output for debugging"
          isChecked={store.shortcutsDebuggingOutput}
          setChecked={store.setShortcutsDebuggingOutput}
        />

        {/* outputLingerOutput */}
        <SimpleSwitch
          label="Output Linger Debugging Output"
          info="Enable output linger console output for debugging"
          isChecked={store.outputLingerDebuggingOutput}
          setChecked={store.setOutputLingerDebuggingOutput}
        />

      </VStack>

    </>
  )
}

export default DeveloperSettings
