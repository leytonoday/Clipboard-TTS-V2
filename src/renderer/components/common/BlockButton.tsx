import { Box, useColorModeValue } from "@chakra-ui/react"
import { useStore } from "renderer/store"
import SimpleTooltip from "renderer/components/common/SimpleTooltip";

interface BlockButtonProps {
  selected: boolean,
  label: string,
  font?: string,
  onClick: (value: any) => void,
  height: string,
  width: string,
  tooltipDisabled?: boolean
}

const BlockButton = (props: BlockButtonProps) => {
  const store = useStore()
  const defaultBorderColour = useColorModeValue("#DDDDDD", "#404040")

  return (
      <SimpleTooltip label={props.label} disabled={props.tooltipDisabled}>
        <Box
          width={props.width}
          minHeight={props.height}
          maxHeight="fit-content"
          fontFamily={props.font ? props.font : undefined}
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          padding="0.5em"
          cursor="pointer"
          borderRadius="0.25em"
          _hover={{ transform: "scale(1.1)" }}
          transition="0.2s ease all"
          border={props.selected ? `6px solid ${store.accent}` : `1px solid ${defaultBorderColour}`}
          onClick={props.onClick}
        >
          <Box fontSize="1em">
            {props.label}
          </Box>
        </Box>
    </SimpleTooltip>
  )
}

export default BlockButton
