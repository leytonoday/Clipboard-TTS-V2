import { Box, Button, HStack, Input, Table, TableContainer, Tbody, Th, Thead, Tr, useToast, VStack } from "@chakra-ui/react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import SearchBar from "renderer/components/common/SearchBar";
import SimpleTooltip from "renderer/components/common/SimpleTooltip";
import OptionSubHeader from "renderer/components/options/common/OptionSubHeader";
import { useStore } from "renderer/store";

const Exceptions = () => {
  const store = useStore()
  const toast = useToast()

  const sortExceptions = useCallback((exceptions: string[], sortBy: string) => {
    if (sortBy === "Sort Alphabetically")
      return [...exceptions].sort((a, b) => a.localeCompare(b))
    else
      return exceptions
  }, [])


  const [searchQuery, setSearchQuery] = useState("");
  const [displayExceptions, setDisplayExceptions] = useState<string[]>(sortExceptions(store.spellCheckExceptions, store.spellCheckExceptionsSortBy));
  const [managementMode, setManagementMode] = useState(false)
  const [newException, setNewException] = useState("")

  const filterBySearchQuery = (searchQuery: string) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const filtered = store.spellCheckExceptions.filter((exception) => {
      return exception.toLowerCase().includes(searchQueryLower)
    })

    return filtered;
  }

  const handleSearch = () => {
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
  }, [store.substitutions, searchQuery])

  const addException = () => {
    if (!newException) return

    if (store.spellCheckExceptions.some(i => i.toLowerCase() === newException.toLowerCase())) {
      toast({
        title: "Exception already exists",
        description: "That exception already exists.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

  }

  return (
    <>
      <OptionSubHeader includePadding title="Exceptions" info="Exceptions will be ignored by the spell checker, and won't flag up as a spelling mistake" />

      {/* Search */}
      <Box padding="0 1em" marginTop="1em">
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      </Box>

      <HStack margin="1em">
        <Input placeholder="Exception" value={newException} onChange={(event) => setNewException(event.target.value)} />

        <SimpleTooltip label="Add Substitution">
          <Button onClick={() => addException()}>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </SimpleTooltip>
      </HStack>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Exceptions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {

            }
          </Tbody>
        </Table>
      </TableContainer>

    </>
  )
}

export default Exceptions;
