import {
  Divider,
  SimpleGrid,
  useBreakpointValue,
  Center
} from "@chakra-ui/react"
import OptionHeader           from "../../../common/OptionHeader"
import SampleRateSlider       from "../common/SampleRateSlider"
import VolumeGainDbSlider     from "../common/VolumeGainDbSlider"
import SpeakingPitchSlider    from "../common/SpeakingPitchSlider"
import AudioProfileSelection  from "./components/AudioProfileSelection"
import SpeakingRateSelection  from "../common/SpeakingRateSlider"

const AudioConfigOption = () => {
  const columns = useBreakpointValue({base: 2, "2xl": 4})
  const sliderGridHeight = useBreakpointValue({base: "60em", "2xl": "30em"})

  return (
    <>
      <OptionHeader
        title="Audio Configuration"
        subtitle="Here you can configure the output audio"
      />

      <AudioProfileSelection />

      <Divider margin="1.5em 0" />

      <SimpleGrid height={sliderGridHeight} columns={columns} justifyContent="center" spacing="3em 0" paddingBottom="1em" overflowY="hidden">
        <Center>
          <SpeakingPitchSlider orientation="vertical"/>
        </Center>

        <Center>
          <SpeakingRateSelection orientation="vertical"/>
        </Center>

        <Center>
          <VolumeGainDbSlider orientation="vertical"/>
        </Center>

        <Center>
          <SampleRateSlider orientation="vertical"/>
        </Center>
      </SimpleGrid>

      <br />

    </>
  )
}

export default AudioConfigOption
