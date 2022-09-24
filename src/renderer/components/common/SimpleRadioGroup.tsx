import { RadioGroup, Radio, HStack, Box, Center, Heading } from "@chakra-ui/react"

interface SimpleRadioOption {
  name: string
  value: string
}

interface SimpleRadioGroupProps {
  title: string,
  value: any,
  options: SimpleRadioOption[],
  onChange: (input: any) => void,
  disabled: boolean
}

const SimpleRadioGroup = (props: SimpleRadioGroupProps) => {
  return (
    <>
      <Center marginBottom="0.5em">
        <Heading size="sm">
          {props.title}
        </Heading>
      </Center>
      <RadioGroup isDisabled={props.disabled} defaultValue={props.value}>
        <HStack justifyContent="space-evenly">
          {
            props.options.map((option, i) =>
              <Radio key={i} value={option.value}>
                {option.name}
              </Radio>
            )
          }
        </HStack>
      </RadioGroup>
    </>
  )
}

export default SimpleRadioGroup
