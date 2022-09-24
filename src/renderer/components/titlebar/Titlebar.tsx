import { Box, Spacer, HStack, useColorModeValue } from "@chakra-ui/react"
import { titlebarControl } from "renderer/utils"
import { useEffect, useState } from "react"
import "./Titlebar.css"

const Titlebar = () => {
  const backgroundColour = useColorModeValue("#EEEEEE", '#171717')
  const hoverColour = useColorModeValue('#FBFBFB', '#404040')
  const fillColour = useColorModeValue("#313131", '#EEEEEE')
  const [isMaximized, setIsMaximized] = useState(titlebarControl("isMaximized"))

  useEffect(() => {
    window.addEventListener("resize", () => {
      const isMaximized = titlebarControl("isMaximized")
      setIsMaximized(isMaximized)
    })
    return () => {
      window.removeEventListener("resize", () => {})
    }
  }, [])

  return (
    <>
      <Box position="fixed" height="30px" background={backgroundColour} width="100%" className="titlebar" zIndex={100000} fill={fillColour}>
        <HStack flexDirection="row" height="100%">
          <Box fontSize="12px" display="flex" alignItems="center" marginLeft="16px" height="100%">
            Clipboard TTS
          </Box>
          <Spacer />
          <HStack height="100%" spacing="0">
            <Box className="titlebarButton" onClick={() => titlebarControl("minimize")} _hover={{background: hoverColour}} transition="0.2s all ease">
              <svg width="11" height="1" viewBox="0 0 11 1">
                <path d="m11 0v1h-11v-1z" strokeWidth=".26208" />
              </svg>
            </Box>
            <Box className="titlebarButton" onClick={() => titlebarControl("maximize")} _hover={{background: hoverColour}} transition="0.2s all ease">
              {
                isMaximized ? (
                  <svg width="11" height="11" viewBox="0 0 11 11">
                    <path d="m11 8.7978h-2.2021v2.2022h-8.7979v-8.7978h2.2021v-2.2022h8.7979zm-3.2979-5.5h-6.6012v6.6011h6.6012zm2.1968-2.1968h-6.6012v1.1011h5.5v5.5h1.1011z" strokeWidth=".275" />
                  </svg>
                ): (
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="m10-1.6667e-6v10h-10v-10zm-1.001 1.001h-7.998v7.998h7.998z" strokeWidth=".25" />
                  </svg>
                )
              }
            </Box>
            <Box onClick={() => titlebarControl("close")} className="titlebarButton" _hover={{background: "red", fill: "white"}} transition="0.2s all ease">
              <svg width="11" height="11" viewBox="0 0 12 12">
                <path d="m6.8496 6 5.1504 5.1504-0.84961 0.84961-5.1504-5.1504-5.1504 5.1504-0.84961-0.84961 5.1504-5.1504-5.1504-5.1504 0.84961-0.84961 5.1504 5.1504 5.1504-5.1504 0.84961 0.84961z" strokeWidth=".3" />
              </svg>
            </Box>
          </HStack>
        </HStack>
      </Box>
    </>
  )
}

export default Titlebar;
