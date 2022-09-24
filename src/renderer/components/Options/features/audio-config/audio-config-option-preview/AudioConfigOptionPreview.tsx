import { useStore }         from 'renderer/store';
import { Box, Divider }     from '@chakra-ui/react';
import SpeakingRateSlider   from "../common/SpeakingRateSlider"

const AudioConfigOptionPreview = () => {
  const store = useStore()

  return (
    <>
      <Box margin="0 1em" textAlign={"center"}>
        { store.audioProfile.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") }
      </Box>

      <Divider margin="1em 0" />

      <Box width="100%">
        <SpeakingRateSlider orientation="horizontal"/>
      </Box>

    </>
  )
}

export default AudioConfigOptionPreview;
