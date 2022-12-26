import {
  Draggable,
  Droppable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
  DragDropContext,
} from "react-beautiful-dnd";
import {
  Box,
  Flex,
  Modal,
  Button,
  HStack,
  Spacer,
  useToast,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  faSort,
  faBook,
  faImage,
  faLanguage,
  IconDefinition,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons"
import { useStore }                 from 'renderer/store';
import { useState }                 from 'react';
import { TextToSpeechMutation }              from "renderer/types";
import SubOptionButton              from 'renderer/components/options/common/SubOptionButton';
import { FontAwesomeIcon }          from "@fortawesome/react-fontawesome";
import { capitalizeFirstLetter }    from "renderer/utils"
import { defaultOrderOfMutations }  from "renderer/misc/data"

const getItemStyle = (draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  ...draggableStyle,
})

const getListStyle = () => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
});


const OrderOfMutations = () => {
  const store = useStore();
  const toast = useToast()
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [orderOfMutations, setOrderOfMutations] = useState(store.orderOfMutations);

  const mutationToIcon: { [key in TextToSpeechMutation]: IconDefinition } = {
    "TRANSLATION": faLanguage,
    "SUBSTITUTIONS": faArrowRightArrowLeft,
    "DICTIONARY": faBook,
    "IMAGE_TO_TEXT": faImage,
  }

  const saveOnClose = async () => {
    store.setOrderOfMutations(orderOfMutations);
    onClose();
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination)
      return;

    const items = [...orderOfMutations];

    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    if (items[0] !== "IMAGE_TO_TEXT") {
      toast({
        title: "Image to Text must be first",
        description: "Image to Text must be first in the order of mutations",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
    else
      setOrderOfMutations(items);
  }

  const resetOrderOfMutations = () => {
    store.resetOrderOfMutations()
    setOrderOfMutations(defaultOrderOfMutations);
  }

  return (
    <>
      <SubOptionButton
        onClick={onToggle}
        icon={faSort}
        title="Order of Mutations"
        subtitle="Change the order of execution of mutations applied to copied data"
      />
      <Modal
        isCentered
        onClose={saveOnClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')}>
          <ModalHeader>Order of Mutations</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="1em">
            <p style={{marginBottom: "0.5em"}}>
              The order of mutations is the order in which mutations are applied to copied data. For example, what comes first, the substitution
              or the translation? Customize this by dragging and dropping the mutations in the order you want them to be applied. Image to text
              is always applied first.
            </p>

            <Flex>
              <Spacer />
              <Button size="sm" onClick={() => {
                resetOrderOfMutations()
                toast({
                  title: "Reset Success",
                  description: "The order of mutations has been reset to the default",
                  status: "success",
                  duration: 5000,
                  isClosable: true
                })
              }}>
                Reset
              </Button>
            </Flex>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" type="droppableItem">
                {(droppableProvided) => (
                  // @ts-ignore
                  <Box ref={droppableProvided.innerRef} style={getListStyle()} {...droppableProvided.droppableProps}>
                    {orderOfMutations.map((mutation, index) => (
                      <Draggable key={mutation} draggableId={mutation} index={index} isDragDisabled={mutation === "IMAGE_TO_TEXT"}>
                        {(provided) => (
                          <HStack
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(provided.draggableProps.style)}
                            marginTop="1em"
                            width="13em"
                          >
                            <Box marginRight="1em">
                              {`${index+1}.`}
                            </Box>
                            <Button as={Box} width="100%" cursor={mutation === "IMAGE_TO_TEXT" ? "not-allowed !important" : "grab"} disabled={mutation === "IMAGE_TO_TEXT"}>
                              <FontAwesomeIcon icon={mutationToIcon[mutation]} />
                              <span style={{marginLeft: "0.5em"}}>{capitalizeFirstLetter(mutation.toLowerCase()).replaceAll("_", " ")}</span>
                            </Button>
                          </HStack>
                        )}
                      </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OrderOfMutations;
