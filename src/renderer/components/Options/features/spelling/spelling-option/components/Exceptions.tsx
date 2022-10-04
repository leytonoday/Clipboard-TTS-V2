import { Box, Button, HStack, Input, Table, TableContainer, Tbody, Th, Thead, Tr, Td, useToast, Collapse } from "@chakra-ui/react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import Mascot from "renderer/components/common/Mascot";
import NoResultsMascot from "renderer/components/common/NoResultsMascot";
import SearchBar from "renderer/components/common/SearchBar";
import SimpleSelect from "renderer/components/common/SimpleSelect";
import SimpleTooltip from "renderer/components/common/SimpleTooltip";
import OptionSubHeader from "renderer/components/options/common/OptionSubHeader";
import { useStore } from "renderer/store";
import { SpellCheckException } from "renderer/types";

const hasLeadingOrTrailingPunctuation = (word: string) => {
  const endPunctuation = word.match(/[^a-zA-Z0-9]+$/g) // get all punctuation at the end of the word using regex
  const startPunctuation = word.match(/^[^a-zA-Z0-9]+/g) // get all punctuation at the start of the word using regex

  return (endPunctuation || startPunctuation) ? true : false
}

const Exceptions = () => {
  const store = useStore()
  const toast = useToast()

  const sortExceptions = useCallback((exceptions: SpellCheckException[], sortBy: string) => {
    if (sortBy === "Sort Alphabetically")
      return [...exceptions].sort((a, b) => a.word.localeCompare(b.word))
    else
      return exceptions
  }, [])

  const [searchQuery, setSearchQuery] = useState("");
  const [displayExceptions, setDisplayExceptions] = useState<SpellCheckException[]>(sortExceptions(store.spellCheckExceptions, store.spellCheckExceptionsSortBy));
  const [editMode, setEditMode] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [newException, setNewException] = useState("")

  const filterBySearchQuery = (searchQuery: string) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const filtered = store.spellCheckExceptions.filter((exception) => {
      return exception.word.toLowerCase().includes(searchQueryLower)
    })

    return filtered;
  }

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery) {
      setDisplayExceptions(sortExceptions(store.spellCheckExceptions, store.spellCheckExceptionsSortBy))
      return
    }

    const searchQueryLower = searchQuery.toLowerCase()
    const filteredExceptions = filterBySearchQuery(searchQueryLower)

    setDisplayExceptions(sortExceptions(filteredExceptions, store.spellCheckExceptionsSortBy))

  }

  const onSortByChange = useCallback((newSortBy: string) => {
    store.setSpellCheckExceptionsSortBy(newSortBy);

    const filtered = filterBySearchQuery(searchQuery);
    const sortedExceptions = sortExceptions(filtered, newSortBy);
    setDisplayExceptions(sortedExceptions)
  }, [store.spellCheckExceptions, searchQuery])

  const addException = () => {
    if (!newException) return

    if (newException.includes(" ")) {
      toast({
        title: "Invalid Exception",
        description: "Exception cannot contain spaces, and must be a single word",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    if (hasLeadingOrTrailingPunctuation(newException)) {
      toast({
        title: "Invalid Exception",
        description: "Exception cannot contain leading or trailing punctuation",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    if (store.spellCheckExceptions.some(i => i.word.toLowerCase() === newException.toLowerCase())) {
      toast({
        title: "Exception already exists",
        description: "That exception already exists.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    setDisplayExceptions(sortExceptions([...store.spellCheckExceptions, { word: newException }], store.spellCheckExceptionsSortBy))
    store.setSpellCheckExceptions([...store.spellCheckExceptions, { word: newException }])
    setNewException("")
  }

  const deleteException = (exception: string) => {
    const exceptions = [...store.spellCheckExceptions]

    const index = exceptions.findIndex(i => i.word === exception)
    if (index === -1)
      return

    exceptions.splice(index, 1)
    store.setSpellCheckExceptions(exceptions)

    setDisplayExceptions(sortExceptions(exceptions, store.spellCheckExceptionsSortBy))
  }

  return (
    <>
      <OptionSubHeader includePadding title="Exceptions" info="Exceptions will be ignored by the spell checker, and won't flag up as a spelling mistake" />

      {/* Search */}
      <Box padding="0 1em" marginTop="1em">
        <SearchBar searchQuery={searchQuery} handleSearch={(searchQuery) => {
          setSearchQuery(searchQuery)
          handleSearch(searchQuery)
        }} />

        <HStack justifyContent="end" marginTop="0.75em">
          <Button size="sm" onClick={() => setAddMode(!addMode)}>
            {
              addMode ? "Hide Add" : "Add"
            }
          </Button>
          <Button size="sm" onClick={() => {
            if (!editMode) {
              setEditMode(!editMode)
              return
            }

            if (displayExceptions.some(i => i.word.includes(" "))) {
              toast({
                title: "Invalid Exception",
                description: "Exception cannot contain spaces, and must be a single word",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
              return
            }

            if (displayExceptions.some(i => hasLeadingOrTrailingPunctuation(i.word))) {
              toast({
                title: "Invalid Exception",
                description: "Exception cannot contain leading or trailing punctuation",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
              return
            }

            if (displayExceptions.some(i => !i.word.length)) {
              toast({
                title: "Invalid exception",
                description: "Remove invalid empty exception",
                status: "error",
                duration: 5000,
                isClosable: true
              })
              return
            }

            const duplicates = displayExceptions.filter((i, index) => displayExceptions.indexOf(i) != index)
            if (duplicates.length) {
              toast({
                title: "Invalid exception",
                description: "Remove duplicate exceptions",
                status: "error",
                duration: 5000,
                isClosable: true
              })
              return
            }

            setEditMode(!editMode)
            store.setSpellCheckExceptions(displayExceptions)
          }}>
            {
              editMode ? "Done" : "Edit"
            }
          </Button>
          <SimpleSelect
              options={[
                { value: "Sort Alphabetically", label: "Sort Alphabetically" },
                { value: "Sort by Addition Date", label: "Sort by Addition Date" },
              ]}
              onChange={(value) => {onSortByChange(value.value)}}
              value={store.spellCheckExceptionsSortBy}
              width="13em"
              size="sm"
            />
        </HStack>
      </Box>

      <Collapse in={addMode} animateOpacity>
        <HStack margin="1em">
          <form style={{width: "100%"}} onSubmit={(e) => {
            e.preventDefault()
            addException()
          }}>
            <Input placeholder="Exception" variant="filled" value={newException} onChange={(event) => setNewException(event.target.value)} />
          </form>

          <SimpleTooltip label="Add Exception">
            <Button onClick={() => addException()} disabled={!newException}>
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </SimpleTooltip>
        </HStack>
      </Collapse>

      {
        displayExceptions.length === 0 ? null : (
          <TableContainer margin="0 1em">
            <Table>
              <Thead>
                <Tr>
                  <Th>Exceptions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  displayExceptions.map((exception: SpellCheckException, index: number) =>
                    <Tr key={index}>
                      <Td>
                        {
                          !editMode ? (
                            exception.word
                          ): (
                            <HStack>
                              <Input placeholder="Before" variant="filled" defaultValue={exception.word} onChange={(event) => {
                                exception.word = event.target.value.trim()
                              }} />
                              <SimpleTooltip label={"Delete substitution"}>
                                <Button onClick={() => deleteException(exception.word)} size="sm">
                                  <FontAwesomeIcon icon={faTimes} style={{color: "red"}}/>
                                </Button>
                              </SimpleTooltip>
                            </HStack>
                          )
                        }
                      </Td>
                    </Tr>
                  )
                }
              </Tbody>
            </Table>
          </TableContainer>
        )
      }

      {
        displayExceptions.length === 0 && searchQuery.length ? (
          <Box marginTop="2em">
            <NoResultsMascot />
          </Box>
        ) : null
      }

      {
        displayExceptions.length === 0 && !searchQuery.length ? (
          <Box marginTop="2em">
            <Mascot label="Add substitutions to modify the output speech" />
          </Box>
        ) : null
      }
    </>
  )
}

export default Exceptions;
