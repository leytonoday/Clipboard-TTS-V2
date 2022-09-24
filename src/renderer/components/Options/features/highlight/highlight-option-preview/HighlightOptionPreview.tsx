import Highlight                      from "../common/Highlight";
import { useStore }                   from 'renderer/store';
import AutoTextColour                 from "../common/AutoTextColour";
import ColourBlockGrid                from "renderer/components/common/colour-block/ColourBlockGrid"
import { Divider, Center, Collapse }  from "@chakra-ui/react"

const HighlightOptionPreview = () => {
  const store =  useStore()

  return (
    <>
      <Collapse in={store.highlightEnabled} animateOpacity>
        <Center marginTop="0.75em">
          <ColourBlockGrid
            columns={4}
            blockSize={"3em"}
            disabled={(colour) => !store.highlightEnabled || colour === store.currentOverlay}
            selected={(colour) => store.currentHighlight === colour}
            onClick={store.setCurrentHighlight}
            showColourLabel={false}
            popoverLabel={(colour) => store.currentOverlay === colour ? "Same as overlay colour, thus disabled" : colour}
          />
        </Center>

        <Divider margin="1em 0 1.25em 0" />

        <AutoTextColour />

        <br />
      </Collapse>

      <Highlight />

    </>
  )
}

export default HighlightOptionPreview;
