import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useStore } from "renderer/store"
import React from "react"

interface OptionIconProps {
  icon: IconDefinition
  onClick: () => void
  active: boolean | undefined // used to indicate if the setting is on or off. For example, if dictionary mode is on or off
  disabled?: boolean // used to indicate if the option is clickable. For example, if the "Enable / Disable" button isn't on, then the option could be disabled
  grabbing?: boolean
}

const OptionIcon = (props: OptionIconProps) => {
  const accent = useStore(state => state.accent);
  const defaultColour = useColorModeValue("#313131", "#EEEEEE")

  const colour = props.disabled ? `${defaultColour}33` : props.active ? accent : defaultColour
  const cursor = props.disabled ? "not-allowed" : props.grabbing ? undefined: "pointer"

  return (
    <Box
      width="3em"
      height="3em"
      border="1px solid"
      borderRadius="3em"
      fontSize="1.3em"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor={cursor}
      borderColor={colour}
      color={colour}
      _active={props.disabled ? undefined : {
        borderColor: `${colour}AA`,
        color: `${colour}AA`,
        transform: "scale(0.95)",
      }}
      onClick={props.disabled ? undefined : props.onClick}
    >
      <FontAwesomeIcon icon={props.icon} />
    </Box>
  )
}

export default React.memo(OptionIcon);
