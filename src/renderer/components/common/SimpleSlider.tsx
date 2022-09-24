import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, HStack, Center } from "@chakra-ui/react"
import { useStore } from "renderer/store"
import OptionSubHeader from "renderer/components/options/common/OptionSubHeader"
import debounce from "lodash.debounce"
import { useCallback } from "react"

const verticalLabelStyles = {
  margin: "0 0 -1.5em -4em",
  transform: "translate(0%, -50%)",
}

const horizontalLabelStyles = {
  mt: '1.25em',
  transform: "translate(-50%, 0%)",
}

interface SimpleSliderProps {
  label: string,

  leftLabel?: string,
  leftLabelStyle?: any,

  rightLabel?: string,
  rightLabelStyle?: any,

  size: "sm" | "md",
  value: any,
  min: any,
  max: any,
  step: any,
  onChange: (input: any) => void,
  marks: {label: string, value: any}[]
  showLabel?: boolean

  info?: string

  orientation: "vertical" | "horizontal",

  labelSize: "sm" | "md"
}

const SimpleSlider = (props: SimpleSliderProps) => {
  const store = useStore()

  const labelStyles = props.orientation === "vertical" ? verticalLabelStyles : horizontalLabelStyles

  const width = props.orientation === "vertical" ? "10em" : "100%"
  const height = props.orientation === "vertical" ? "100%" : "5.5em"

  const onChange = useCallback(debounce((event: any) => {
    props.onChange(event)
  }, 500), [])

  return (
    <Box height="100%" width={width} display="flex" flexDirection="column" fontSize={props.labelSize === "md" ? ['xs', 'sm', 'md'] : ['xs', 'sm']}>
      {
        props.showLabel ? (
          <Box height="2em" width="100%" marginBottom={props.orientation === "vertical" ? "1em": undefined } display="flex" justifyContent={props.orientation === "vertical" ? "center" : "start"}>
            <OptionSubHeader title={props.label} info={props.info} />
          </Box>
        ) : null
      }
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={props.orientation === "vertical" ? "column" : "row"}
        width={width}
        height={height}
        overflowX={props.orientation === "vertical" ? undefined : "visible"}
        >
        <Box width="fit-content">
        {
          props.leftLabel && (<p style={props.leftLabelStyle}>{props.leftLabel}</p>)
        }
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
          <Slider orientation={props.orientation} minHeight={props.orientation === "vertical" ? "100%" : undefined} minWidth={props.orientation === "horizontal" ? "100%" : undefined}
            defaultValue={props.value} onChange={onChange} min={props.min} max={props.max} step={props.step} size={props.size}>
            {
              props.marks.map(mark => (
                <SliderMark key={mark.value} value={mark.value} {...labelStyles} fontSize={props.size === "md" ? "sm" : "xs" } minWidth="fit-content" width="100%">
                  <Box textAlign={props.orientation === "vertical" ? "end" : "center"}>
                  {
                    mark.label
                  }
                  </Box>
                </SliderMark>
              ))
            }
            <SliderTrack bg={store.accent + '66'}>
              <Box position="relative" />
              <SliderFilledTrack bg={store.accent} />
            </SliderTrack>
            <SliderThumb boxSize={6}  padding="0">
              <Box margin="0" border={`2px solid ${store.accent}`} width="full" height="full" borderRadius="full" ></Box>
            </SliderThumb>
          </Slider>
        </Box>

        <Box width="fit-content">
        {
          props.rightLabel && (<p style={props.rightLabelStyle}>{props.rightLabel}</p>)
        }
        </Box>
      </Box>
    </Box>
  )
}

export default SimpleSlider;
