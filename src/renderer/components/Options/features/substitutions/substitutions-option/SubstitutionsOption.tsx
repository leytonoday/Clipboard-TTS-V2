import OptionHeader from 'renderer/components/options/common/OptionHeader';
import Substitutions from '../common/Substitutions';
import {
  Box,
  Button,
  Collapse,
  Divider,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import SearchBar from 'renderer/components/common/SearchBar';
import { useEffect, useState } from 'react';
import { useStore } from 'renderer/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import SimpleTooltip from 'renderer/components/common/SimpleTooltip';
import { Substitution } from 'renderer/types';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import SubstitutionItem from './components/SubstitutionItem';
import NoResultsMascot from 'renderer/components/common/NoResultsMascot';
import Mascot from 'renderer/components/common/Mascot';
import { debuggingOutput } from 'renderer/utils';

const SubstitutionsOption = () => {
  // Hooks
  const store = useStore();
  const toast = useToast();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [substitutions, setSubstitutions] = useState(store.substitutions);
  const [searchedSubstitutions, setSearchedSubstitutions] = useState(store.substitutions);

  // Form state
  const [beforeSubstitution, setBeforeSubstitution] = useState('');
  const [afterSubstitution, setAfterSubstitution] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [matchCase, setMatchCase] = useState(false);

  // Functions
  const searchSubstitutions = (searchQuery: string, substitutions: Substitution[] | null = null) => {
    const filter = (searchQuery: string, substitutions: Substitution[]) => {
      const searchQueryLower = searchQuery.toLowerCase();
      const filteredSubstitutions = substitutions.filter(
        (substitution) =>
          substitution.before.toLowerCase().includes(searchQueryLower) ||
          substitution.after.toLowerCase().includes(searchQueryLower)
      );
      return filteredSubstitutions;
    }

    if (!substitutions) {
      if (!searchQuery)
        return store.substitutions;
      return filter(searchQuery, store.substitutions);
    }
    else {
      if (!searchQuery)
        return substitutions;
      return filter(searchQuery, substitutions);
    }
  };
  const handleSearch = (searchQuery: string) => {
    setSearchedSubstitutions(searchSubstitutions(searchQuery));
  }
  const addSubstitution = () => {
    if (!beforeSubstitution)
      return;

    if (beforeSubstitution === afterSubstitution) {
      toast({
        title: 'Substitution error',
        description: 'The before and after substitutions cannot be the same',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (store.substitutions.some((i) => i.before === beforeSubstitution)) {
      toast({
        title: 'Substitution already exists',
        description: 'This substitution already exists',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newSubstitution = new Substitution(beforeSubstitution, afterSubstitution, matchCase);

    const substitutions = [...store.substitutions, newSubstitution];
    setSubstitutions(substitutions);
    store.setSubstitutions(substitutions);
    setBeforeSubstitution('');
    setAfterSubstitution('');
    setMatchCase(false);
    setSearchQuery("");
    setSearchedSubstitutions(substitutions);
    debuggingOutput(
      store.substitutionOptionDebuggingOutput,
      'substitutionOptionDebuggingOutput',
      `Substitution added: ${beforeSubstitution} -> ${afterSubstitution}`
    );

    toast({
      title: 'Substitution added',
      description: 'The substitution has been added',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };
  const deleteSubstitution = (substitution: Substitution) => {
    const substitutions = [...store.substitutions]
    const toDeleteSubstitution = substitutions.find((i) => i.id === substitution.id);
    if (!toDeleteSubstitution)
      return;

    substitutions.splice(substitutions.indexOf(toDeleteSubstitution), 1);
    setSubstitutions(substitutions);
    store.setSubstitutions(substitutions);
    setSearchedSubstitutions(searchSubstitutions(searchQuery, substitutions));
    debuggingOutput(
      store.substitutionOptionDebuggingOutput,
      'substitutionOptionDebuggingOutput',
      `Substitution removed: ${substitution.before} -> ${substitution.after}`
    );

    if (!substitutions.length)
      setEditMode(false);

  };
  const updateMatchCase = (substitution: Substitution) => {
    const substitutions = [...store.substitutions]
    const updatedSubstitution = substitutions.find((i) => i.id === substitution.id);
    if (!updatedSubstitution)
      return;

    updatedSubstitution.matchCase = !updatedSubstitution.matchCase;
    setSubstitutions(substitutions);
    store.setSubstitutions(substitutions);
  };
  const validateEdits = () => {
    // Check for empty before values
    if (searchedSubstitutions!.some((i) => !i.before.length)) {
      toast({
        title: 'Invalid substitution',
        description:
          "Remove invalid empty 'before' substitution value",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // check for duplicates before values
    const beforeValues = searchedSubstitutions!.map((i) => i.before);
    const duplicates = beforeValues.filter((item, index) => beforeValues.indexOf(item) != index);
    if (duplicates.length) {
      toast({
        title: 'Invalid substitution',
        description:
          "Remove duplicate 'before' substitution value: " +
          duplicates[0],
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setEditMode(!editMode);

    // Searched substitutions could only be a sub-set of the substitutions, so we need to update the substitutions
    const updatedSubstitutions = substitutions.map((substitution) => {
      const updatedSubstitution = searchedSubstitutions!.find((i) => i.id === substitution.id);
      if (updatedSubstitution)
        return updatedSubstitution;
      return substitution;
    });

    setSubstitutions(updatedSubstitutions);
    setSearchedSubstitutions(searchSubstitutions(searchQuery, updatedSubstitutions));
    store.setSubstitutions(updatedSubstitutions);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination)
      return;
    if (searchedSubstitutions.length === 1 || source.index === destination.index) // Only one item, no need to reorder, or in same place
      return;

    const substitutions = [...store.substitutions]

    const toRemove = substitutions.indexOf(searchedSubstitutions[source.index]);

    if (source.index < destination.index) { // It is being moved down the list, and thus will have something above it
      const itemAbove = searchedSubstitutions[destination.index];
      const itemAboveIndex = substitutions.indexOf(itemAbove);
      substitutions.splice(toRemove, 1);
      substitutions.splice(itemAboveIndex, 0, searchedSubstitutions[source.index]);

    }
    else { // It is being moved up the list, and thus will have something below it
      const itemBelow = searchedSubstitutions[destination.index];
      const itemBelowIndex = substitutions.indexOf(itemBelow);
      substitutions.splice(toRemove, 1);
      substitutions.splice(itemBelowIndex, 0, searchedSubstitutions[source.index]);
    }

    store.setSubstitutions(substitutions);
    setSubstitutions(substitutions);
    setSearchedSubstitutions(searchSubstitutions(searchQuery, substitutions));
  };

  return (
    <>
      <OptionHeader
        title="Substitutions"
        subtitle="Here you can replace instances of words or phrases within copied text"
      />

      <Substitutions />

      <Divider margin="1em 0" />

      <Box margin="0 1em">
        <SearchBar
          searchQuery={searchQuery}
          handleSearch={(searchQuery) => {
            setSearchQuery(searchQuery);
            handleSearch(searchQuery);
          }}
        />

        <HStack justifyContent="end" marginTop="0.75em">
          <Button size="sm" onClick={() => setAddMode(!addMode)}>
            {addMode ? 'Hide Add' : 'Add'}
          </Button>
          <Button size="sm" disabled={!searchedSubstitutions.length}
            onClick={() => {
              if (!editMode)
                setEditMode(true);
              else {
                validateEdits();
                setEditMode(false);
              }
            }}
          >
            {editMode ? 'Done' : 'Edit'}
          </Button>
        </HStack>

        <Collapse in={addMode} animateOpacity>
          <HStack margin="1.5em 1em 1em 1em">
            <form
              style={{ width: '100%' }}
              onSubmit={(e) => {
                e.preventDefault();
                addSubstitution();
              }}
            >
              <Input
                variant="filled"
                placeholder="Before"
                value={beforeSubstitution}
                onChange={(event) => setBeforeSubstitution(event.target.value)}
              />
            </form>
            <FontAwesomeIcon icon={faArrowRight} />
            <form
              style={{ width: '100%' }}
              onSubmit={(e) => {
                e.preventDefault();
                addSubstitution();
              }}
            >
              <Input
                variant="filled"
                placeholder="After"
                value={afterSubstitution}
                onChange={(event) => setAfterSubstitution(event.target.value)}
              />
            </form>

            <SimpleTooltip label="Match case">
              <Button
                variant={matchCase ? 'solid' : 'ghost'}
                onClick={() => setMatchCase(!matchCase)}
              >
                Aa
              </Button>
            </SimpleTooltip>

            <SimpleTooltip label="Add Substitution">
              <Button
                onClick={() => addSubstitution()}
                disabled={!beforeSubstitution}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            </SimpleTooltip>
          </HStack>
        </Collapse>
      </Box>

      {searchedSubstitutions.length === 0 ? null : (
        <TableContainer margin="0.5em 1em" overflowX="hidden">
          <Table>
            <Thead>
              <Tr>
                {
                  editMode ? (
                    <Th padding="0"></Th>
                  ): null
                }
                <Th>Before</Th>
                <Th>After</Th>
                <Th padding="0" width="1em" textAlign={"center"}>
                  {
                    editMode ? "Actions" : "Match Case"
                  }
                </Th>
              </Tr>
            </Thead>
            {
              editMode ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable" type="droppableItem">
                    {(droppableProvided) => (
                      // @ts-ignore
                      <Tbody
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                        position="relative"
                      >
                        {searchedSubstitutions.map((substitution, index) => (
                          <Draggable
                            key={substitution.before}
                            draggableId={substitution.before}
                            index={index}
                          >
                            {(provided) => (
                              <Tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                background={useColorModeValue("white", '#171717')}
                              >
                                <Td
                                  {...provided.dragHandleProps}
                                  width="0.5em"
                                  justifyContent={"center"}
                                  padding="0 0 0 1em"
                                >
                                  <FontAwesomeIcon icon={faGripVertical} />
                                </Td>
                                <SubstitutionItem
                                  substitution={substitution}
                                  editMode={editMode}
                                  updateMatchCase={updateMatchCase}
                                  deleteSubstitution={deleteSubstitution}
                                />
                              </Tr>
                            )}
                          </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                      </Tbody>
                    )}
                  </Droppable>
                </DragDropContext>

              ): (
                <Tbody>
                  {
                    searchedSubstitutions.map((substitution, index) => (
                      <Tr key={index}>
                        <SubstitutionItem
                          substitution={substitution}
                          editMode={editMode}
                          updateMatchCase={updateMatchCase}
                          deleteSubstitution={deleteSubstitution}
                        />
                      </Tr>
                    ))
                  }
                </Tbody>
              )
            }
          </Table>
        </TableContainer>
      )}

      {searchedSubstitutions.length === 0 && searchQuery.length ? (
        <Box marginTop="2em">
          <NoResultsMascot />
        </Box>
      ) : null}

      {searchedSubstitutions.length === 0 && !searchQuery.length ? (
        <Box marginTop="2em">
          <Mascot label="Add substitutions to modify the output speech" />
        </Box>
      ) : null}
    </>
  );
};

export default SubstitutionsOption;
