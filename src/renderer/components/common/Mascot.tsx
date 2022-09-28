import { VStack, Center, Image } from "@chakra-ui/react";
// @ts-ignore
import MascotPng from "renderer/assets/mascot.png"

interface MascotProps {
  label: string
}

const Mascot = (props: MascotProps) => {
  return (
    <VStack justifyContent="center" alignItems="center">
      <Center marginBottom="0.5em">
        {
          props.label
        }
      </Center>
      <Image onDragStart={(e) => e.preventDefault() } src={MascotPng} height="auto" width="15em" />
    </VStack>
  )
}

export default Mascot;
