import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useStore } from 'renderer/store';
import React        from "react"
import { usePlatform } from 'renderer/hooks';

const CredentialsAlert = () => {
  const store = useStore();
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const {isWindows} = usePlatform();

  return (
    <>
      {isOpen && (
        <Box
          position="absolute"
          width="100%"
          bottom={store.optionsBarPosition === 'TOP' ? '0' : undefined}
          top={store.optionsBarPosition === 'BOTTOM' ? '0' : undefined}
          marginTop={isWindows ? "30px": "0"}>
          <Alert status="warning" variant="solid">
            <AlertIcon />
            <Box width="100%">
              <AlertTitle>Notice: Set your Credentials</AlertTitle>
              <AlertDescription>
                Before you can use this application, you must provide your
                credentials. For information on how to acquire credentials, go to
                Settings {">"} Help {">"} Instructions. If you already have your credentials,
                go to Settings {'>'} General Management {'>'}{' '} Credentials
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </Alert>
        </Box>
      )}
    </>
  );
};

export default React.memo(CredentialsAlert);
