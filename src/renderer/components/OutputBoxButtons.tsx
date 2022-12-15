import { Button, HStack, useColorModeValue } from "@chakra-ui/react"
import { faArrowRotateLeft, faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { brightnessToTextColour, debuggingOutput, downloadOggAudio } from "renderer/utils"
import SimpleTooltip from "./common/SimpleTooltip"
import { useStore } from "renderer/store"

interface OutputBoxButtonsProps {
  backgroundColour: string
}

const OutputBoxButtons = (props: OutputBoxButtonsProps) => {
  const store = useStore()

  return (
    <HStack position="absolute" top="-18px" right="0" fontFamily="Segoe UI" color={useColorModeValue("#313131", brightnessToTextColour(props.backgroundColour))}>
      {
        store.currentLingeringOutput ? (
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
        store.currentLingeringOutput ? (
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
        store.textToSpeechQueue.length > 0 ? (
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
