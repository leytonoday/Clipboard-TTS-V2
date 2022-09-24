import { HStack, Box } from "@chakra-ui/react"
import IconPopover from "renderer/components/common/IconPopover"

interface OptionSubHeaderProps {
  title: string
  info?: any
  includePadding?: boolean
  warning?: any
}

const OptionSubHeader = (props: OptionSubHeaderProps) => {
  return (
    <>
      <HStack spacing="0.5em">
        <p style={{ padding: `0 0 0 ${props.includePadding ? "1em" : "0"}`, fontSize: "1.1em"}}>{props.title}</p>
        {
          props.info && (
            <Box fontSize={['xs', 'sm', 'md']}>
              <IconPopover content={props.info} status="info" />
            </Box>
          )
        }
        {
          props.warning && (
            <Box fontSize={['xs', 'sm', 'md']}>
              <IconPopover content={props.warning} status="warning" />
            </Box>
          )
        }
      </HStack>
    </>
  )
}

export default OptionSubHeader;

