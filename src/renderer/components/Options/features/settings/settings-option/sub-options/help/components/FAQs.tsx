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
import { faMessage } from "@fortawesome/free-solid-svg-icons"
import SubOptionButton from "renderer/components/options/common/SubOptionButton"
import { faqs } from "renderer/misc/data"
import parse from 'html-react-parser';

const FAQs = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <SubOptionButton
        title="FAQs"
        subtitle="Frequently asked questions"
        icon={faMessage}
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
          <ModalHeader>FAQs</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="30em" overflowY="auto">

            <Accordion allowMultiple defaultIndex={[-1]}>
              {
                faqs.map((faq, index) => (
                  <AccordionItem key={index}>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {faq.title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      {
                        parse(faq.text)
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

export default FAQs
