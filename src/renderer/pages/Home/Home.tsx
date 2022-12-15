import {
  downloadOggAudio,
  brightnessToTextColour,
  optionsBarPositionToflexDirection,
  debuggingOutput,
  removeLastInstanceOf,
} from 'renderer/utils';
import {
  Box,
  Button,
  HStack,
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
import parseHtml            from 'html-react-parser';
import { css }              from '@emotion/css';
import OptionsBar           from '../../components/options/OptionsBar';
import { useStore }         from 'renderer/store';
import SimpleTooltip        from 'renderer/components/common/SimpleTooltip';
import WhatsNewModal        from 'renderer/components/WhatsNewModal';
import DragAndDropModal     from 'renderer/components/DragAndDropModal';
import CredentialsAlert     from 'renderer/components/CredentialsAlert';
import ComplexOptionModal   from '../../components/options/ComplexOptionModal';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

import { stoppingPunctuation } from 'renderer/misc/data';
import LoadingCircle from 'renderer/components/LoadingCircle';
import OutputBoxButtons from 'renderer/components/OutputBoxButtons';

const modifyOutputText = (outputText: string): string => {
  const store = useStore.getState()
  const highlightIndex = store.highlightIndex;

  if (store.currentlyActiveOptions.includes("Bionic Reading")) {
    const tokens = outputText.trim().split(" ").filter(i => i !== "")
    console.log(tokens)
    outputText = tokens.map(i => {
      if (i.length > 1)
        return `<b>${i.substring(0, Math.floor(i.length / 2))}</b>${i.substring(Math.floor(i.length / 2))}`
      else
        return `<b>${i}</b>`
    }).join(" ")
  }

  if (store.currentlyActiveOptions.includes("Highlight") && highlightIndex > -1) {
    const stoppingPunctuationInstances = outputText.split("").map((i) => stoppingPunctuation.includes(i) ? i : "").filter(i => i !== "")
    let tokens = outputText.trim().split(new RegExp(`[${stoppingPunctuation.join("")}]`, "g")).filter(i => i.length > 0).map(i => i.trim())

    // This is to fix the issue of punctuation with spaces either side of it, which cause it to be wrapped in b tags. But here we split by punctuation,
    // so the b tags are getting split also. So this just removes the open one, and somehow this fixes the issue lol.
    if (store.currentlyActiveOptions.includes("Bionic Reading")) {
      for (let i = 0; i < tokens.length; i++) {
        const openTag = tokens[i].lastIndexOf("<b>")
        const closeTag = tokens[i].lastIndexOf("</b>")

        // If there is an open tag, but no close tag, then we need to remove the open tag
        if (openTag > closeTag) {
          tokens[i] = removeLastInstanceOf(tokens[i], "<b>")
        }
      }
    }

    const highlightMap = tokens.map(token => ({ text: token, highlight: false }))

    highlightMap[highlightIndex].highlight = true
    const highlightColour = store.currentHighlight

    const output: string[] = []

    for (let i = 0; i < tokens.length; i++) {
      let toPush = tokens[i].trimEnd()
      if (stoppingPunctuationInstances[i])
        toPush += stoppingPunctuationInstances[i]

      if (i === highlightIndex)
        toPush = `<span class="highlighted" style="background-color: ${highlightColour}; padding: 0.1em;">${toPush}</span>`

      output.push(toPush)
    }

    outputText = output.join(" ")
  }

  return outputText
}

const Home: React.FC = () => {
  const store = useStore();
  const { outputText } = useTextToSpeech();
  useOnboarding();

  useEffect(() => {}, [])

  const defaultOutputBoxBackground = useColorModeValue('#FBFBFB', '#404040')
  const outputBoxBackground = store.currentlyActiveOptions.includes("Overlay") ? store.currentOverlay : defaultOutputBoxBackground

  const highlightTextColour = store.highlightEnabled && store.autoHighlightTextColour ? brightnessToTextColour(store.currentHighlight) : "undefined"
  const overlayTextColour = store.overlayEnabled && store.autoOverlayTextColour ? brightnessToTextColour(store.currentOverlay) : "undefined"

  return (
    <>
      <DragAndDropModal />
      <ComplexOptionModal />
      <WhatsNewModal />

      {!store.apiKey && (<CredentialsAlert />)}

      <Box className="container" flexDirection={optionsBarPositionToflexDirection()} fontSize={['xs', 'sm', 'md']}>
        <OptionsBar />

        <Box
          data-step={1}
          data-intro={`
            This is the <b>Output Box</b>. All text output will be displayed here. For example, if you copy some text and have highlighting enabled, the text will be
            highlighted here. You can drag and drop files onto this box to convert them to text.
          `}
          className="outputBox"
          bg={outputBoxBackground}
          color={overlayTextColour}
          margin="1em"
        >
          {/* The css is here because if not, the textColour doesn't change when "autoHighlightTextColour is changed. Must wait until tts is done. This enabled Live Highlighting" */}
          <Box
            className={css`.highlighted { color: ${highlightTextColour}; }`}
            letterSpacing={store.fontSpacing}
            fontSize={`${store.fontSize}em`}
            fontFamily={store.font}
            position="relative"
            width="100%"
            height="100%"
            paddingTop={`${store.currentLingeringOutput || store.textToSpeechQueue.length ? "1em" : "0em"}` }
            >
            {
              (store.currentLingeringOutput || store.textToSpeechQueue.length) ? (
                <OutputBoxButtons backgroundColour={outputBoxBackground}/>
              ) : null
            }

            {
              store.ttsLoading ? (
                <LoadingCircle />
              ) : null
            }

            <Box overflowY="auto" maxHeight="100%">
              { outputText && parseHtml(modifyOutputText(outputText)) }
            </Box>

          </Box>
        </Box>

      </Box>
    </>
  );
};

export default React.memo(Home);
