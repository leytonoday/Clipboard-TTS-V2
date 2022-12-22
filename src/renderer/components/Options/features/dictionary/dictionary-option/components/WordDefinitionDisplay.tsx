import {
  Box,
  VStack,
  HStack,
  Button,
  Divider,
  useToast
} from '@chakra-ui/react';
import {
  faStar,
  faClone,
  faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import {
  isApiKeySet,
  getPhonetics,
  playBase64Audio,
  electronClipboard,
  toggleOptionEnabled,
  capitalizeFirstLetter,
  debuggingOutput,
} from 'renderer/utils';
import {
  WordDefinition,
  WordDefinitionMeaning,
  WordDefinitionDefinition,
} from 'renderer/types';
import {
  networkErrorToast,
  invalidCredentialsToast,
}  from "renderer/misc/data"
import { useCallback }              from 'react';
import { useStore }                 from 'renderer/store';
import { FontAwesomeIcon }          from '@fortawesome/react-fontawesome';

interface WordDefinitionProps {
  wordDefinition: WordDefinition | null | undefined;
}

const WordDefinitionDisplay = (props: WordDefinitionProps) => {
  const store = useStore()
  const toast = useToast()

  const playWord = useCallback(async (word: string) => {
    try {
      await playBase64Audio(word)
    } catch (e: any) {
      if (e.code === "ERR_NETWORK")
        toast(networkErrorToast)
      else
        toast(invalidCredentialsToast)
    }
  }, [])

  const isSaved = useCallback((wordDefinition: WordDefinition) => {
    return store.savedWords.findIndex((savedWord: WordDefinition) => savedWord.word === wordDefinition.word) !== -1
  }, [store.savedWords])

  const toggleSaved = useCallback((wordDefinition: WordDefinition) => {
    if (isSaved(wordDefinition)) {
      const words = [...store.savedWords]
      const index = words.findIndex((savedWord: WordDefinition) => savedWord.word === wordDefinition.word)
      words.splice(index, 1)
      store.setSavedWords(words)
      debuggingOutput(useStore.getState().dictionaryOptionDebuggingOutput, "dictionaryOptionDebuggingOutput", `Unsaved word - \n${JSON.stringify(wordDefinition, null, 2)}`)
    } else {
      store.setSavedWords([...store.savedWords, wordDefinition])
      debuggingOutput(useStore.getState().dictionaryOptionDebuggingOutput, "dictionaryOptionDebuggingOutput", `Saved word - \n${JSON.stringify(wordDefinition, null, 2)}`)
    }

    toast({
      title: isSaved(wordDefinition) ? `${capitalizeFirstLetter(props.wordDefinition!.word)} Unsaved` : `${capitalizeFirstLetter(props.wordDefinition!.word)} Saved`,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }, [store.savedWords])

  const copyToClipboard = useCallback((wordDefinition: WordDefinition) => {
    if (store.currentlyActiveOptions.includes("Enable / Disable")) {
      toggleOptionEnabled("Enable / Disable")
      electronClipboard('electron-clipboard-write-text', wordDefinition.word)
      toggleOptionEnabled("Enable / Disable")
    } else {
      electronClipboard('electron-clipboard-write-text', wordDefinition.word)
    }

    toast({
      title: `Copied to Clipboard`,
      description: `'${capitalizeFirstLetter(wordDefinition.word)}' copied to clipboard`,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }, [])

  return (
    <VStack spacing="2em" margin="0 1em">
      <VStack spacing="-0.25em">
        <Box fontSize="2.5em">
          {capitalizeFirstLetter(props.wordDefinition!.word)}
        </Box>
        <Box color="grey">{getPhonetics(props.wordDefinition!)}</Box>
      </VStack>

      <HStack spacing="1em">
        <Button
          width="5em"
          height="5em"
          onClick={() => playWord(props.wordDefinition!.word)}
          disabled={!isApiKeySet()}
        >
          <VStack>
            <FontAwesomeIcon icon={faVolumeHigh} />
            <Box>Play</Box>
          </VStack>
        </Button>

        <Button
          width="5em"
          height="5em"
          onClick={() => toggleSaved(props.wordDefinition as WordDefinition)}
        >
          <VStack>
            <FontAwesomeIcon
              style={{
                color: isSaved(props.wordDefinition as WordDefinition)
                  ? store.accent
                  : undefined,
              }}
              icon={faStar}
            />
            <Box>{isSaved(props.wordDefinition!) ? 'Unsave' : 'Save'}</Box>
          </VStack>
        </Button>
        <Button width="5em" height="5em" onClick={() => copyToClipboard(props.wordDefinition!)}>
          <VStack>
            <FontAwesomeIcon icon={faClone} />
            <Box>Copy</Box>
          </VStack>
        </Button>
      </HStack>

      <br />

      <VStack spacing="1em" width="100%">
        {props.wordDefinition!.meanings.map(
          (meaning: WordDefinitionMeaning, index: number) => (
            <VStack width="100%" spacing="1em" key={index}>
              <VStack key={index} alignItems="flex-start" width="100%">
                <HStack color="grey" spacing={0}>
                  <Box>
                    <b> {capitalizeFirstLetter(meaning.partOfSpeech)}</b>
                  </Box>
                </HStack>
                <Box paddingLeft="1.5em">
                  {meaning.definitions.map(
                    (definition: WordDefinitionDefinition, index: number) => (
                      <VStack alignItems="start" key={index}>
                        <Box fontSize="1.15em">{`${index + 1}. ${
                          definition.definition
                        }`}</Box>
                        {definition.example && (
                          <Box
                            borderLeft="1px solid grey"
                            color="grey"
                            paddingLeft="0.5em"
                            fontStyle="italic"
                          >
                            {`"${definition.example}"`}
                          </Box>
                        )}
                        {definition.synonyms.length && (
                          <Box>Synonyms: {definition.synonyms.join(', ')}</Box>
                        )}
                        {definition.antonyms.length && (
                          <Box>Antonyms: {definition.antonyms.join(', ')}</Box>
                        )}
                        {index !== meaning.definitions.length - 1 && <br />}
                      </VStack>
                    )
                  )}
                </Box>
              </VStack>
              {index !== props.wordDefinition!.meanings.length - 1 && <Divider />}
            </VStack>
          )
        )}
      </VStack>
    </VStack>
  );
};

export default WordDefinitionDisplay;
