import {
  Box,
  Modal,
  Center,
  HStack,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { useStore }                 from 'renderer/store';
import { faFileLines, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }          from '@fortawesome/react-fontawesome';

const DragAndDropModal = () => {
  const { onClose } = useDisclosure();
  const store = useStore();

  return (
    <Box>
      <Modal
        onClose={onClose}
        isOpen={store.dragAndDropModalOpen}
        isCentered
        size="sm"
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay
          backdropFilter="blur(10px)"
          bg={`${useColorModeValue('#00000033', '#FFFFFF22')}`}
        />
        <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')}>
          <ModalBody padding="2em">
            <HStack width="100%" justifyContent="center" spacing="0.25em" marginTop="-4em">
              <FontAwesomeIcon icon={faFileLines} size="6x" />
              <FontAwesomeIcon icon={faFileImage} size="6x" />
            </HStack>
            <Center fontSize="1.5em" marginTop="1em">
              <b>Drag & Drop</b>
            </Center>
            <Box textAlign="center" fontSize="0.75em" color="grey" marginTop="1.5em">
              <p>All text detected will be added to the queue read aloud</p>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DragAndDropModal;
