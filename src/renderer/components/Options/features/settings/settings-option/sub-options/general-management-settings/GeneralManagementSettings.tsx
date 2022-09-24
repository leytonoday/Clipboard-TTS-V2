import { Box, Divider, VStack }          from '@chakra-ui/react';
import Pricing          from '../general-management-settings/components/Pricing'
import Credentials      from './components/Credentials';
import CharacterLimit   from '../../../common/CharacterLimit';
import SubOptionHeader  from 'renderer/components/options/common/SubOptionHeader';
import OrderOfMutations from './components/OrderOfMutations';
import FactoryDataReset from './components/FactoryDataReset';
import SimpleSwitch from 'renderer/components/common/SimpleSwitch';
import { useStore } from 'renderer/store';

const GeneralManagementSettings = () => {
  const store = useStore();

  return (
    <Box>
      <SubOptionHeader
        title="General Management"
        subtitle="General settings and management"
      />

      <VStack spacing="1.5em">
        <SimpleSwitch label="Tooltips" isChecked={store.tooltipsEnabled} setChecked={store.setTooltipsEnabled}
          info="Enables tooltips for all buttons and options. This is useful for users who are new to the application." />
        <SimpleSwitch label="Output Linger" isChecked={store.outputLingerEnabled} setChecked={store.setOutputLingerEnabled}
          info="Prevents the output from being cleared once the speech has finished. You can then replay or download the audio."
          warning="Any settings that were in place on the initial output will be applied to the replayed output. For example,
          if the volume was quiet on the initial output, the replayed output will also be quiet in volume, regardless of if you've turned it up.
          In this case, you have to copy the text again to hear it

          Another example is if this is enabled mid-speech, the output will linger but you won't have the option to replay or download the audio.
          In this case, you have to copy the text again to see the download and replay buttons." />
        <SimpleSwitch
          isChecked={store.shortcutsEnabled}
          setChecked={store.setShortcutsEnabled}
          label="Enable shortcuts"
          info="Enables shortcuts. For a list of shortcuts, see Settings > Help > Shortcuts"
        />
      </VStack>

      <Divider margin="1.5em 0 1em 0" />

      <CharacterLimit />

      <OrderOfMutations />

      <Pricing />

      <Credentials />

      <FactoryDataReset />

    </Box>
  );
};

export default GeneralManagementSettings;
