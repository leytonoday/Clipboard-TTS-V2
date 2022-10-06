import {
  Box,
  Modal,
  Divider,
  VStack,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import WhatsNew                     from 'renderer/components/common/WhatsNew';
import { useStore }                 from 'renderer/store';
import { useEffect }                from 'react';
import { whatsNewData }                 from 'renderer/misc/data';
import { CURRENT_VERSION }          from 'renderer/misc/constants';

const WhatsNewModal = () => {
  const store = useStore();
  const { onClose, isOpen } = useDisclosure({
    defaultIsOpen: store.whatsNewData.version !== CURRENT_VERSION,
  });

  useEffect(() => {
    store.setWhatsNewData(whatsNewData);
  }, [store.whatsNewData])

  return (
    <Box>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="md"
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay
          backdropFilter="blur(10px)"
          bg={`${useColorModeValue('#00000033', '#FFFFFF22')}`}
        />
        <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')}>
          <ModalHeader>
            <Box>What's New?</Box>
            <Box color="grey" fontSize="0.8em">Version {CURRENT_VERSION}</Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WhatsNew />
            <br />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default WhatsNewModal
