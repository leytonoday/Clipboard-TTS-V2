import {
  Box,
  Modal,
  Button,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { useStore }     from 'renderer/store';
import { faTrashCan }   from '@fortawesome/free-solid-svg-icons';
import SubOptionButton  from 'renderer/components/options/common/SubOptionButton';

const FactoryDataReset = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { factoryDataReset } = useStore((state) => state);

  return (
    <Box>
      <SubOptionButton
        onClick={onToggle}
        icon={faTrashCan}
        title="Factory Data Reset"
        subtitle="Reset this app to it's factory default settings. This will erase all data and settings"
      />
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
            You're about to delete all of your data and settings for this app.
            This cannot be undone, and will cause the application to reload.
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                factoryDataReset()
                onClose()
                window.localStorage.clear()
                window.location.reload()
              }}
            >
              I'm sure
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FactoryDataReset;
