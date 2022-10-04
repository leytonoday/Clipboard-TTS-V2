import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
// @ts-ignore
import Loading from "renderer/assets/loading.gif"
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useStore } from "renderer/store";

interface LoadedImageProps {
  src: string,
  width: string,
  height: string,

  loaderWidth: string,
  loaderHeight: string,
}

const LoadedImage = (props: LoadedImageProps) => {
  const [loaded, setLoaded] = useState(false)
  const store = useStore()

  return (
    <Box width={props.width} height={props.height} display="flex" justifyContent="center" alignItems="center">
      <Image
        onDragStart={(e) => e.preventDefault() }
        src={props.src}
        onLoad={() => setLoaded(true)}
        style={{ borderRadius: "0.25em", width: "100%", height: "100%", display: loaded ? "block" : "none" }}
      />
      {
        loaded ? null : (
          <ScaleLoader color={store.accent} loading={true} width={props.loaderWidth} height={props.loaderHeight} />
        )
      }
    </Box>
  )
}

export default LoadedImage;
