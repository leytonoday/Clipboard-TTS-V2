import { Box }                  from '@chakra-ui/react';
import { useStore }             from 'renderer/store';
import SimpleSlider             from 'renderer/components/common/SimpleSlider';
import { useCallback, useMemo } from 'react';

interface SpeakingRateSliderProps {
  orientation: 'horizontal' | 'vertical';
}

const SpeakingRateSlider = (props: SpeakingRateSliderProps) => {
  const store = useStore();

  // SPEAKING RATE
  const onSpeakingRateChange = useCallback((value: number) => {
    store.setSpeakingRate(value);
  }, []);

  const speakingRateMarks = useMemo(() => {
    return [
      { label: '.25x', value: 0.25 },
      { label: '1x', value: 1 },
      { label: '2x', value: 2 },
      { label: '3x', value: 3 },
      { label: '3.75x', value: 3.75 },
    ];
  }, []);

  return (
    <Box margin="0 1em" height="100%">
      <SimpleSlider
        label={'Speaking Rate'}
        size={'md'}
        labelSize={"sm"}
        orientation={props.orientation}
        info="The speaking rate of the Text-to-Speech. This is the speed at which the text is spoken."

        min={0.25}
        max={3.75}
        step={0.25}

        showLabel={true}
        onChange={onSpeakingRateChange}
        value={store.speakingRate}
        marks={speakingRateMarks}
      />
    </Box>
  );
};

export default SpeakingRateSlider;