import { SimpleGrid, Box } from "@chakra-ui/react"
import { colours } from "renderer/misc/data"
import ColorBlock from "./ColourBlock"
import React from "react"
import SimpleTooltip from "renderer/components/common/SimpleTooltip";

interface ColourBlockGridProps {
  blockSize: string,
  disabled: (colour: string) => boolean,
  selected: (colour: string) => boolean,
  onClick: (input: any) => void,
  popoverLabel: (input: any) => string,
  showColourLabel: boolean
  columns: number
}

const ColourBlockGrid = (props: ColourBlockGridProps) => {
  return (
    <SimpleGrid columns={props.columns} spacing="1.25em 1em">
      {
        colours.map(i => {
          return (
            <SimpleTooltip key={i} label={props.popoverLabel(i)}>
              <Box onClick={() => {
                if (!props.disabled(i))
                  props.onClick(i)
                }} >
                <ColorBlock disabled={props.disabled(i)} size={props.blockSize} color={i} selectable selected={props.selected(i)} />
                {
                  props.showColourLabel ? <p style={{textAlign: "center", marginTop: "0.5em"}}>{i}</p> : null
                }
              </Box>
            </SimpleTooltip>
          )
        })
      }
    </SimpleGrid>
  )
}

export default React.memo(ColourBlockGrid);
