import { Box, useColorModeValue } from '@chakra-ui/react';
import OutputBoxButtons from './OutputBoxButtons';
import parseHtml from 'html-react-parser';
import { brightnessToTextColour } from 'renderer/utils';
import { useStore } from 'renderer/store';

import { css } from '@emotion/css';
import { useEffect } from 'react';

interface OutputBoxProps {
  outputText: string; // text to display in the output box
  languageName?: string; // The name of the language
  languageCode?: string; // The language code (used to get translation of language name)
  showLanguage: boolean; // Whether to show the language name. In the case where we aren't translating, we won't have a split screen with two output boxes, so we don't need to show the language name
  showButtons: boolean; // Whether to show the buttons, such as queue, replay and download
  thisOutputBoxRef: React.RefObject<HTMLDivElement>; // Reference to the output box
  otherOutputBoxRef: React.RefObject<HTMLDivElement>; // Reference to the other output box
}

const OutputBox = (props: OutputBoxProps) => {
  const store = useStore();

  const defaultOutputBoxBackground = useColorModeValue('#FBFBFB', '#404040');
  const outputBoxBackground = store.currentlyActiveOptions.includes('Overlay')
    ? store.currentOverlay
    : defaultOutputBoxBackground;

  const highlightTextColour =
    store.highlightEnabled && store.autoHighlightTextColour
      ? brightnessToTextColour(store.currentHighlight)
      : 'undefined';
  const overlayTextColour =
    store.overlayEnabled && store.autoOverlayTextColour
      ? brightnessToTextColour(store.currentOverlay)
      : 'undefined';

  useEffect(() => {
    // If highlight index changes (highlighting is currently occuring), scroll to the highlighted element to keep highlighted text in the middle of the screen and visible
    useStore.subscribe((state, prevState) => {
      if (
        state.highlightEnabled &&
        state.highlightAutoScroll &&
        state.highlightIndex !== -1 &&
        state.highlightIndex !== prevState.highlightIndex
      ) {
        const highlightedElement = document.getElementsByClassName(
          'highlighted'
        )[0];
        if (highlightedElement)
          highlightedElement.scrollIntoView({
            behavior: 'auto',
            block: 'center',
          });
      }
    });
  }, []);

  return (
    <Box
      height="100%"
      data-step={1}
      data-intro={`
      This is the <b>Output Box</b>. All text output will be displayed here. For example, if you copy some text and have highlighting enabled, the text will be
      highlighted here. You can drag and drop files onto this box to convert them to text.
    `}
      width="100%"
      className="outputBox"
      padding="1em"
      bg={outputBoxBackground}
      color={overlayTextColour}
    >
      <Box
        position="relative"
        width="100%"
        maxHeight="100%"
        overflowY="auto"
        ref={props.thisOutputBoxRef}
        onScroll={() => {
          if (props.otherOutputBoxRef.current && props.thisOutputBoxRef.current) // set both output boxes to the same scroll position
            props.otherOutputBoxRef.current.scrollTop = props.thisOutputBoxRef.current.scrollTop;
        }}
        >
          <OutputBoxButtons
            showLanguage={props.showLanguage}
            backgroundColour={outputBoxBackground}
            languageName={props.languageName}
            languageCode={props.languageCode}
            showButtons={props.showButtons}
            />

          {/* The css is here because if not, the textColour doesn't change when "autoHighlightTextColour is changed. Must wait until tts is done. This enabled Live Highlighting" */}
          <Box
            className={css`
            .highlighted {
              color: ${highlightTextColour};
            }
            `}
            letterSpacing={store.fontSpacing}
            fontSize={`${store.fontSize}em`}
            fontFamily={store.font}
          >
            { props.outputText && parseHtml(props.outputText)}
        </Box>
      </Box>
    </Box>
  );
};

export default OutputBox;
