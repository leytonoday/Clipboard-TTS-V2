import { useStore }               from "renderer/store"
import { Box, useColorModeValue } from "@chakra-ui/react"

const FontOutput = () => {
  const store = useStore();

  return (
    <Box width="100%" letterSpacing={store.fontSpacing} fontSize={`${store.fontSize}em`} fontFamily={store.font}>
      <Box wordBreak="break-word" display="flex" justifyContent="center" alignItems="center" textAlign="center" bg={useColorModeValue('#FBFBFB', '#404040')} margin="0 1em" padding="1em 0.5em" borderRadius="0.5em">
        Output text will look like this
        <br />
        1234567890!#%&*()_+.=
      </Box>
    </Box>
  )
}

export default FontOutput;
