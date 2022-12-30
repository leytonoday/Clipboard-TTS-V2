import { Box, Button, HStack, useColorModeValue } from "@chakra-ui/react"
import { faArrowRotateLeft, faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { brightnessToTextColour, debuggingOutput, downloadOggAudio, translate } from "renderer/utils"
import SimpleTooltip from "../../../components/common/SimpleTooltip"
import { useStore } from "renderer/store"
import { useEffect, useState } from "react"

interface OutputBoxButtonsProps {
  backgroundColour: string,
  languageName?: string,
  languageCode?: string,
  showLanguage: boolean,
  showButtons: boolean // When false, the only thing that will be shown is the language name
}

const OutputBoxButtons = (props: OutputBoxButtonsProps) => {
  const store = useStore()
  const [languageName, setlanguageName] = useState<string | null>(null)

  const loadTranslatedlanguageName = async () => {
    try {
      const languageCode =  props.languageCode!.split("-")[0]
      const translatedlanguageName = props.languageName === "English" ? "" : ` (${(await translate(props.languageName!, languageCode, "en")).text})`

      setlanguageName(`${props.languageName}${translatedlanguageName}`)
    } catch {}
  }

  useEffect(() =>
  {
    if (props.languageName && props.languageCode)
      loadTranslatedlanguageName()
    if (!props.languageName && props.languageCode) {
      setlanguageName("Unrecognized Language")
    }
  }, [props.languageName, props.languageCode])

  return (
    <HStack width="100%" bg={props.backgroundColour} justifyContent={"right"} position="sticky" top="0" right="0" fontFamily="Segoe UI" color={useColorModeValue("#313131", brightnessToTextColour(props.backgroundColour))}>
      {
        props.showLanguage && (
          <Box flex={1} fontSize="1.15em" fontWeight="semibold">
            { languageName }
          </Box>
        )
      }
      {
        store.currentLingeringOutput && props.showButtons ? (
          <SimpleTooltip label="Download">
            <Button size="sm" borderRadius="full" onClick={() => {
              debuggingOutput(store.outputLingerDebuggingOutput, "outputLingerDebuggingOutput", "Lingered output downloaded")
              downloadOggAudio(store.currentLingeringOutput!.audioContent, store.currentLingeringOutput!.text)
            }}>
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </SimpleTooltip>
        ) : null
      }

      {
        store.currentLingeringOutput && props.showButtons ? (
          <SimpleTooltip label="Replay">
            <Button size="sm" borderRadius="full" onClick={() => {
              debuggingOutput(store.outputLingerDebuggingOutput, "outputLingerDebuggingOutput", "Lingered output replayed")
              useStore.setState({ ...store, replaySpeech: store.replaySpeech + 1 }) // Increment this to act as an event emitter
            }}>
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </Button>
          </SimpleTooltip>
        ) : null
      }

      {
        store.textToSpeechQueue.length > 0 && props.showButtons ? (
          <Button size="sm" borderRadius="full" onClick={() => {
            store.setCurrentOpenOptionPath("text-to-speech-queue")
          }}>
            Queued: {store.textToSpeechQueue.length}
          </Button>
        ) : null
      }
    </HStack>
  )
}

export default OutputBoxButtons;
