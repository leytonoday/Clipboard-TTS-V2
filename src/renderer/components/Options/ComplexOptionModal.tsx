import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useStore }             from "renderer/store"
import React, { useEffect }     from "react";
import { Outlet, useNavigate }  from "react-router-dom";

const ComplexOptionModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate()
  const setCurrentOpenOptionPath = useStore(state => state.setCurrentOpenOptionPath);
  const modalWidth = useBreakpointValue({ base: "5%", md: "10%", lg: "12%", xl: "15%", "2xl": "21%" });

  const close = () => {
    onClose()
    setCurrentOpenOptionPath("")
  }

  useEffect(() => {
    useStore.subscribe((state, prevState) => {
      if (state.currentOpenOptionPath !== prevState.currentOpenOptionPath) {
        navigate(state.currentOpenOptionPath === "" ? "/" : state.currentOpenOptionPath)

        if (state.currentOpenOptionPath === "")
          close()
        else
          onOpen()
      }
    })
  }, [])

  return (
    <Box>
      <Modal onClose={close} isOpen={isOpen} isCentered size="full" motionPreset="slideInBottom" blockScrollOnMount={false}>
        <ModalOverlay backdropFilter='blur(10px)' bg={`${useColorModeValue("#00000033", "#FFFFFF22")}`} />
        {/* 1px Height here isn't obeyed. Just there to give the parent a set height, to prevent a scrollbar on the Y axis of the body on overflow of the content */}
        <ModalContent margin={`7.5% ${modalWidth} 5% ${modalWidth}`} height="1px" borderRadius="0.75em" bg={useColorModeValue("#FFFFFF", "#171717")} overflowX="hidden">
          <ModalCloseButton margin="1em 1em 0 0"/>
          <ModalBody padding="2em" overflowY="auto" fontSize={['xs', 'sm', 'md']} overflowX="hidden">
            <Outlet />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default React.memo(ComplexOptionModal);
