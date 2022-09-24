import {
  Box,
  Input,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { useStore }     from 'renderer/store';
import { useState }     from 'react';
import { faGaugeMed }   from "@fortawesome/free-solid-svg-icons"
import SubOptionButton  from "renderer/components/options/common/SubOptionButton";

const CharacterLimit = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const store = useStore()

  const [characterLimit, setCharacterLimit] = useState(store.characterLimit.toString());
  const MAX_CHARACTER_LIMIT = 5000;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setCharacterLimit("");
      return
    }
    const inputNumber = parseInt(e.target.value)
    if (inputNumber < 1)
      setCharacterLimit((1).toString());
    else if (inputNumber > MAX_CHARACTER_LIMIT)
      setCharacterLimit(MAX_CHARACTER_LIMIT.toString());
    else
      setCharacterLimit(e.target.value);
  }

  const cancelOnClose = () => {
    setCharacterLimit(store.characterLimit.toString());
    store.setIsModalOpen(false);
    onClose();
  }

  const saveOnClose = () => {
    store.setCharacterLimit(parseInt(characterLimit));
    store.setIsModalOpen(false);
    onClose();
  }

  return (
    <Box>
      <SubOptionButton
        onClick={() => {
          store.setIsModalOpen(true);
          onToggle()
        }}
        icon={faGaugeMed}
        title="Character Limit"
        subtitle="Configure TTS character limit"
      />
      <Modal
        isCentered
        onClose={cancelOnClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')}>
          <ModalHeader>Character Limit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p style={{marginBottom: "1em"}}>
              The maximum number of characters that can be spoken at once. It is wise to keep this number on the low side,
              to prevent yourself from getting lost in the middle of a sentence, and to prevent unnecessary costs.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); saveOnClose() }} >
              <Input placeholder="Enter character limit" value={characterLimit} type="number" variant="filled" onChange={handleInput} />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={cancelOnClose}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={saveOnClose} disabled={characterLimit === ""}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CharacterLimit;
