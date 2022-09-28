import {
  VStack,
  Center,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';
import Overlay          from '../common/Overlay';
import { useStore }     from 'renderer/store';
import ColourPicker     from "renderer/components/common/ColourPicker"
import OptionHeader     from "../../../common/OptionHeader"
import AutoTextColour   from '../common/AutoTextColour';
import ColourBlockGrid  from "renderer/components/common/colour-block/ColourBlockGrid"
import OptionSubHeader  from "renderer/components/options/common/OptionSubHeader"

const OverlayOption = () => {
  const store =  useStore()
  const colorBlockSize = useBreakpointValue({ md: "3.5em", lg: "4em", xl: "4.5em", "2xl": "5em" }) as string;

  return (
    <>
      <OptionHeader
        title="Overlay"
        subtitle="Here you can apply a colour overlay to the output box to improve text visability"
      />

      <VStack spacing="1.5em">
        <Overlay />
        <AutoTextColour />
      </VStack>

      <Divider margin="1em 0" />

      <OptionSubHeader includePadding title='Available Overlays' />
      <br />

      <Center>
        <ColourBlockGrid
          columns={6}
          blockSize={colorBlockSize}
          disabled={(colour) => !store.overlayEnabled || colour === store.currentHighlight}
          selected={(colour) => store.currentOverlay === colour}
          onClick={store.setCurrentOverlay}
          showColourLabel={true}
          popoverLabel={(colour) => store.currentHighlight === colour ? "Same as highlight colour" : ""}
        />
      </Center>

      <Divider margin="1em 0" />

      <OptionSubHeader includePadding title='Custom Overlay' />
      <br />

      <Center>
        <ColourPicker colour={store.currentOverlay} onChange={store.setCurrentOverlay} disabled={!store.overlayEnabled} />
      </Center>

    </>
  )
}

export default OverlayOption
