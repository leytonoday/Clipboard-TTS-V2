import { Tooltip, Box } from '@chakra-ui/react'
import { useStore } from 'renderer/store'

interface SimpleTooltipProps {
  label?: string,
  disabled?: boolean,
  children: React.ReactNode
}

const SimpleTooltip = (props: SimpleTooltipProps) => {
  const store = useStore();

  return (
    <Tooltip isDisabled={!store.tooltipsEnabled || props.disabled} label={props.label} hasArrow openDelay={400} closeOnClick={false}>
      <Box>
        {
          props.children
        }
      </Box>
    </Tooltip>
  )
}

export default SimpleTooltip;
