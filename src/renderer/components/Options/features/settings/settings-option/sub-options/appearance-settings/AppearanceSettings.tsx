import { Divider }      from "@chakra-ui/react"
import AccentPicker     from "renderer/components/options/features/settings/common/AccentPicker";
import ThemeSettings    from "./components/ThemeSettings";
import SubOptionHeader  from "renderer/components/options/common/SubOptionHeader";

const AppearanceSettings = () => {
  return (
    <>
      <SubOptionHeader title="Appearance" subtitle="Configure theme and accent colour" />

      <AccentPicker />

      <Divider margin="1em 0" />

      <ThemeSettings />

    </>
  );
}

export default AppearanceSettings;
