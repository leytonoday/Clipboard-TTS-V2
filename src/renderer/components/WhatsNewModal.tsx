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
import { useStore }                 from 'renderer/store';
import { useEffect }                from 'react';
import { WhatsNewData }             from 'renderer/types';
import { CURRENT_VERSION }          from 'renderer/misc/constants';

const whatsNewOutput: WhatsNewData = {
  version: CURRENT_VERSION,
  bugFixes: [
    "Theme cards are now fully clickable. Previously, clicking on the actual label would not work.",
    "All 'Reset' buttons now cause a notification, to make it clear that the action has been completed.",
    "All images are now drag-proof, to ensure that they don't trigger the Drag & Drop feature.",
    "Loading circle is now centralized, and there is a 'Loading...' label to make it clear that the app is loading.",
  ]
}

const WhatsNewModal = () => {


  const store = useStore();
  const { onClose, isOpen } = useDisclosure({
    defaultIsOpen: store.whatsNewData.version !== CURRENT_VERSION,
  });

  const outputSections: {[key: string]: (string[]) | undefined} = {
    "New Features": whatsNewOutput.newFeatures || undefined,
    "Bug Fixes": whatsNewOutput.bugFixes || undefined,
    "Notes": whatsNewOutput.notes || undefined,
  }

  const filteredOutputSections = Object.keys(outputSections).filter(i => outputSections[i] && outputSections[i]!.length > 0)

  useEffect(() => {
    store.setWhatsNewData(whatsNewOutput);
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
            <VStack spacing={0}>
              {
                filteredOutputSections.map((section, index) => (
                  <Box key={index} width="100%">
                    <b>{section}</b>
                    <VStack width="100%" justifyContent="center" spacing="0.25em">
                      {
                        outputSections[section]!.map((feature, index) => (
                          <Box key={index} width="100%">
                            • {feature}
                          </Box>
                        ))
                      }
                    </VStack>

                    {
                      index !== filteredOutputSections.length -1 && (
                        <Divider margin="1em 0" />
                      )
                    }

                  </Box>
                ))
              }
            </VStack>
            <br />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default WhatsNewModal
