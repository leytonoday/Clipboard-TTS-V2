import {
  Tr,
  Th,
  Td,
  Table,
  Thead,
  Tbody,

  Box,
  Kbd,
  Modal,
  Divider,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalCloseButton,
  useColorModeValue,
  TableContainer,
} from '@chakra-ui/react';
import shortcuts        from 'renderer/misc/shortcuts';
import { useStore }     from 'renderer/store';
import SimpleSwitch     from 'renderer/components/common/SimpleSwitch';
import SimpleTooltip    from "renderer/components/common/SimpleTooltip"
import { faKeyboard }   from "@fortawesome/free-solid-svg-icons"
import SubOptionButton  from "renderer/components/options/common/SubOptionButton";

const ShortcutsTable = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const store = useStore();

  const onOpen = () => {
    store.setIsModalOpen(true);
    onToggle()
  }

  const onCloseModal = () => {
    store.setIsModalOpen(false);
    onClose()
  }

  return (
    <Box>
      <SubOptionButton
        onClick={onOpen}
        icon={faKeyboard}
        title="Shortcuts"
        subtitle="All keyboard shortcuts for this app"
      />

      <Modal
        isCentered
        onClose={onCloseModal}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')}>
          <ModalHeader>Shortcuts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer marginBottom="1.5em">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Command</Th>
                    <Th>Keybinding</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {shortcuts.map(shortcut => (
                    <Tr key={shortcut.commandName}>
                      <Td>
                        <SimpleTooltip label={shortcut.tooltip}>
                          {shortcut.commandName}
                        </SimpleTooltip>
                      </Td>
                      <Td>
                        <Box>
                          {shortcut.keybinding.split('+').map((key, index) => (
                              <span key={key}>
                                <Kbd>{key}</Kbd>
                                {index < shortcut.keybinding.split('+').length -1 ? ' + ' : ''}
                              </span>
                            ))}
                        </Box>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ShortcutsTable;
