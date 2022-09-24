import {
  Divider,
  Center,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react';
import Highlight        from '../common/Highlight';
import OptionHeader     from "../../../common/OptionHeader"
import { useStore }     from 'renderer/store';
import SimpleSwitch     from "renderer/components/common/SimpleSwitch"
import ColourPicker     from "renderer/components/common/ColourPicker"
import AutoTextColour   from '../common/AutoTextColour';
import ColourBlockGrid  from "renderer/components/common/colour-block/ColourBlockGrid"
import OptionSubHeader  from "renderer/components/options/common/OptionSubHeader"

const HighlightOption = () => {
  const store = useStore()
  const colorBlockSize = useBreakpointValue({ md: "3.5em", lg: "4em", xl: "4.5em", "2xl": "5em" }) as string;

  return (
    <>
      <OptionHeader
        title="Highlight"
        subtitle="Here you can configure the highlight text to improve text visability"
      />

      <VStack spacing="1.5em">
        <Highlight />

        <AutoTextColour />

        <SimpleSwitch
          label="Live Highlight"
          isChecked={store.liveHighlightEnabled}
          setChecked={store.setLiveHighlightEnabled}
          info="Highlighting is achieved using SSML mark tags, which wrap each sentence. If enabled, this will ensure that these SSML tags are always sent along with the
          copied text to the Google Cloud Text-To-Speech API, so that you can enable highlighting on-the-fly, and the highlight will be applied to the text that is
          currently being read out. If disabled, SSML tags will only be sent when highlighting is enabled, and thus on-the-fly highlighting will not work. If disabled,
          you must enable highlighting before copying text to the clipboard to see highlighting applied."
          warning="The SSML mark tags add characters to your text, which increases the length
          of your request to the Google Cloud Text-to-Speech API. To avoid incurring extra costs, we recommend that you disable this feature if you don't want
          on-the-fly highlighting."
        />
      </VStack>



      <Divider margin="1em 0" />

      <OptionSubHeader includePadding title='Available Highlight Colours' />
      <br />

      <Center>
        <ColourBlockGrid
          columns={6}
          blockSize={colorBlockSize}
          disabled={(colour) => !store.highlightEnabled || colour === store.currentOverlay}
          selected={(colour) => store.currentHighlight === colour}
          onClick={store.setCurrentHighlight}
          showColourLabel={true}
          popoverLabel={(colour) => store.currentOverlay === colour ? "Same as overlay colour, thus disabled" : ""}
        />
      </Center>

      <Divider margin="1em 0" />

      <OptionSubHeader includePadding title='Custom Highlight' />
      <br />

      <Center>
        <ColourPicker colour={store.currentHighlight} onChange={store.setCurrentHighlight} disabled={!store.highlightEnabled} />
      </Center>

    </>
  )
}

export default HighlightOption
