import {
  Box,
  Image,
  Radio,
  chakra,
  VStack,
  useRadio,
} from "@chakra-ui/react";

interface ThemeCardProps {
  image: string,
  label: string,
  radioProps: any
}

const ThemeCard = (props: ThemeCardProps) => {
  const { image, ...radioProps } = props
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useRadio(radioProps.radioProps)

  return (
    <chakra.label {...htmlProps} cursor='pointer'>
      <input {...getInputProps({})} hidden />
      <Box
        {...getCheckboxProps()}
        borderRadius="0.3em"
      >
        <VStack alignItems="center">
          <Image src={image} {...getLabelProps()} width="10em" border={`1px solid grey`} borderTopRadius="0.3em"/>
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
            <Radio isChecked={state.isChecked} {...getLabelProps()}>
              {props.label}
            </Radio>
          </Box>
        </VStack>
      </Box>
    </chakra.label>
  )
}

export default ThemeCard;
