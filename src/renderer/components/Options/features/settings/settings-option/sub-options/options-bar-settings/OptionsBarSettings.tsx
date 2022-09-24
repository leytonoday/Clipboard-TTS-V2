import { useStore }       from 'renderer/store';
import SimpleSwitch       from "renderer/components/common/SimpleSwitch"
import ReorderOptions     from './components/ReorderOptions';
import SubOptionHeader    from 'renderer/components/options/common/SubOptionHeader';
import { Box, Divider }   from '@chakra-ui/react';
import OptionBarPosition  from './components/OptionBarPosition';

const OptionsBarSettings = () => {
  const store = useStore();

  return (
    <Box>
      <SubOptionHeader
        title="Options Bar"
        subtitle="Enable or disable previews, re-order options and configure the options bar position"
      />

      <SimpleSwitch label="Option Previews" isChecked={store.optionPreviewsEnabled} setChecked={store.setOptionPreviewsEnabled}
        info="Enables previews for all options. Previews are shown when you hover over an option, and provide a quick way to change option settings." />

      <Divider margin="1em 0" />

      <ReorderOptions />

      <Divider margin="1em 0" />

      <OptionBarPosition />
    </Box>
  );
};

export default OptionsBarSettings;
