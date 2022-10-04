import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  Collapse,
  AlertDescription,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
  Divider,
  VStack
} from '@chakra-ui/react';
import { useStore } from 'renderer/store';
import { ReactNode, useMemo, useState, useEffect } from 'react';
import OptionHeader from 'renderer/components/options/common/OptionHeader';
import { SpellCheckSuggestion } from 'renderer/types';
import { removePunctuation, trimPunctuation } from 'renderer/utils';

const SpellingPrompt = () => {
  const store = useStore();
  const spellingSuggestionHoverColour = useColorModeValue("#EDF2F7", "rgba(255, 255, 255, 0.06)")
  const [ spellingMistakeCount, setSpellingMistakeCount ] = useState(store.spellCheckSuggestions.length)

  const popoverBackgroundColour = useColorModeValue('#FFFFFF', '#171717')

  useEffect(() => {
    if (spellingMistakeCount === 0) {
      setTimeout(() => {
        if (useStore.getState().currentOpenOptionPath === "spelling-prompt")
          store.setCurrentOpenOptionPath("")
      }, 2000)
    }
  }, [spellingMistakeCount])

  const onSpellingMistakeClick = (word: string, startIndex: number, replacement: string) => {
    console.log(word)

    const endPunctuation = word.match(/[^a-zA-Z0-9]+$/g) // get all punctuation at the end of the word using regex
    const startPunctuation = word.match(/^[^a-zA-Z0-9]+/g) // get all punctuation at the start of the word using regex

    replacement = (startPunctuation || "" ) + replacement + (endPunctuation || "")

    const words = store.spellCheckText.split(" ")
    const text = words.slice(startIndex, words.length).join(" ").replace(word, replacement)
    const replacedText = words.slice(0, startIndex).join(" ") + " " + text

    store.setSpellCheckText(replacedText)
    setSpellingMistakeCount(spellingMistakeCount - 1)
  }

  const ignoreAll = (word: string) => {
    word = trimPunctuation(word)

    const spellCheckSuggestions = [...store.spellCheckSuggestions]

    console.log(word)

    // remove instances of word
    const filteredSuggestions = spellCheckSuggestions.filter(i => i.word !== word)

    // count instances of word in store.spellingCheckText
    const count = (store.spellCheckText.match(new RegExp(word, "g")) || []).length

    store.setSpellCheckSuggestions(filteredSuggestions)
    setSpellingMistakeCount(spellingMistakeCount - count)
  }

  const addAsException = (word: string) => {
    ignoreAll(word)
    store.setSpellCheckExceptions([...store.spellCheckExceptions, { word: trimPunctuation(word) }])
  }

  const outputText = useMemo(() => {
    let output: ReactNode[] = []

    store.spellCheckText.split(" ").forEach((word: string, index: number) => {
      // remove punctuation from i
      const suggestion = store.spellCheckSuggestions.find((j: SpellCheckSuggestion) => j.word === trimPunctuation(word)) // trim here to allow for node.js

      if (suggestion) {
        output.push(
          <Popover placement="bottom" trigger="hover" openDelay={100} closeDelay={200} isLazy={true} key={`${word}${index}`}>
            <PopoverTrigger>
              <span style={{borderBottom: "2px dashed red", cursor: "pointer"}}>{word}</span>
            </PopoverTrigger>
            <PopoverContent width="fit-content" minWidth="6em" fontSize="0.8em" bg={popoverBackgroundColour}>
              <PopoverArrow bg={popoverBackgroundColour}/>
              <PopoverBody>
                <Box maxHeight="20em" overflowY="auto" width="100%">
                  {
                    suggestion.suggestions.map((suggestion: string, suggestionIndex: number) => (
                      <Box
                        key={`${suggestion}${suggestionIndex}`}
                        cursor="pointer"
                        _hover={{backgroundColor: spellingSuggestionHoverColour}}
                        padding="0.5em"
                        onClick={() => onSpellingMistakeClick(word, index, suggestion)}
                      >{suggestion}</Box>
                    ))
                  }
                </Box>
                {
                  suggestion.suggestions.length === 0 && (
                    <Box padding="0.5em">No suggestions</Box>
                  )
                }
                <Divider margin="0.5em 0"/>
                <Box
                  cursor="pointer"
                  _hover={{backgroundColor: spellingSuggestionHoverColour}}
                  padding="0.5em"
                  onClick={() => addAsException(word)}
                >
                  Add as exception
                </Box>
                <Box
                  cursor="pointer"
                  _hover={{backgroundColor: spellingSuggestionHoverColour}}
                  padding="0.5em"
                  onClick={() => ignoreAll(word)}
                >
                  Ignore all
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )
      } else {
        output.push(<span key={`${word}${index}`}>{word}</span>)
      }

      output.push(" ")
    })

    return output;

  }, [store.spellCheckSuggestions, store.spellCheckText])

  return (
    <>
      <VStack height="100%" width="100%" alignItems="start">

        <Box width="100%">
          <OptionHeader title="Spell Check" subtitle={`Resolve the spelling errors in the text below. Close to skip`}/>
        </Box>

        <Box width="100%" height="fit-content">
          <Collapse in={spellingMistakeCount === 0} animateOpacity>
            <Box marginBottom="1em" borderRadius="0.5em" width="100%" bg="red">
              <Alert status='success' variant="solid" borderRadius="0.5em" width="100%">
                <AlertIcon />
                <Box>
                  <AlertTitle>Spelling mistakes resolved!</AlertTitle>
                  <AlertDescription>
                    This window will close in 2 seconds...
                  </AlertDescription>
                </Box>
              </Alert>
            </Box>
          </Collapse>
        </Box>

        <Box
          className="outputBox"
          bg={useColorModeValue('#FBFBFB', '#404040')}
          flex={1}
          width="100%"
        >
          {
            outputText
          }
        </Box>
      </VStack>


    </>
  )
}

export default SpellingPrompt;
