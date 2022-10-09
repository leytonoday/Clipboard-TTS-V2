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
} from '@chakra-ui/react';
import { faKey }        from "@fortawesome/free-solid-svg-icons"
import { useStore }     from 'renderer/store';
import { useState }     from 'react';
import SubOptionButton  from 'renderer/components/options/common/SubOptionButton';

const Credentials = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const store = useStore();
  const toast = useToast()

  const [apiKey, setApiKey] = useState(store.apiKey)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value)
  }

  const cancelOnClose = () => {
    setApiKey(store.apiKey);
    onClose();
  }

  const saveOnClose = async () => {
    store.setApiKey(apiKey);
    store.loadAvailableVoices();

    const interval = setInterval(() => {
      if (Object.keys(useStore.getState().availableVoices).length === 0)
        store.loadAvailableVoices()
      else
        clearInterval(interval)
    }, 5000)

    onClose();
  }

  return (
    <Box>
      <Box className="step-3">
        <SubOptionButton
          onClick={onToggle}
          icon={faKey}
          title="Credentials"
          subtitle="API key to Google Cloud Project"
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
          <ModalHeader>Credentials</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p style={{marginBottom: "1em"}}>
              An API key to a Google Cloud Project that has the following APIs enabled: Cloud Text-to-Speech API, Cloud Vision API, and Cloud Translation API
            </p>
            <form onSubmit={(e) => { e.preventDefault(); saveOnClose() }} >
              <Input type="password" placeholder="Enter API Key" value={apiKey} variant="filled" onChange={handleInput} />
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

export default Credentials;
