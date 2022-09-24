import FontOutput       from "../common/FontOutput"
import FontSpacing      from "./components/FontSpacing"
import OptionHeader     from "../../../common/OptionHeader"
import FontSelection    from "./components/FontSelection"
import FontSizeSlider   from "./components/FontSizeSlider"
import { Box, Divider } from "@chakra-ui/react"

const FontOption = () => {

  return (
    <Box>
      <OptionHeader
        title="Font"
        subtitle="Here you can change the font and font size of the application"
      />

      <FontOutput />

      <Divider margin="1em 0" />

      <FontSizeSlider />

      <Divider margin="1em 0" />

      <FontSpacing />

      <Divider margin="1em 0" />

      <FontSelection />

    </Box>
  )
}

export default FontOption
