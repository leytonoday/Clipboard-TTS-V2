import { Box, useColorModeValue } from "@chakra-ui/react"
import { useStore } from "renderer/store"
import React from "react"
import SimpleTooltip from "renderer/components/common/SimpleTooltip";

interface ColourBlockProps {
  color: string,
  size: string,
  selectable?: boolean,
  selected?: boolean,
  disabled?: boolean,
  tooltip?: string
}

const ColourBlock = (props: ColourBlockProps) => {
  const store = useStore()
  const inactiveColour = useColorModeValue("#DDDDDD", "#404040")

  return (
    <SimpleTooltip label={props.tooltip} disabled={!props.tooltip}>
      <Box
        bg={!props.disabled ? props.color : inactiveColour}
        width={props.size}
        height={props.size}
        padding="0.25em"
        borderRadius="0.25em"
        cursor={!props.disabled ? "pointer" : "not-allowed"}
        border={!props.disabled ? (props.selected ? `6px solid ${store.accent}` : undefined) : undefined}
        _hover={props.selectable && !props.disabled ? { transform: "scale(1.1)" } : undefined}
        transition="0.2s ease all"
      ></Box>
    </SimpleTooltip>
  )
}

export default React.memo(ColourBlock)
