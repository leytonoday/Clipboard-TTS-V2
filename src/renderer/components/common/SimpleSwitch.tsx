import { Box, Switch, HStack } from "@chakra-ui/react"
import IconPopover from "./IconPopover"
import React from "react"

interface SimpleSwitchProps {
  label: string,
  isChecked: boolean,
  setChecked: (checked: boolean) => void
  onClick?: () => void,
  info?: string,
  warning?: string
  danger?: string
}

const SimpleSwitch = (props: SimpleSwitchProps) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      padding="0 1em"
    >
    <HStack justifyContent="center" alignItems="center">
      <p>{ props.label }</p>
      <HStack>
        { props.info && <Box> <IconPopover content={props.info} status="info" /> </Box> }
        { props.warning && <Box> <IconPopover content={props.warning} status="warning" /> </Box> }
        { props.danger && <Box> <IconPopover content={props.danger} status="danger" /> </Box> }
      </HStack>
    </HStack>

    <Switch
      size="lg"
      isChecked={props.isChecked}
      onChange={(e) => {
        if (props.onClick)
          props.onClick()
        props.setChecked(e.target.checked)
      }}
    />
  </Box>
  )
}

export default React.memo(SimpleSwitch)
