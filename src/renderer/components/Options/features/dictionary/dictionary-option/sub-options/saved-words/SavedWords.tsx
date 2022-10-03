import {
  Box,
  Flex,
  VStack,
  HStack,
  Button,
  Center,
  ScaleFade
} from '@chakra-ui/react';
import Mascot                     from 'renderer/components/common/Mascot';
import SearchBar                  from 'renderer/components/common/SearchBar';
import { faTimes }                from '@fortawesome/free-solid-svg-icons';
import { useStore }               from 'renderer/store';
import SimpleSelect               from 'renderer/components/common/SimpleSelect';
import FullWordButton             from './components/FullWordButton'
import SubOptionHeader            from 'renderer/components/options/common/SubOptionHeader';
import NoResultsMascot            from 'renderer/components/common/NoResultsMascot';
import CompactWordButton          from './components/CompactWordButton'
import { WordDefinition }         from 'renderer/types';
import { FontAwesomeIcon }        from '@fortawesome/react-fontawesome';
import { useState, useCallback }  from "react"
import { debuggingOutput } from 'renderer/utils';
import SimpleTooltip from 'renderer/components/common/SimpleTooltip';

const filterBySearchQuery = (searchQuery: string) => {
  const store = useStore.getState();
  const searchQueryLower = searchQuery.toLowerCase();
  const filteredWords = store.savedWords.filter((word) => {
    return word.word.toLowerCase().includes(searchQueryLower);
  });

  return filteredWords;
}

const SavedWords = () => {
  const store = useStore();

  const sortSavedWords = useCallback((words: WordDefinition[], sortBy: string) => {
    if (sortBy === "Sort Alphabetically")
      return [...words].sort((a, b) => a.word.localeCompare(b.word));
    else
    return words;
  }, [])

  const [searchQuery, setSearchQuery] = useState("");
  const [displaySavedWords, setDisplaySavedWords] = useState<WordDefinition[]>(sortSavedWords(store.savedWords, store.savedWordsSortBy));
  const [editMode, setEditMode] = useState(false);

  const unsaveWord = useCallback((word: WordDefinition) => {
    const savedWords = [...store.savedWords];
    const index = savedWords.findIndex(w => w.word === word.word);
    savedWords.splice(index, 1);

    store.setSavedWords(savedWords);
    setDisplaySavedWords(sortSavedWords(savedWords, store.savedWordsSortBy));
    debuggingOutput(useStore.getState().dictionaryOptionDebuggingOutput, "dictionaryOptionDebuggingOutput", `Unsaved word - \n${JSON.stringify(word, null, 2)}`)
  }, [store.savedWords])

  const handleSearch = useCallback((searchQuery: string) => {
    if (!searchQuery) { // If the search query is empty, display all saved words
      setDisplaySavedWords(sortSavedWords(store.savedWords, store.savedWordsSortBy));
      return;
    }

    const filteredWords = filterBySearchQuery(searchQuery);
    const sortedSavedWords = sortSavedWords(filteredWords, store.savedWordsSortBy)
    setDisplaySavedWords(sortedSavedWords);
  }, [searchQuery, store.savedWords, store.savedWordsSortBy])

  const onSortByChange = useCallback((newSortBy: string) => {
    store.setSavedWordsSortBy(newSortBy);

    const filteredWords = filterBySearchQuery(searchQuery);
    const sortedSavedWords = sortSavedWords(filteredWords, newSortBy);
    setDisplaySavedWords(sortedSavedWords)
  }, [store.savedWords, searchQuery])

  return (
    <>
      <SubOptionHeader
        title="Saved Words"
        subtitle="A list of all saved words for future reference"
      />

      <Box margin="0 1em">
        <SearchBar searchQuery={searchQuery} handleSearch={(searchQuery) => {
          setSearchQuery(searchQuery);
          handleSearch(searchQuery);
        }}/>
        <HStack justifyContent="end" marginTop="0.75em">
          <Button size="sm" onClick={() => setEditMode(!editMode)}>
            {
              editMode ? "Done" : "Edit"
            }
          </Button>
          <SimpleSelect
            options={[
              { value: "Compact", label: "Compact" },
              { value: "Full", label: "Full" },
            ]}
            onChange={(value) => {store.setSavedWordsDisplayStyle(value.value)}}
            value={store.savedWordsDisplayStyle}
            width="8em"
            size="sm"
          />
          <SimpleSelect
            options={[
              { value: "Sort Alphabetically", label: "Sort Alphabetically" },
              { value: "Sort by Addition Date", label: "Sort by Addition Date" },
            ]}
            onChange={(value) => {onSortByChange(value.value)}}
            value={store.savedWordsSortBy}
            width="13em"
            size="sm"
          />
        </HStack>
      </Box>

      {
        displaySavedWords.length === 0 && searchQuery.length ? (
          <Center marginTop="1em">
            <NoResultsMascot />
          </Center>
        ): null
      }

      {
        displaySavedWords.length === 0 && !searchQuery.length ? (
          <Center marginTop="1em">
            <Mascot label="No words saved" />
          </Center>
        ): null
      }

      {
        displaySavedWords.length === 0 ? null : (
          <Flex margin="0 1em" height="65%" justifyContent="center">
            <VStack alignItems="start" width="100%"  padding="1em 0" overflowY="auto" marginTop="0.5em">
              {
                displaySavedWords.map((wordDefinition: WordDefinition) => {

                  return (
                    <HStack key={wordDefinition.word} padding="0 0.5em" width="100%">

                      {
                        store.savedWordsDisplayStyle === "Compact" ? (
                          <CompactWordButton wordDefinition={wordDefinition} />
                        ): (
                          <FullWordButton wordDefinition={wordDefinition} />
                        )
                      }

                      {
                        editMode ? (
                          <Box width={editMode ? "fit-content": "0%"}>
                              <ScaleFade initialScale={0.9} in={editMode}>
                                <SimpleTooltip label="Delete word">
                                  <Button onClick={() => unsaveWord(wordDefinition)}>
                                    <FontAwesomeIcon icon={faTimes} style={{color: "red"}}/>
                                  </Button>
                                </SimpleTooltip>
                              </ScaleFade>
                          </Box>
                        ) : null
                      }


                    </HStack>
                  )
                })
            }
            </VStack>
          </Flex>
        )
      }
    </>
  );
};

export default SavedWords;
