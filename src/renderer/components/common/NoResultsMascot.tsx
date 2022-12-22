import { VStack, Center, Image } from "@chakra-ui/react";
// @ts-ignore
import NoResultsMascotGif from "renderer/assets/mascot-no-results.png"

const NoResultsMascot = () => {
  return (
    <VStack justifyContent="center" alignItems="center">
      <Center marginBottom="-2em">
        No results
      </Center>
      <Image onDragStart={(e) => e.preventDefault() } src={NoResultsMascotGif} height="auto" width="15em" />
    </VStack>
  )
}

export default NoResultsMascot;
