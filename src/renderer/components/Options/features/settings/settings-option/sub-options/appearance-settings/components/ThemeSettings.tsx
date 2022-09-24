import { Theme }                                from "renderer/types";
import ThemeCard                                from "./ThemeCard";
import { useStore }                             from "renderer/store";
import OptionSubHeader                          from "renderer/components/options/common/OptionSubHeader"
import { HStack, useRadioGroup, useColorMode }  from "@chakra-ui/react"

import darkThemePreview from "renderer/assets/darkThemePreview.svg"
import lightThemePreview from "renderer/assets/lightThemePreview.svg"

const ThemeSettings = () => {
  const store = useStore();
  const { setColorMode } = useColorMode();

  const handleChange = (value: Theme) => {
    store.setTheme(value)
    setColorMode(value.toLowerCase())
  };

  const { getRadioProps, getRootProps } = useRadioGroup({ defaultValue: store.theme, onChange: handleChange })

  return (
    <>
      <OptionSubHeader includePadding title="Theme" />

      <HStack {...getRootProps()} spacing="1em" margin="1em">
        <ThemeCard key="DARK" label="Dark" radioProps={{...getRadioProps({ value: "DARK" })}} image={darkThemePreview} />
        <ThemeCard key="LIGHT" label="Light" radioProps={{...getRadioProps({ value: "LIGHT" })}} image={lightThemePreview} />
      </HStack>
    </>
  )
}

export default ThemeSettings;
