import { Box }                  from "@chakra-ui/react"
import { useStore }             from "renderer/store"
import SimpleSlider             from "renderer/components/common/SimpleSlider"
import { useCallback, useMemo } from "react"

interface SpeakingPitchSliderProps {
  orientation: "horizontal" | "vertical"
}

const SpeakingPitchSlider = (props: SpeakingPitchSliderProps) => {
  const store = useStore()

  // SPEAKING PITCH
  const onSpeakingPitchChange = useCallback((value: number) => {
    store.setSpeakingPitch(value)
  }, [])
  const speakingPitchMarks = useMemo(() => {
    return [
      { label: "-20", value: -20 },
      { label: "-10", value: -10 },
      { label: "0", value: 0 },
      { label: "10", value: 10 },
      { label: "20", value: 20 },
    ]
  }, [])

  return (
    <Box height="100%">
      <SimpleSlider
        label={"Speaking Pitch"}
        orientation={props.orientation}
        size={"md"}
        labelSize="sm"
        info="Speaking pitch, in the range [-20.0, 20.0]. 20 means increase 20 semitones from the original pitch.
          -20 means decrease 20 semitones from the original pitch."

        min={-20}
        max={20}
        step={2.5}

        showLabel={true}
        onChange={onSpeakingPitchChange}
        value={store.speakingPitch}
        marks={speakingPitchMarks}

        justifyLabel="center"
      />
  </Box>
  )
}

export default SpeakingPitchSlider;
