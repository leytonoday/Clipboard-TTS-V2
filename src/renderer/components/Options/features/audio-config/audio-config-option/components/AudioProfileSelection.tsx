import React                        from "react"
import BlockButton                  from "renderer/components/common/BlockButton"
import { useStore }                 from "renderer/store"
import OptionSubHeader              from "renderer/components/options/common/OptionSubHeader"
import { audioProfiles }            from "renderer/misc/data"
import { SimpleGrid, Center, Box }  from "@chakra-ui/react"

const AudioProfileSelection = () => {
  const store = useStore()

  const audioProfileToLabel: {[key: string]: string} = {
    'headphone-class-device': "Headphone Class Speakers",
    'small-bluetooth-speaker-class-device': "Small Class Speakers",
    'medium-bluetooth-speaker-class-device': "Medium Class Speakers",
    'large-home-entertainment-class-device': "Large Class Speakers"
  }

  return (
    <>
      <Box marginBottom="0.5em">
        <OptionSubHeader includePadding title="Audio Profile"
          info="You can optimize the synthetic speech produced by Text-to-Speech
          for playback on different types of hardware. If you're running this
          app on a medium device, a laptop for example, you can optimize the audio
          specifically for that device and it's speakers." />
      </Box>
      <Center>
        <SimpleGrid columns={2} spacing={"1em"}>
          {
            audioProfiles.map((i: string) => {
              const label = audioProfileToLabel[i]

              return (
                <BlockButton width="15em" height="6em" label={label} tooltipDisabled onClick={() => store.setAudioProfile(i)} selected={store.audioProfile === i} key={i} />
              )
            })
          }
        </SimpleGrid>
      </Center>
    </>
  )
}

export default React.memo(AudioProfileSelection)
