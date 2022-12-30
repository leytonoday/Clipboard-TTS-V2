import React                                  from 'react';
import { Box }                                from '@chakra-ui/react';
import OptionsBar                             from '../../components/options/OptionsBar';
import { useStore }                           from 'renderer/store';
import WhatsNewModal                          from 'renderer/components/WhatsNewModal';
import DragAndDropModal                       from 'renderer/components/DragAndDropModal';
import OutputBoxWrapper                       from './components/OutputBoxWrapper';
import CredentialsAlert                       from 'renderer/components/CredentialsAlert';
import ComplexOptionModal                     from '../../components/options/ComplexOptionModal';
import { useOnboarding, useTextToSpeech }     from 'renderer/hooks';
import { optionsBarPositionToflexDirection }  from 'renderer/utils';

const Home: React.FC = () => {
  const store = useStore();
  let { outputText, preTranslatedText, detectedLanguage } = useTextToSpeech();
  useOnboarding();

  return (
    <>
      <DragAndDropModal />
      <ComplexOptionModal />
      <WhatsNewModal />

      {!store.apiKey && (<CredentialsAlert />)}

      <Box display="flex" flexDirection={optionsBarPositionToflexDirection()} height="100%" maxHeight="100%" overflowY="auto">
        <OptionsBar />

        <OutputBoxWrapper outputText={outputText} preTranslatedText={preTranslatedText} detectedLanguage={detectedLanguage}/>
      </Box>
    </>
  );
};

export default React.memo(Home);
