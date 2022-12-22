import {
  Box,
  VStack,
  HStack,
  Button,
  Divider,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
  ModalBody,
  ModalFooter
}
from "@chakra-ui/react"
import Mascot                               from "renderer/components/common/Mascot";
import SearchBar                            from "renderer/components/common/SearchBar"
import OptionHeader                         from "../../../common/OptionHeader"
import SimpleSelect                         from "renderer/components/common/SimpleSelect";
import { useStore }                         from 'renderer/store';
import { HistoryItem }                      from "renderer/types";
import OptionSubHeader                      from "../../../common/OptionSubHeader";
import NoResultsMascot                      from "renderer/components/common/NoResultsMascot";
import HistoryItemDisplay                   from "../common/HistoryItemDisplay";
import { useState, useCallback, useEffect } from "react";
import SimpleTooltip from "renderer/components/common/SimpleTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const HistoryOption = () => {
  const store = useStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [displayHistory, setDisplayHistory] = useState(store.history);

  useEffect(() => {
    setDisplayHistory(store.history);
  }, [store.history])

  const filterBySearchQuery = (searchQuery: string) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const filteredHistory = store.history.filter((history) => {
      return history.text.toLowerCase().includes(searchQueryLower);
    });

    return filteredHistory;
  }

  const handleSearch = useCallback((searchQuery: string) => {
    if (!searchQuery) { // If the search query is empty, display all saved words
      setDisplayHistory(store.history);
      return;
    }

    const filteredHistory = filterBySearchQuery(searchQuery);
    setDisplayHistory(filteredHistory);
  }, [searchQuery, store.history])

  const handleChangeHistorySize = useCallback((newSize: number) => {
    setSearchQuery("");
    store.setHistorySize(newSize);

    const newHistory = store.history.slice(0, newSize)

    store.setHistory(newHistory);
    setDisplayHistory(newHistory);
  }, [store.history, store.historySize])

  return (
    <>
      <OptionHeader
        title="History"
        subtitle="Here you can see the recent text you have copied to the clipboard"
      />

      <HStack justifyContent={"space-between"} marginTop="0.75em" paddingRight="1em">
        <OptionSubHeader includePadding title="History Size" info={"The length of your History"} warning="Chaning this to a smaller value will delete out of range history"/>

        <SimpleSelect size="sm" options={[
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "20", value: "20" },
            { label: "30", value: "30" },
            { label: "40", value: "40" },
            { label: "50", value: "50" },
          ]}
          value={store.historySize.toString()}
          onChange={(value) => {
            handleChangeHistorySize(parseInt(value.value));
          }}
          width="6em"
          />
      </HStack>

      <Divider margin="1em 0" />

      <Box margin="0 1em 1em 1em">
        <SearchBar searchQuery={searchQuery} handleSearch={(searchQuery) => {
          setSearchQuery(searchQuery);
          handleSearch(searchQuery);
        }} />
        <HStack paddingTop="0.75em" width="100%" justifyContent="flex-end">
          <Button size="sm"
            onClick={() => {
              if (editMode) {
                store.setHistory(displayHistory)
              }
              setEditMode(!editMode);
            }}
            disabled={!store.history.length}
          >
            {editMode ? "Done" : "Edit"}
          </Button>
          <Button onClick={() => {
            onOpen()
          }}
          size="sm"
          disabled={!store.history.length}
          >Clear History</Button>
        </HStack>
      </Box>

      {
        displayHistory.length === 0 && searchQuery.length ? (
          <NoResultsMascot />
        ): null
      }

      {
        displayHistory.length === 0 && !searchQuery.length ? (
          <Mascot label="No history" />
        ) : null
      }

      <VStack margin="1.5em 1em 0em 1em">
        {
          displayHistory.map((historyItem: HistoryItem, index) => (
            <Box key={index} width="100%">
              <HStack spacing="1em">
                <HistoryItemDisplay historyItem={historyItem} />
                {
                  editMode ? (
                    <SimpleTooltip label={"Delete item"}>
                      <Button onClick={() => {
                        const newHistory = [...displayHistory];
                        newHistory.splice(index, 1);
                        setDisplayHistory(newHistory);

                        if (!newHistory.length) {
                          setEditMode(false);
                          store.setHistory(newHistory)
                        }

                      }} size="sm">
                        <FontAwesomeIcon icon={faTimes} style={{color: "red"}}/>
                      </Button>
                    </SimpleTooltip>
                  ) : null
                }
              </HStack>
              {
                index !== displayHistory.length - 1 ? ( <Divider margin="1em 0"/> ) : null
              }
            </Box>
          ))
        }
      </VStack>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')}>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You're about to delete your recent Clipboard TTS history. This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={() => {
              store.setHistory([])
              setDisplayHistory([])
              toast({
                title: "History Cleared",
                status: "success",
                duration: 5000,
                isClosable: true,
              })
              onClose()
            }}>I'm sure</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default HistoryOption
