import { Divider } from "@chakra-ui/react";
import OptionHeader from "renderer/components/options/common/OptionHeader";
import SpellCheck from "../common/SpellCheck";
import Exceptions from "./components/Exceptions";

const SpellingOption = () => {
  return (
    <>
      <OptionHeader
        title="Spell Check"
        subtitle="Here you can configure the spell checker"
      />

      <SpellCheck />

      <Divider margin="1em 0" />

      <Exceptions />


    </>
  )
}

export default SpellingOption;
