import { Tabs, TabPanels, TabPanel, Button, HStack }              from '@chakra-ui/react';
import SpeakingRateSlider   from "../common/SpeakingRateSlider"
import VolumeGainDbSlider   from "../common/VolumeGainDbSlider"
import SampleRateSlider     from "../common/SampleRateSlider"
import SpeakingPitchSlider  from "../common/SpeakingPitchSlider"
import { useState } from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStore } from 'renderer/store';

const AudioConfigOptionPreview = () => {
  const store = useStore()
  const [tabIndex, setTabIndex] = useState(store.previewTabIndex)
  const tabCount = 4

  const decrementTabIndex = () => {
    if (tabIndex > 0) {
      setTabIndex(tabIndex - 1)
      store.setPreviewTabIndex(tabIndex - 1)
    }
  }

  const incrementTabIndex = () => {
    if (tabIndex < tabCount - 1) {
      setTabIndex(tabIndex + 1)
      store.setPreviewTabIndex(tabIndex + 1)
    }
  }

  return (
    <>

      <HStack width="100%" spacing={0}>
        <Button size="sm" variant="ghost" onClick={() => decrementTabIndex()} disabled={tabIndex === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>

        <Tabs index={tabIndex} flex={1}>
          <TabPanels>
            <TabPanel>
              <SpeakingRateSlider orientation="horizontal"/>
            </TabPanel>
            <TabPanel>
              <VolumeGainDbSlider orientation="horizontal"/>
            </TabPanel>
            <TabPanel>
              <SampleRateSlider orientation="horizontal"/>
            </TabPanel>
            <TabPanel>
              <SpeakingPitchSlider orientation="horizontal" />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Button size="sm" variant="ghost" onClick={() => incrementTabIndex()} disabled={tabIndex === tabCount - 1}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
      </HStack>

    </>
  )
}

export default AudioConfigOptionPreview;
