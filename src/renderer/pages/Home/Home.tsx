import {
  downloadOggAudio,
  brightnessToTextColour,
  optionsBarPositionToflexDirection,
  debuggingOutput,
} from 'renderer/utils';
import {
  Box,
  Button,
  HStack,
  ScaleFade,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  faArrowRotateLeft,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import {
  useOnboarding,
  useTextToSpeech,
} from 'renderer/hooks';
import parse                from 'html-react-parser';
import { css }              from '@emotion/css';
import React                from 'react';
import OptionsBar           from '../../components/options/OptionsBar';
import ScaleLoader          from 'react-spinners/ScaleLoader';
import { useStore }         from 'renderer/store';
import SimpleTooltip        from 'renderer/components/common/SimpleTooltip';
import DragAndDropModal     from 'renderer/components/DragAndDropModal';
import CredentialsAlert     from 'renderer/components/CredentialsAlert';
import ComplexOptionModal   from '../../components/options/ComplexOptionModal';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import './Home.css';

const modifyOutputText = (outputText: string): string => {
  const store = useStore.getState()
  const highlightIndex = store.highlightIndex;

  if (store.currentlyActiveOptions.includes("Bionic Reading")) {
    const tokens = outputText.trim().split(" ")
    outputText = tokens.map(i => {
      if (i.length > 1)
        return `<b>${i.substring(0, Math.floor(i.length / 2))}</b>${i.substring(Math.floor(i.length / 2))}`
      else
        return `<b>${i}</b>`
    }).join(" ")
  }

  if (store.currentlyActiveOptions.includes("Highlight") && highlightIndex > -1) {
    const tokens = outputText.trim().split(".").filter(i => i.length > 0).map(i => i.trim())
    const highlightMap = tokens.map(token => ({ text: token, highlight: false }))

    highlightMap[highlightIndex].highlight = true
    const highlightColour = store.currentHighlight

    outputText = highlightMap.map(i => {
      if (i.highlight)
        return `<span class="highlighted" style="background-color: ${highlightColour}; padding: 0.1em;">${i!.text}</span>`
      return i.text
    }).join(". ")
  }

  return outputText
}

const Home: React.FC = () => {
  const store = useStore();
  const { outputText } = useTextToSpeech();
  useOnboarding();

  const defaultOutputBoxBackground = useColorModeValue('#FBFBFB', '#404040')
  const outputBoxBackground = store.currentlyActiveOptions.includes("Overlay") ? store.currentOverlay : defaultOutputBoxBackground

  const highlightTextColour = store.highlightEnabled && store.autoHighlightTextColour ? brightnessToTextColour(store.currentHighlight) : "undefined"
  const overlayTextColour = store.overlayEnabled && store.autoOverlayTextColour ? brightnessToTextColour(store.currentOverlay) : "undefined"

  const loadingBackground = useColorModeValue("#EEEEEE", '#171717')

  return (
    <>
      <DragAndDropModal />
      <ComplexOptionModal />

      {!store.apiKey && (<CredentialsAlert />)}

      <Box className="container" flexDirection={optionsBarPositionToflexDirection()} fontSize={['xs', 'sm', 'md']}>
        <OptionsBar />

        <Box
          data-step={1}
          data-intro={`
            This is the <b>Output Box</b>. All text output will be displayed here. For example, if you copy some text and have highlighting enabled, the text will be
            highlighted here. You can drag and drop files onto this box to conver them to text.
          `}
          className="outputBox"
          bg={outputBoxBackground}
          color={overlayTextColour}
        >
          {/* The css is here because if not, the textColour doesn't change when "autoHighlightTextColour is changed. Must wait until tts is done. This enabled Live Highlighting" */}
          <Box width="100%" height="100%" className={css`.highlighted { color: ${highlightTextColour}; }`} letterSpacing={store.fontSpacing} fontSize={`${store.fontSize}em`} fontFamily={store.font}
            paddingTop={`${store.currentLingeringOutput || store.textToSpeechQueue.length ? "1.25em" : "0em"}`}
          >

            { outputText && parse(modifyOutputText(outputText)) }

            {
              (store.currentLingeringOutput || store.textToSpeechQueue.length) ? (

                <HStack position="absolute" top="2em" right="2em" marginTop="30px" fontFamily="Segoe UI">

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
              ) : null
            }



            {
              store.ttsLoading ? (
              <Box height="100%" display="flex" justifyContent="center" alignItems="center">
                <Box display="flex" justifyContent="center" alignItems="center" width="150px" height="150px" borderRadius="full"
                  backdropFilter='blur(10px)' bg={`${loadingBackground}`}>
                  <ScaleFade in={store.ttsLoading} initialScale={0.6} >
                      <ScaleLoader color={store.accent} loading={store.ttsLoading} width="10px" height="100px" />
                  </ScaleFade>
                </Box>
              </Box>
              ) : null
            }

          </Box>
        </Box>

      </Box>
    </>
  );
};

export default React.memo(Home);
