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
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import SubOptionButton from "renderer/components/options/common/SubOptionButton";
import { tipsAndTricks } from "renderer/misc/data"
import parse from 'html-react-parser';

const TipsAndTricks = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <SubOptionButton
        title="Tips and Tricks"
        subtitle="How to get the most out of the application"
        icon={faLightbulb}
        onClick={() => onToggle()}
      />

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')}>
          <ModalHeader>Tips and Tricks</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="30em" overflowY="auto">

            <Accordion allowMultiple defaultIndex={[-1]}>
              {
                tipsAndTricks.map((tip, index) => (
                  <AccordionItem key={index}>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {tip.title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      {
                        parse(tip.text)
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

export default TipsAndTricks;
