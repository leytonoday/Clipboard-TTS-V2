import { Box }                  from "@chakra-ui/react"
import { useStore }             from "renderer/store"
import SimpleSlider             from "renderer/components/common/SimpleSlider"
import { useCallback, useMemo } from "react"

const VolumeGainDbSlider = () => {
  const store = useStore()

  // VOLUME GAIN DB
  const onVolumeGainDbChange = useCallback((value: number) => {
    store.setVolumeGainDb(value)
  }, [])
  const volumeGainDbMarks = useMemo(() => {
    return [
      { label: "-16", value: -16 },
      { label: "-12", value: -12 },
      { label: "-8", value: -8 },
      { label: "-4", value: -4 },
      { label: "0", value: 0 },
      { label: "4", value: 4 },
      { label: "8", value: 8 },
      { label: "12", value: 12 },
      { label: "16", value: 16 },
    ]
  }, [])

  return (
    <Box margin="0 1em" height="100%">
      <SimpleSlider
        label={"Volume Gain DB"}
        orientation="vertical"
        size={"md"}
        labelSize={"sm"}
        info="Volume gain (in dB) of the normal native volume supported by the specific voice,
          in the range [-96.0, 16.0]. If set to a value of 0.0 (dB), it will play at normal
          native signal amplitude. A value of -6.0 (dB) will play at approximately half the
          amplitude of the normal native signal amplitude. A value of +6.0 (dB) will play at
          approximately twice the amplitude of the normal native signal amplitude."

        min={-16}
        max={16}
        step={2}

        showLabel={true}
        onChange={onVolumeGainDbChange}
        value={store.volumeGainDb}
        marks={volumeGainDbMarks}
      />
    </Box>
  )
}

export default VolumeGainDbSlider;
