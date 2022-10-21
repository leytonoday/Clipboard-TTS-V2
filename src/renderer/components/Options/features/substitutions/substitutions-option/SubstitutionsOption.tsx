import {
  Th,
  Tr,
  Td,
  Table,
  Thead,
  TableContainer,

  Box,
  Input,
  Tbody,
  HStack,
  Button,
  Divider,
  useToast,
  Collapse,
} from "@chakra-ui/react"
import {
  faTimes,
  faCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"
import Mascot                     from "renderer/components/common/Mascot"
import SearchBar                  from "renderer/components/common/SearchBar"
import { useStore }               from "renderer/store"
import OptionHeader               from "../../../common/OptionHeader"
import SimpleSelect               from "renderer/components/common/SimpleSelect"
import SimpleTooltip              from "renderer/components/common/SimpleTooltip"
import Substitutions              from "../common/Substitutions"
import NoResultsMascot            from "renderer/components/common/NoResultsMascot"
import { Substitution }           from "renderer/types"
import { debuggingOutput }        from "renderer/utils"
import { FontAwesomeIcon }        from "@fortawesome/react-fontawesome"
import { useState, useCallback }  from "react"

const SubstitutionsOption = () => {
  const store = useStore()
  const toast = useToast()

  const sortSubstitutions = useCallback((substitutions: Substitution[], sortBy: string) => {
    if (sortBy === "Sort Alphabetically")
      return [...substitutions].sort((a, b) => a.before.localeCompare(b.before))
    else
      return substitutions
  }, [])

  const [searchQuery, setSearchQuery] = useState("")
  const [displaySubstitutions, setDisplaySubstitutions] = useState(sortSubstitutions(store.substitutions, store.substitutionsSortBy))
  const [beforeSubstitution, setBeforeSubstitution] = useState("")
  const [afterSubstitution, setAfterSubstitution] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [matchCase, setMatchCase] = useState(false)


  const filterBySearchQuery = (searchQuery: string) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const filtered = store.substitutions.filter((substitution) => {
      return substitution.before.toLowerCase().includes(searchQueryLower) || substitution.after.toLowerCase().includes(searchQueryLower)
    })

    return filtered;
  }

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery) {
      setDisplaySubstitutions(sortSubstitutions(store.substitutions, store.substitutionsSortBy))
      return
    }

    const searchQueryLower = searchQuery.toLowerCase()
    const filteredSubstitutions = filterBySearchQuery(searchQueryLower)

    setDisplaySubstitutions(sortSubstitutions(filteredSubstitutions, store.substitutionsSortBy))
  }

  const onSortByChange = useCallback((newSortBy: string) => {
    store.setSubstitutionsSortBy(newSortBy);

    const filtered = filterBySearchQuery(searchQuery);
    const sortedSubstitutions = sortSubstitutions(filtered, newSortBy);
    setDisplaySubstitutions(sortedSubstitutions)
  }, [store.substitutions, searchQuery])

  const deleteSubstitution = useCallback((substitution: Substitution) => {
    const substitutions = [...store.substitutions]

    const index = substitutions.findIndex((i) => i.before === substitution.before)
    if (index === -1) return

    substitutions.splice(index, 1)
    store.setSubstitutions(substitutions)

    debuggingOutput(store.substitutionOptionDebuggingOutput, "substitutionOptionDebuggingOutput", `Substitution removed: ${substitution.before} -> ${substitution.after}`)

    setDisplaySubstitutions(sortSubstitutions(substitutions, store.substitutionsSortBy))

    if (!substitutions.length) {
      setEditMode(false)
    }
  }, [store.substitutions, store.substitutionsSortBy])

  const updateMatchCase = useCallback((substitution: Substitution) => {
    const substitutions = [...store.substitutions]

    const index = substitutions.findIndex((i) => i.before === substitution.before)
    if (index === -1) return

    substitutions[index].matchCase = !substitutions[index].matchCase
    store.setSubstitutions(substitutions)

    setDisplaySubstitutions(sortSubstitutions(substitutions, store.substitutionsSortBy))
  }, [store.substitutions])

  const addSubstitution = useCallback(() => {
    if (!beforeSubstitution) return

    if (store.substitutions.some((substitution) => substitution.before === beforeSubstitution)) {
      toast({
        title: "Substitution already exists",
        description: "This substitution already exists",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    const newSubstitution: Substitution = {
      before: beforeSubstitution,
      after: afterSubstitution,
      matchCase
    }

    const substitutions = [...store.substitutions, newSubstitution]
    store.setSubstitutions(substitutions)
    setDisplaySubstitutions(sortSubstitutions(substitutions, store.substitutionsSortBy))
    setBeforeSubstitution("")
    setAfterSubstitution("")
    setMatchCase(false)

    debuggingOutput(store.substitutionOptionDebuggingOutput, "substitutionOptionDebuggingOutput", `Substitution added: ${beforeSubstitution} -> ${afterSubstitution}`)

    toast({
      title: "Substitution added",
      description: "The substitution has been added",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }, [beforeSubstitution, afterSubstitution, store.substitutions, store.substitutionsSortBy, matchCase])

  return (
    <>
      <OptionHeader title="Substitutions" subtitle="Here you can replace instances of words or phrases within copied text" />

      <Substitutions />

      <Divider margin="1em 0" />

      <Box margin="0 1em">
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
          <Button size="sm" disabled={!displaySubstitutions.length} onClick={() => {

            if (displaySubstitutions.some(i => !i.before.length)) {
              toast({
                title: "Invalid substitution",
                description: "Remove invalid empty 'before' substitution value",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
              return
            }

            // check for duplicates before values
            const beforeValues = displaySubstitutions.map(i => i.before)
            const duplicates = beforeValues.filter((item, index) => beforeValues.indexOf(item) != index)
            if (duplicates.length) {
              toast({
                title: "Invalid substitution",
                description: "Remove duplicate 'before' substitution value: " + duplicates[0],
                status: "error",
                duration: 5000,
                isClosable: true,
              })
              return
            }

            setEditMode(!editMode)
            store.setSubstitutions(displaySubstitutions)
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
              value={store.substitutionsSortBy}
              width="13em"
              size="sm"
            />
        </HStack>
      </Box>

      <Collapse in={addMode} animateOpacity>
        <HStack margin="1.5em 1em 1em 1em">
          <form style={{width: "100%"}} onSubmit={(e) => {
            e.preventDefault()
            addSubstitution()
          }}>
            <Input variant="filled" placeholder="Before" value={beforeSubstitution} onChange={(event) => setBeforeSubstitution(event.target.value)} />
          </form>
          <FontAwesomeIcon icon={faArrowRight} />
          <form style={{width: "100%"}} onSubmit={(e) => {
            e.preventDefault()
            addSubstitution()
          }}>
            <Input variant="filled" placeholder="After" value={afterSubstitution} onChange={(event) => setAfterSubstitution(event.target.value)} />
          </form>

          <SimpleTooltip label="Match case">
            <Button variant={matchCase ? "solid" : "ghost"} onClick={() => setMatchCase(!matchCase)}>
              Aa
            </Button>
          </SimpleTooltip>

          <SimpleTooltip label="Add Substitution">
            <Button onClick={() => addSubstitution()} disabled={!beforeSubstitution}>
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </SimpleTooltip>
        </HStack>
      </Collapse>

      {
        displaySubstitutions.length === 0 ? null : (
          <TableContainer margin="0.5em 1em" overflowX="hidden">
            <Table>
              <Thead>
                <Tr>
                  <Th>Before</Th>
                  <Th>After</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  displaySubstitutions.map((substitution) => (
                    <Tr key={substitution.before}>
                      <Td width="50%">
                        <Box wordBreak={"break-all"} whiteSpace={"normal"}>
                          {
                            editMode ? (
                              <Input placeholder="Before" variant="filled" defaultValue={substitution.before} onChange={(event) => {
                                substitution.before = event.target.value
                              }} />
                            ): substitution.before
                          }
                        </Box>
                      </Td>
                      <Td width="50%">
                        <HStack spacing="1em" width="100%">
                          <Box wordBreak={"break-all"} whiteSpace={"normal"} flex={1}>
                            {
                              editMode ? (
                                <Input placeholder="After" variant="filled" defaultValue={substitution.after} onChange={(event) => {
                                  substitution.after = event.target.value
                                }} />
                              ): substitution.after || "Blank"
                            }
                          </Box>
                          {
                            editMode ? (
                              <HStack>
                                <SimpleTooltip label="Match case">
                                  <Button size="sm" variant={substitution.matchCase ? "solid" : "ghost"} onClick={() => updateMatchCase(substitution)}>
                                    Aa
                                  </Button>
                                </SimpleTooltip>
                                <SimpleTooltip label={"Delete substitution"}>
                                  <Button onClick={() => deleteSubstitution(substitution)} size="sm">
                                    <FontAwesomeIcon icon={faTimes} style={{color: "red"}}/>
                                  </Button>
                                </SimpleTooltip>
                              </HStack>
                            ) : null
                          }
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>
        )
      }

      {
        displaySubstitutions.length === 0 && searchQuery.length ? (
          <Box marginTop="2em">
            <NoResultsMascot />
          </Box>
        ) : null
      }

      {
        displaySubstitutions.length === 0 && !searchQuery.length ? (
          <Box marginTop="2em">
            <Mascot label="Add substitutions to modify the output speech" />
          </Box>
        ) : null
      }

    </>
  )
}

export default SubstitutionsOption
