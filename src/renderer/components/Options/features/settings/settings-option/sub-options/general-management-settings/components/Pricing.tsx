import {
  Tr,
  Th,
  Td,
  Table,
  Tbody,
  Thead,
  Modal,
  Divider,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  TableContainer,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import SubOptionButton  from "renderer/components/options/common/SubOptionButton";
import OptionSubHeader  from 'renderer/components/options/common/OptionSubHeader';
import { faDollarSign } from "@fortawesome/free-solid-svg-icons"

const Pricing = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <SubOptionButton
        onClick={onOpen}
        icon={faDollarSign}
        title="Pricing"
        subtitle="Monitor API pricing"
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
        <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')} maxHeight="80%" overflowY="hidden">
          <ModalHeader>Pricing</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">

            <OptionSubHeader includePadding title="Text-To-Speech API Pricing" info="Text-to-Speech is priced based on the number of characters sent to the service to be synthesized into audio each month"/>

            <TableContainer overflowX="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Feature</Th>
                    <Th>Fee per month</Th>
                    <Th>Price after free usage limit is reached</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      Standard (non-WaveNet, non-Neural2) voices
                    </Td>
                    <Td>
                      0 to 4 million characters
                    </Td>
                    <Td>
                      $0.000004 USD per character ($4.00 USD per 1 million characters)
                    </Td>
                  </Tr>


                  <Tr>
                    <Td>
                      WaveNet voices
                    </Td>
                    <Td>
                      0 to 1 million characters
                    </Td>
                    <Td>
                      $0.000016 USD per character ($16.00 USD per 1 million characters)
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>
                      Neural2 voices
                    </Td>
                    <Td>
                      0 to 1 million characters
                    </Td>
                    <Td>
                      $0.000016 USD per character ($16.00 USD per 1 million characters)
                    </Td>

                  </Tr>

                </Tbody>
              </Table>
            </TableContainer>

            <Divider margin="2em 0"/>

            <OptionSubHeader includePadding title="Vision API Pricing" info="Charges are incurred per image. Clipboard TTS only uses one feature of the Vision API, the
              Document Text Detection. Therefore, each image sent off to the API is one unit. Thus, you get 1000 free image-to-text requests per month."/>

            <TableContainer overflowX="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Feature</Th>
                    <Th>First 1000 units/month</Th>
                    <Th>Units 1001 - 5,000,000 / month</Th>
                    <Th>Units 5,000,001 and higher / month</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      Document Text Detection
                    </Td>
                    <Td>
                      Free
                    </Td>
                    <Td>
                      $1.50
                    </Td>
                    <Td>
                      $0.60
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <Divider margin="2em 0"/>

            <OptionSubHeader includePadding title="Translation API Pricing" info="You are charged for the amount of text that Cloud Translation processes per month.
              You are only charged for the text that you provided; there's no additional charge for the detection in addition to the translation.
              For example, if you submit 1,000 characters for translation without specifying the source language, you are only charged for the 1,000
              characters."/>

            <TableContainer overflowX="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>First 500,000 characters per month	</Th>
                    <Th>500,000 to 1 billion characters per month</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      Free
                    </Td>
                    <Td>
                      $20 per million characters
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <br />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Pricing
