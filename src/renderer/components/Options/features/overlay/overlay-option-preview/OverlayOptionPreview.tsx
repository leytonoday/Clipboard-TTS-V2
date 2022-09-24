import Overlay                        from '../common/Overlay';
import { useStore }                   from 'renderer/store';
import AutoTextColour                 from '../common/AutoTextColour';
import ColourBlockGrid                from "renderer/components/common/colour-block/ColourBlockGrid"
import { Divider, Center, Collapse }  from "@chakra-ui/react"

const OverlayOptionPreview = () => {
  const store =  useStore()

  return (
    <>
      <Collapse in={store.overlayEnabled} animateOpacity>
        <Center marginTop="0.75em">
          <ColourBlockGrid
            columns={4}
            blockSize={"3em"}
            disabled={(colour) => !store.overlayEnabled || colour === store.currentHighlight}
            selected={(colour) => store.currentOverlay === colour}
            onClick={store.setCurrentOverlay}
            showColourLabel={false}
            popoverLabel={(colour) => store.currentHighlight === colour ? "Same as highlight colour, thus disabled" : colour}
          />
        </Center>

        <Divider margin="1em 0 1.25em 0" />

        <AutoTextColour />

        <br />
      </Collapse>

      <Overlay />
    </>
  )
}

export default OverlayOptionPreview;
