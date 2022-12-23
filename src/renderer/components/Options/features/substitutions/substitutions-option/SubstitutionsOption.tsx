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
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import {
  faGripVertical,
  faCheck,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import Mascot from 'renderer/components/common/Mascot';
import SearchBar from 'renderer/components/common/SearchBar';
import { useStore } from 'renderer/store';
import OptionHeader from '../../../common/OptionHeader';
import SimpleTooltip from 'renderer/components/common/SimpleTooltip';
import Substitutions from '../common/Substitutions';
import NoResultsMascot from 'renderer/components/common/NoResultsMascot';
import { Substitution } from 'renderer/types';
import { debuggingOutput } from 'renderer/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useCallback, useEffect } from 'react';
import SubstitutionItem from './components/SubstitutionItem';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';

const SubstitutionsOption = () => {
  const store = useStore();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [displaySubstitutions, setDisplaySubstitutions] = useState(store.substitutions);
  const [beforeSubstitution, setBeforeSubstitution] = useState('');
  const [afterSubstitution, setAfterSubstitution] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [matchCase, setMatchCase] = useState(false);

  const filterBySearchQuery = (searchQuery: string) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const filtered = store.substitutions.filter((substitution) => {
      return (
        substitution.before.toLowerCase().includes(searchQueryLower) ||
        substitution.after.toLowerCase().includes(searchQueryLower)
      );
    });

    return filtered;
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery)
      setDisplaySubstitutions(store.substitutions);

    const searchQueryLower = searchQuery.toLowerCase();
    const filteredSubstitutions = filterBySearchQuery(searchQueryLower);
    setDisplaySubstitutions(filteredSubstitutions);
  };

  const deleteSubstitution = useCallback(
    (substitution: Substitution) => {
      const substitutions = [...store.substitutions];

      const index = substitutions.findIndex(
        (i) => i.before === substitution.before
      );
      if (index === -1) return;

      substitutions.splice(index, 1);
      store.setSubstitutions(substitutions);

      debuggingOutput(
        store.substitutionOptionDebuggingOutput,
        'substitutionOptionDebuggingOutput',
        `Substitution removed: ${substitution.before} -> ${substitution.after}`
      );

      setDisplaySubstitutions(substitutions);

      if (!substitutions.length) {
        setEditMode(false);
      }
    },
    [store.substitutions]
  );

  const updateMatchCase = useCallback(
    (substitution: Substitution) => {
      const substitutions = [...store.substitutions];

      const index = substitutions.findIndex(
        (i) => i.before === substitution.before
      );
      if (index === -1) return;

      substitutions[index].matchCase = !substitutions[index].matchCase;
      store.setSubstitutions(substitutions);

      setDisplaySubstitutions(substitutions);
    },
    [store.substitutions]
  );

  const addSubstitution = useCallback(() => {
    if (!beforeSubstitution) return;

    if (
      store.substitutions.some(
        (substitution) => substitution.before === beforeSubstitution
      )
    ) {
      toast({
        title: 'Substitution already exists',
        description: 'This substitution already exists',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newSubstitution: Substitution = {
      before: beforeSubstitution,
      after: afterSubstitution,
      matchCase,
    };

    const substitutions = [...store.substitutions, newSubstitution];
    store.setSubstitutions(substitutions);
    setDisplaySubstitutions(substitutions);
    setBeforeSubstitution('');
    setAfterSubstitution('');
    setMatchCase(false);
    setSearchQuery("")

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
  }, [
    beforeSubstitution,
    afterSubstitution,
    store.substitutions,
    matchCase,
  ]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = [...displaySubstitutions];

    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setDisplaySubstitutions(items);
    store.setSubstitutions(items);
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
          <Button
            size="sm"
            disabled={!displaySubstitutions.length}
            onClick={() => {
              if (displaySubstitutions.some((i) => !i.before.length)) {
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
              const beforeValues = displaySubstitutions.map((i) => i.before);
              const duplicates = beforeValues.filter(
                (item, index) => beforeValues.indexOf(item) != index
              );
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
              store.setSubstitutions(displaySubstitutions);
            }}
          >
            {editMode ? 'Done' : 'Edit'}
          </Button>
        </HStack>
      </Box>

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

      {displaySubstitutions.length === 0 ? null : (
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
                        {displaySubstitutions.map((substitution, index) => (
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
                    displaySubstitutions.map((substitution, index) => (
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

      {displaySubstitutions.length === 0 && searchQuery.length ? (
        <Box marginTop="2em">
          <NoResultsMascot />
        </Box>
      ) : null}

      {displaySubstitutions.length === 0 && !searchQuery.length ? (
        <Box marginTop="2em">
          <Mascot label="Add substitutions to modify the output speech" />
        </Box>
      ) : null}
    </>
  );
};

export default SubstitutionsOption;
