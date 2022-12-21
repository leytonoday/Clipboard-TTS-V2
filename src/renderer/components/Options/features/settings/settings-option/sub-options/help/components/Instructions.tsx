import {
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalCloseButton,
  useColorModeValue,

  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react';
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import SubOptionButton from "renderer/components/options/common/SubOptionButton";
import { instructions } from "renderer/misc/data"
import parse from 'html-react-parser';

const Instructions = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <SubOptionButton
        title="Instructions"
        subtitle="How to use all features of the application"
        icon={faQuestionCircle}
        onClick={() => onToggle()}
      />

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')}>
          <ModalHeader>Instructions</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="28em" overflowY="auto">

            <Accordion allowMultiple defaultIndex={[-1]}>
              {
                instructions.map((instruction, index) => (
                  <AccordionItem key={index}>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {instruction.title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      {
                        parse(instruction.text)
                      }
                    </AccordionPanel>
                  </AccordionItem>
                ))
              }
            </Accordion>
            <br />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Instructions;
