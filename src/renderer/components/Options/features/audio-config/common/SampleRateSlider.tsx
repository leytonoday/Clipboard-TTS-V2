import { Box }                  from "@chakra-ui/react"
import { useStore }             from "renderer/store"
import SimpleSlider             from "renderer/components/common/SimpleSlider"
import { useCallback, useMemo } from "react"

interface SampleRateSliderProps {
  orientation: "horizontal" | "vertical"
}

const SampleRateSlider = (props: SampleRateSliderProps) => {
  const store = useStore()

  // SAMPLE RATE
  const onSampleRateChange = useCallback((value: number) => {
    store.setSampleRate(value)
  }, [])
  const sampleRateMarks = useMemo(() => {
    return [
      { label: "8 kHz", value: 8000 },
      { label: "12 kHz", value: 12000 },
      { label: "16 kHz", value: 16000 },
      { label: "20 kHz", value: 20000 },
      { label: "24 kHz", value: 24000 },
    ]
  }, [])

  return (
    <Box height="100%">
      <SimpleSlider
        label={"Sample Rate"}
        size={"md"}
        labelSize={"sm"}
        info="The synthesis sample rate (in hertz) for this audio. This will affect the audio quality of the Text-to-Speech."

        min={8000}
        max={24000}
        step={2000}

        showLabel={true}
        onChange={onSampleRateChange}
        value={store.sampleRate}
        marks={sampleRateMarks}
        orientation={props.orientation}

        justifyLabel="center"
      />
  </Box>
  )
}

export default SampleRateSlider;
