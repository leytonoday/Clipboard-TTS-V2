import { Box, Center, ScaleFade, useColorModeValue, VStack } from "@chakra-ui/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useStore } from "renderer/store";

const LoadingCircle = () => {
  const store = useStore();
  const loadingBackground = useColorModeValue("#EEEEEE", '#171717')

  return (
    <VStack width="100%" height="100%" position="absolute" justifyContent="center" alignItems="center" zIndex="1">
      <ScaleFade in={true} initialScale={0.6}>
        <Box display="flex" justifyContent="center" alignItems="center" width="150px" height="150px" borderRadius="full"
          backdropFilter='blur(10px)' bg={`${loadingBackground}`}
          boxShadow="0px 0px 20px 0px rgba(0,0,0,0.3)"
        >
          <ScaleLoader color={store.accent} loading={true} width="10px" height="100px" />
        </Box>
        <Center>
          <Box boxShadow="0px 0px 20px 0px rgba(0,0,0,0.3)" textAlign="center" bg={`${loadingBackground}`} color={useColorModeValue("#313131", '#EEEEEE')} borderRadius="0.25em" width="fit-content" padding="0.25em 0.5em" marginTop="0.5em">
            Loading...
          </Box>
        </Center>
      </ScaleFade>
    </VStack>
  )
}

export default LoadingCircle;
