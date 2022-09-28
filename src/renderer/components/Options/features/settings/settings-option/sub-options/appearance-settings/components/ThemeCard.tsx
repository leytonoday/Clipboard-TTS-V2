import {
  Box,
  Image,
  Radio,
  chakra,
  VStack,
  useRadio,
} from "@chakra-ui/react";
import { useStore } from "renderer/store"

interface ThemeCardProps {
  image: string,
  label: string,
  radioProps: any
}

const ThemeCard = (props: ThemeCardProps) => {
  const { image, ...radioProps } = props
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useRadio(radioProps.radioProps)
  const store = useStore()

  return (
    <chakra.label {...htmlProps} cursor='pointer'>
      <input {...getInputProps({})} hidden />
      <Box
        {...getCheckboxProps()}
        borderRadius="0.3em"
      >
        <VStack alignItems="center"  {...getLabelProps()}>
          <Image onDragStart={(e) => e.preventDefault() } src={image} width="10em" border={`1px solid grey`} borderTopRadius="0.3em"/>
          <Box
            width="10em"
            height="2em"
            display="flex"
            paddingLeft="0.5em"
            justifyContent="start"
            alignItems="center"
            marginTop="0 !important"
            border={`1px solid grey`}
            borderTop={"none"}
            borderBottomRadius="0.3em"
          >
            <Box
              transition="0.3s ease all"
              width="15px"
              height="15px"
              borderRadius="full"
              border={`${state.isChecked ? "5px": "1px"} solid ${store.accent}`}
              marginRight="0.5em"
              display="flex"
              justifyContent="center"
              alignItems="center" />
            {props.label}
          </Box>
        </VStack>
      </Box>
    </chakra.label>
  )
}

export default ThemeCard;
