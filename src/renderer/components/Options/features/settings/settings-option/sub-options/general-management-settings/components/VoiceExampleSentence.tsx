import {
  Box,
  Modal,
  Input,
  Button,
  useToast,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  useColorModeValue,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useStore }     from 'renderer/store';
import { useState }     from 'react';
import SubOptionButton  from 'renderer/components/options/common/SubOptionButton';
import { faEarListen }        from "@fortawesome/free-solid-svg-icons"

const VoiceExampleSentence = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const store = useStore();
  const toast = useToast()

  const [voiceExampleSentence, setVoiceExampleSentence] = useState(store.voiceExampleSentence)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoiceExampleSentence(e.target.value)
  }

  const cancelOnClose = () => {
    setVoiceExampleSentence(store.voiceExampleSentence);
    onClose();
  }

  const saveOnClose = async () => {
    store.setVoiceExampleSentence(voiceExampleSentence);
    onClose();
  }

  const reset = () => {
    store.resetSetVoiceExampleSentence();

    toast({
      title: "Voice example sentence reset",
      description: "Voice example sentence has been reset to default",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Box>
      <Box>
        <SubOptionButton
          onClick={onToggle}
          icon={faEarListen}
          title="Voice Example Sentence"
          subtitle="Sentence to be used as example for voice"
        />
      </Box>
      <Modal
        isCentered
        onClose={cancelOnClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')}>
          <ModalHeader>Voice Example Sentence</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p style={{marginBottom: "1em"}}>
              Sentence that is used when you click on the "Play" button in the voice selection, to test the voice.
            </p>
            <Flex width="100%" marginBottom="1em">
              <Spacer />
              <Button size="sm" onClick={() => reset()}>Reset</Button>
            </Flex>
            <form onSubmit={(e) => { e.preventDefault(); saveOnClose() }} >
              <Input placeholder="Enter Voice Example Sentence" value={voiceExampleSentence} variant="filled" onChange={handleInput} />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={cancelOnClose}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={saveOnClose}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default VoiceExampleSentence;
