import { VStack, Center, Image } from "@chakra-ui/react";
// @ts-ignore
import NoResultsMascotGif from "renderer/assets/mascot-no-results.gif"

const NoResultsMascot = () => {
  return (
    <VStack justifyContent="center" alignItems="center">
      <Center marginBottom="-3em">
        No results
      </Center>
      <Image onDragStart={(e) => e.preventDefault() } src={NoResultsMascotGif} height="15em" width="15em" />
    </VStack>
  )
}

export default NoResultsMascot;
