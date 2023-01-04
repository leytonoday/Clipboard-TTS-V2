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
import globalShortcuts  from 'renderer/misc/globalShortcuts';
import localShortcuts   from 'renderer/misc/localShortcuts';
import { useStore }     from 'renderer/store';
import SimpleTooltip    from "renderer/components/common/SimpleTooltip"
import { faKeyboard }   from "@fortawesome/free-solid-svg-icons"
import SubOptionButton  from "renderer/components/options/common/SubOptionButton";
import { useMemo }      from 'react';

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

  // Commbine and sort all shortcuts, both local and global
  const allShortcuts = useMemo(() => {
    const shortcuts = [...globalShortcuts, ...localShortcuts].sort((a, b) => a.commandName > b.commandName ? 1 : -1)
    return shortcuts
  },[])

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
        size="2xl"
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
                  {allShortcuts.map(shortcut => (
                    <Tr key={shortcut.commandName}>
                      <Td>
                        <Box width="fit-content">
                          <SimpleTooltip label={shortcut.tooltip}>
                            {shortcut.commandName}
                          </SimpleTooltip>
                        </Box>
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
