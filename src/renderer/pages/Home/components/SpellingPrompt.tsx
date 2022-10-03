import {
  Box,
  Center,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
  Divider
} from '@chakra-ui/react';
import { useStore } from 'renderer/store';
import { ReactNode, useMemo, useState } from 'react';
import OptionHeader from 'renderer/components/options/common/OptionHeader';
import { SpellCheckSuggestion } from 'renderer/types';
import { removePunctuation } from 'renderer/utils';

const SpellingPrompt = () => {
  const store = useStore();
  const spellingSuggestionHoverColour = useColorModeValue("#EDF2F7", "rgba(255, 255, 255, 0.06)")
  const [ spellingMistakeCount, setSpellingMistakeCount ] = useState(store.spellCheckSuggestions.length)

  const onSpellingMistakeClick = (word: string, replacement: string) => {
    console.log(word, " -> ", replacement)

    const punctuation = [".", ",", "/", "!", "?", "#", "$", "%", "^", "&", "*", ";", ":", "{", "}", "=", "-", "_", "`", "~", "(", ")", "[", "]", "|", "\\"]

    // find indices of all punctuation
    const stoppingPunctuationInstances = word.split("").map((i, index) => punctuation.includes(i) ? { char: i, index: index+1 } : { char: "", index: -1 }).filter(i => i.index !== -1)

    // insert char at index in replacement
    stoppingPunctuationInstances.forEach(i => {
      replacement = replacement.substring(0, i.index) + i.char + replacement.substring(i.index)
    })

    store.setSpellCheckText(store.spellCheckText.replace(word, replacement))
    setSpellingMistakeCount(spellingMistakeCount - 1)
  }

  const ignoreAll = (word: string) => {
    const spellCheckSuggestions = [...store.spellCheckSuggestions]
    const index = spellCheckSuggestions.findIndex(i => i.word === word)
    spellCheckSuggestions.splice(index, 1)
    store.setSpellCheckSuggestions(spellCheckSuggestions)
    setSpellingMistakeCount(spellingMistakeCount - 1)
  }

  const addAsException = (word: string) => {
    store.setSpellCheckExceptions([...store.spellCheckExceptions, word])
    ignoreAll(word)
  }

  const outputText = useMemo(() => {
    let output: ReactNode[] = []

    store.spellCheckText.split(" ").forEach((word: string, index: number) => {
      // remove punctuation from i
      const suggestion = store.spellCheckSuggestions.find((j: SpellCheckSuggestion) => j.word === removePunctuation(word))

      if (suggestion) {
        output.push(
          <Popover placement="bottom" trigger="hover" openDelay={100} closeDelay={200} isLazy={true} key={`${word}${index}`}>
            <PopoverTrigger>
              <span style={{borderBottom: "2px dashed red", cursor: "pointer"}}>{word}</span>
            </PopoverTrigger>
            <PopoverContent width="fit-content" minWidth="6em" fontSize="0.8em">
              <PopoverArrow />
              <PopoverBody>
                {
                  suggestion.suggestions.map((suggestion: string, index: number) => (
                    <Box
                      key={`${suggestion}${index}`}
                      cursor="pointer"
                      _hover={{backgroundColor: spellingSuggestionHoverColour}}
                      padding="0.5em"
                      onClick={() => onSpellingMistakeClick(word, suggestion)}
                    >{suggestion}</Box>
                  ))
                }
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
      <OptionHeader title="Spell Check" subtitle={`Resolve the spelling errors in the text below (${spellingMistakeCount}).`}/>

      {
        outputText
      }
    </>
  )
}

export default SpellingPrompt;
