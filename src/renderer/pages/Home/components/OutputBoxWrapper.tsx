import { Box, HStack } from '@chakra-ui/react';
import OutputBox from './OutputBox';
import { useStore } from 'renderer/store';
import { stoppingPunctuation } from 'renderer/misc/data';
import { removeLastInstanceOf } from 'renderer/utils';
import LoadingCircle from 'renderer/components/LoadingCircle';
import { useRef } from 'react';

const modifyOutputText = (outputText: string): string => {
  const store = useStore.getState();
  const highlightIndex = store.highlightIndex;

  if (store.currentlyActiveOptions.includes('Bionic Reading'))
    outputText = applyBionicReading(outputText);

  if (store.currentlyActiveOptions.includes('Highlight') && highlightIndex > -1)
    outputText = applyHighlighting(outputText);

  return outputText;
};

const applyHighlighting = (outputText: string): string => {
  const store = useStore.getState();
  const highlightIndex = store.highlightIndex;

  const stoppingPunctuationInstances = outputText
    .split('')
    .map((i) => (stoppingPunctuation.includes(i) ? i : ''))
    .filter((i) => i !== '');
  let tokens = outputText
    .trim()
    .split(new RegExp(`[${stoppingPunctuation.join('')}]`, 'g'))
    .filter((i) => i.length > 0)
    .map((i) => i.trim());

  // This is to fix the issue of punctuation with spaces either side of it, which cause it to be wrapped in b tags. But here we split by punctuation,
  // so the b tags are getting split also. So this just removes the open one, and somehow this fixes the issue lol.
  if (store.currentlyActiveOptions.includes('Bionic Reading')) {
    for (let i = 0; i < tokens.length; i++) {
      const openTag = tokens[i].lastIndexOf('<b>');
      const closeTag = tokens[i].lastIndexOf('</b>');

      // If there is an open tag, but no close tag, then we need to remove the open tag
      if (openTag > closeTag) {
        tokens[i] = removeLastInstanceOf(tokens[i], '<b>');
      }
    }
  }

  const highlightMap = tokens.map((token) => ({
    text: token,
    highlight: false,
  }));

  highlightMap[highlightIndex].highlight = true;
  const highlightColour = store.currentHighlight;

  const output: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    let toPush = tokens[i].trimEnd();
    if (stoppingPunctuationInstances[i])
      toPush += stoppingPunctuationInstances[i];

    if (i === highlightIndex)
      toPush = `<span class="highlighted" style="background-color: ${highlightColour};">${toPush}</span>`;

    output.push(toPush);
  }

  outputText = output.join(' ');
  return outputText;
};

const applyBionicReading = (outputText: string): string => {
  const tokens = outputText
    .trim()
    .split(' ')
    .filter((i) => i !== '');
  outputText = tokens
    .map((i) => {
      // We have to do this subtoken thing because we don't want to split the <br/> tags, which might be there if we have "preserve newlines" enabled
      const subtokens = i.split('<br/>');
      return subtokens
        .map((j) => {
          if (j.length > 1)
            return `<b>${j.substring(
              0,
              Math.floor(j.length / 2)
            )}</b>${j.substring(Math.floor(j.length / 2))}`;
          else return `<b>${j}</b>`;
        })
        .join('<br/>');
    })
    .join(' ');
  return outputText;
};

interface OutputBoxWrapperProps {
  outputText: string;
  preTranslatedText: string | null;
  detectedLanguage: string | null;
}

const OutputBoxWrapper = (props: OutputBoxWrapperProps) => {
  const store = useStore();

  const preTranslatedLanguageCode = store.lastDetectedLanguage;
  const preTranslatedLanguageName = store.lastDetectedLanguage
    ? Object.keys(store.availableVoices).filter((i) =>
        store.availableVoices[i][0].languageCodes[0].includes(
          preTranslatedLanguageCode!
        )
      )[0]
    : null;

  const postTranslatedLanguageCode = store.splitScreenEnabled ? store.voice.languageCodes[0] : undefined;
  const postTranslatedLanguageName = store.splitScreenEnabled ? `${store.voice.languageDescriptions[0]}` : undefined;

  const leftOutputBoxRef = useRef<HTMLDivElement>(null);
  const rightOutputBoxRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {
        store.ttsLoading ? (
          <LoadingCircle />
        ) : null
      }
      <HStack
        padding="1em"
        height="100%"
        maxWidth="100%"
        overflowY="hidden"
      >
        {
          store.splitScreenActive && store.splitScreenEnabled && (
            <OutputBox
              outputText={props.preTranslatedText!}
              languageName={preTranslatedLanguageName!}
              languageCode={preTranslatedLanguageCode!}
              showLanguage={true}
              showButtons={false}
              thisOutputBoxRef={leftOutputBoxRef}
              otherOutputBoxRef={rightOutputBoxRef}
            />
          )
        }

        <OutputBox
          outputText={modifyOutputText(props.outputText)}
          languageName={postTranslatedLanguageName}
          languageCode={postTranslatedLanguageCode}
          showLanguage={store.splitScreenActive && store.splitScreenEnabled}
          showButtons={true}
          thisOutputBoxRef={rightOutputBoxRef}
          otherOutputBoxRef={leftOutputBoxRef}
        />
      </HStack>
    </>
  );
};

export default OutputBoxWrapper;
