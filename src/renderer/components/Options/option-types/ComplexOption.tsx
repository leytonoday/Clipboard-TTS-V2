import {
  Box,
  Portal,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
} from "@chakra-ui/react";
import OptionIcon                           from "../common/OptionIcon";
import { useStore }                         from "renderer/store";
import { IComplexOption }                   from "renderer/types";
import React, { useState }                  from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const ComplexOption = (props: IComplexOption) => {
  const store = useStore()

  const navigate = useNavigate()
  const location = useLocation()

  const disabled = props.disabled ? props.disabled() : false;
  const active = props.active ? props.active() : undefined

  const [isOpen, setIsOpen] = useState(false)
  const previewBgColour = useColorModeValue("#FFFFFF", "#171717")

  return (
    <Box>
      {
        (disabled || !store.optionPreviewsEnabled) && (
          <OptionIcon icon={props.icon} active={active} disabled={disabled} onClick={() => {
            store.setCurrentOpenOptionPath(props.path)
          }} />
        )
      }
      {
        !disabled && store.optionPreviewsEnabled && (

          <Popover placement="top" trigger="hover" openDelay={400} closeDelay={100} isOpen={isOpen} isLazy={true}
            onOpen={() => {
              navigate(props.path + "preview")
              setIsOpen(true)
            }}
            onClose={() => {
              if (!store.isModalOpen)
                setIsOpen(false)
            }}
          >
            <PopoverTrigger>
              <Box style={{width: "fit-content", height: "fit-content"}}>
                <OptionIcon icon={props.icon} active={active} onClick={() => {
                  store.setCurrentOpenOptionPath(props.path)
                }} />
              </Box>
            </PopoverTrigger>
            <Portal>
              <PopoverContent
                bg={previewBgColour}
                width="20em"
                height="fit-content"
                border="1px solid grey"
                borderRadius="0.75em"
                boxShadow="0px 0px 15px 5px rgba(0, 0, 0, 0.1)"
                >
                <PopoverArrow  bg={previewBgColour} />
                <PopoverBody>
                  { // This is a bug where the path changes to the MAIN option page when the preview is opened, and this popover displays the MAIN option page for a brief moment.
                    !location.pathname.includes("preview") ? null : (<Box padding="1em 0"><Outlet /></Box>)
                  }
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        )
      }

    </Box>
  );
}

export default React.memo(ComplexOption);
