import { Tooltip, Center } from '@chakra-ui/react'
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
      <Center>
        {
          props.children
        }
      </Center>
    </Tooltip>
  )
}

export default SimpleTooltip;
