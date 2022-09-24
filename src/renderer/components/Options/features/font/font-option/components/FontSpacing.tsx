import { Box, HStack }  from "@chakra-ui/react";
import { useStore }     from "renderer/store";
import SimpleSelect     from "renderer/components/common/SimpleSelect";
import OptionSubHeader  from "renderer/components/options/common/OptionSubHeader"

const FontSpacing = () => {
  const store = useStore();

  const onChange = (newValue: any) => {
    store.setFontSpacing(newValue.value);
  }

  return (
    <HStack justifyContent={"space-between"}>
      <OptionSubHeader includePadding title="Font Spacing" info="Changes the space between each character. Increase for more space, decrease for less." />
      <br />
      <Box paddingRight="1em">
        <SimpleSelect width="7em" value={store.fontSpacing} onChange={onChange} size="sm" options={
          Array.from({length: 6}).map((_, index) => {
            const value = index === 0 ? "Default" : `${(index * 2).toString()}px`
            return {
              label: value,
              value
            }
          })}
        />
      </Box>
    </HStack>
  )
}

export default FontSpacing;
