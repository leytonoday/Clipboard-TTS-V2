import {
  Box,
  Modal,
  Button,
  Center,
  HStack,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalCloseButton,
  useColorModeValue,

  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,

  Td,
  Th,
  Tr,
  Thead,
  Tbody,
  Table,
  TableContainer,
  Image,
  useToast
} from '@chakra-ui/react';
import {
  translate,
  getFlagUrl,
  isApiKeySet,
  getVoiceType,
  getBase64Audio,
  debuggingOutput,
  getVoiceCountryCode,
  countryCodeToCountry,
  getVoiceLanguageCode,
} from "renderer/utils";
import Mascot                                                       from 'renderer/components/common/Mascot';
import SearchBar                                                    from "renderer/components/common/SearchBar"
import { useStore }                                                 from "renderer/store"
import SimpleTooltip                                                from "renderer/components/common/SimpleTooltip"
import NoResultsMascot                                              from "renderer/components/common/NoResultsMascot"
import OptionSubHeader                                              from "renderer/components/options/common/OptionSubHeader"
import { FontAwesomeIcon }                                          from "@fortawesome/react-fontawesome"
import { faPlay, faCheck }                                          from "@fortawesome/free-solid-svg-icons"
import React, { useState, useRef, useEffect, useMemo }              from "react"
import { TextToSpeechVoices, TextToSpeechVoice, VoiceType }         from "renderer/types"
import IconPopover                                                  from "renderer/components/common/IconPopover"


const searchVoices = (voices: TextToSpeechVoices, searchQuery: string, voiceType: VoiceType | null = null) => {
  const searchedVoices: TextToSpeechVoices = {};

  Object.keys(voices).forEach((language) => {
    voices[language].forEach(voice => {
      const languageDescription = voice.languageDescriptions[0].toLowerCase()
      const languageName = voice.name

      if ((searchQuery === "" || languageDescription.includes(searchQuery.toLowerCase())) && (voiceType === null || languageName.includes(voiceType))) {
        if (searchedVoices[language] === undefined)
          searchedVoices[language] = []
        searchedVoices[language].push(voice)
      }
    })

  });

  return searchedVoices;
};

const playVoiceTest = async (voiceName: string, voiceGender: string) => {
  debuggingOutput(useStore.getState().languageOptionDebuggingOutput, "languageOptionDebuggingOutput", `Playing voice test for ${voiceName}, ${voiceGender}`)

  const targetLanguageCode = voiceName.substring(0, voiceName.indexOf("-"))

  const base64Audio = await getBase64Audio({
    input: targetLanguageCode === "en" ? "This is an example sentence": (await translate("This is an example sentence", targetLanguageCode, "en")).text,
    voice: { name: voiceName, languageCode: getVoiceLanguageCode(voiceName), ssmlGender: voiceGender },
  }) as string
  const audio = new Audio(base64Audio);
  audio.play()
}



const isLanguageSelected = (language: string, voiceType: VoiceType) => {
  const store = useStore.getState()
  const currentVoice = store.voice;
  return currentVoice.languageDescriptions.includes(language) && currentVoice.name.includes(voiceType)
}
const isVoiceSelected = (voice: TextToSpeechVoice) => {
  const store = useStore.getState()
  const currentVoice = store.voice;
  return currentVoice.name === voice.name
}



// Language Tabs Functions
const getLanguageTabNames = (searchQuery: string): string[] => {
  const store = useStore.getState()
  const allVoices = searchVoices(store.availableVoices, searchQuery)
  const tabs: string[] = []

  for (const language of Object.keys(allVoices)) {
    for(const voice of allVoices[language]) {
      const voiceType = getVoiceType(voice.name)

      if (!tabs.includes(voiceType))
      tabs.push(voiceType)
    }
  }

  return tabs.sort()
}
const getLanguageTabList = (tabNames: string[], tabTextColour: string): React.ReactNode => {
  return (
    <TabList>
      {
        tabNames.map((tab) => (
          <Tab key={tab} color={tabTextColour} _selected={{ background: "primary.200", color: "white" }}>
            {tab}
            {
              tab === "Neural2" ? (
                <span style={{marginLeft: "0.5em", fontWeight: "normal", color: tabTextColour, cursor: "default"}}><IconPopover status='warning' content="As of right now, highlighting is not supported when using a Neural2 voice" /></span>
              ) : null
            }
          </Tab>
        ))
      }
    </TabList>
  )
}



// Voice Tabs Functions
const getVoiceTabList = (selectedLanguageVoices: TextToSpeechVoice[], tabTextColour: string) => {
  const tabs = [... new Set(selectedLanguageVoices.map(voice => voice.ssmlGender))].sort()

  return (
    <TabList>
      {
        tabs.map((tab) => (
          <Tab key={tab} color={tabTextColour} _selected={{ background: "primary.200", color: "white"  }}>
            {tab}
          </Tab>
        ))
      }
    </TabList>
  )
}
const getVoiceTabPanels = (selectedLanguageVoices: TextToSpeechVoice[], currentVoiceElement: React.RefObject<HTMLTableRowElement>, rowHoverColour: string) => {
  const store = useStore.getState()

  const genders = [... new Set(selectedLanguageVoices.map(voice => voice.ssmlGender))].sort()

  // one array for each gender
  const voicedByGender: TextToSpeechVoice[][] = []

  // Group voices by gender. Make one array per gender
  genders.map((gender, index) => {
    selectedLanguageVoices.map(voice => {
      if (voice.ssmlGender === gender) {
        if (voicedByGender[index] === undefined)
          voicedByGender[index] = []
        voicedByGender[index].push(voice)
      }
    })
  })

  return (
    <TabPanels>
      {
        voicedByGender.map((gender, index) => (
          <TabPanel key={index}>
            <TableContainer overflowX="hidden">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Flag</Th>
                    <Th>Language</Th>
                    <Th>Name</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    gender.map((voice, index) => (
                      <Tr
                        key={index}
                        cursor="pointer"
                        onClick={() => {
                          debuggingOutput(store.languageOptionDebuggingOutput, "languageOptionDebuggingOutput", `Voice set to: ${JSON.stringify(voice, null, 2)}`)
                          store.setVoice({...voice})}
                        }
                        ref={isVoiceSelected(voice) ? currentVoiceElement : null}
                        _hover={{
                          backgroundColor: rowHoverColour,
                        }}
                      >
                        <Td>
                          <Center>
                            <SimpleTooltip label={countryCodeToCountry(getVoiceCountryCode(voice.name))}>
                              <Box minWidth="4em" display="flex" justifyContent="center" alignItems="center">
                                <Image onDragStart={(e) => e.preventDefault() } src={getFlagUrl(getVoiceCountryCode(voice.name))} style={{ borderRadius: "0.25em", width: "100%", height: "2.5em"}} />
                              </Box>
                            </SimpleTooltip>
                          </Center>
                          <Box maxHeight="2em">
                          </Box>
                        </Td>
                        <Td whiteSpace={"normal"}>
                          { voice.languageDescriptions.join(", ") }
                        </Td>
                        <Td>
                          { voice.name }
                          {
                            isVoiceSelected(voice) && (
                              <FontAwesomeIcon icon={faCheck} style={{ marginLeft: "1em", color: "green", fontSize: "1.25em" }} />
                            )
                          }
                        </Td>
                        <Td>
                          <SimpleTooltip label={"Play test"}>
                            <Button borderRadius="100%" fontSize="0.75em" onClick={(e) => { playVoiceTest(voice.name, voice.ssmlGender); e.stopPropagation() }}>
                              <FontAwesomeIcon icon={faPlay} />
                            </Button>
                          </SimpleTooltip>
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        ))
      }

    </TabPanels>
  )

}

const VoiceSelection = () => {

  const getVoiceTabIndex = () => {
    const voice = store.voice
    const voiceTabIndex = [... new Set(store.availableVoices[voice.languageDescriptions[0]].map(voice => voice.ssmlGender))].sort().findIndex((gender: string) => gender === voice.ssmlGender)
    return voiceTabIndex
  }

  const getLanguageTabIndex = () => {
    const voice = store.voice
    const languageTabs = getLanguageTabNames("")
    const languageTabIndex: number = languageTabs.findIndex((tab: string) => voice.name.includes(tab))
    return languageTabIndex;
  }

  // Hooks
  const store = useStore()
  const toast = useToast()

  // State
  const [ selectedLanguageVoices, setSelectedLanguageVoices ] = useState<TextToSpeechVoice[]>([]);
  const [ selectedLanguage, setSelectedLanguage ]             = useState("");
  const [ languageTabIndex, setLanguageTabIndex ]             = useState(getLanguageTabIndex());
  const [ voiceTabIndex, setVoiceTabIndex ]                   = useState(0);
  const [ searchQuery, setSearchQuery ]                       = useState("");
  const { isOpen, onClose, onOpen }                           = useDisclosure();
  const currentVoiceElement                                   = useRef<HTMLTableRowElement>(null)
  const rowHoverColour                                        = useColorModeValue("#EDF2F7", "rgba(255, 255, 255, 0.06)")
  const tabTextColour                                         = useColorModeValue("#222222",'#FFFFFF')

  // Effects
  useEffect(() => {
  }, [searchQuery, store.voice])

  const openVoiceModal = (language: string, voices: TextToSpeechVoice[]) => {
    setVoiceTabIndex(0)
    setSelectedLanguage(language);
    setSelectedLanguageVoices(voices)
    onOpen();
  }
  const closeVoiceModal = () => {
    onClose();
    setSelectedLanguage("")
    setSelectedLanguageVoices([])
  }

  const tabNames = useMemo(() => {
    return getLanguageTabNames(searchQuery)
  }, [searchQuery, store.voice])


  const getLanguageTabPanels = (): React.ReactNode => {
    return (
      <TabPanels>
        {
          tabNames.map((tab) => {
            const allVoices = searchVoices(store.availableVoices, searchQuery, tab as VoiceType)

            return (
              <TabPanel key={tab}>
                <TableContainer overflowX="hidden">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Language</Th>
                        <Th isNumeric>Voice Count</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        Object.keys(allVoices).map((language) => (
                          <Tr
                              onClick={() => openVoiceModal(language, allVoices[language])}
                              key={language}
                              transition="0.2s all ease"
                              cursor="pointer"
                              _hover={{
                                backgroundColor: rowHoverColour,
                              }}
                            >
                              <Td>
                                { language }
                                {
                                  isLanguageSelected(language, tab as VoiceType) && (
                                    <FontAwesomeIcon icon={faCheck} style={{ marginLeft: "1em", color: "green", fontSize: "1.25em" }} />
                                  )
                                }
                              </Td>
                              <Td isNumeric>
                                { allVoices[language].length }
                              </Td>
                            </Tr>
                        ))
                      }
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            )
          })
        }
      </TabPanels>
    )
  }

  const goToCurrentVoice = () => {
    const voice = store.voice

    setSearchQuery("")

    const languageTabs = getLanguageTabNames(searchQuery)
    const languageTabIndex = getLanguageTabIndex()
    const allVoices = searchVoices(store.availableVoices, "", languageTabs[languageTabIndex] as VoiceType)
    const voiceTabIndex = getVoiceTabIndex()

    setLanguageTabIndex(languageTabIndex)
    openVoiceModal(voice.languageDescriptions[0], allVoices[voice.languageDescriptions[0]])
    setVoiceTabIndex(voiceTabIndex)
    setTimeout(() => currentVoiceElement.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200)
  }

  return (
    <>
      <OptionSubHeader title="Voice" includePadding/>

      {
        Object.keys(store.availableVoices).length ? (
          <>
            {/* Search */}
            <Box padding="0 1em" marginTop="1em">
              <SearchBar searchQuery={searchQuery} handleSearch={(searchQuery) => {
                setLanguageTabIndex(0)
                setSearchQuery(searchQuery)
              } } />
            </Box>

            {/* Buttons */}
            <HStack margin="1em 1em 1.5em 1em" width="100%">
              <Button onClick={() => {
                store.resetVoice()
                debuggingOutput(store.languageOptionDebuggingOutput, "languageOptionDebuggingOutput", "Voice reset")
                toast({
                  title: "Voice Reset",
                  description: "Voice has been reset to the default",
                  duration: 5000,
                  isClosable: true,
                })
              }} size="sm">Reset</Button>
              <Button onClick={goToCurrentVoice} size="sm">Go to current voice</Button>
            </HStack>
          </>
        ) : null
      }

      {
        !isApiKeySet() ? null : (
          <>
            {/* Language Tabs */}
            {
              tabNames.length > 0 && (
                <Tabs padding="0 1em" isLazy variant={"soft-rounded"} index={languageTabIndex} onChange={(index) => setLanguageTabIndex(index)}>
                  { getLanguageTabList(tabNames, tabTextColour) }
                  { getLanguageTabPanels() }
                </Tabs>
              )
            }
            {
              tabNames.length === 0 && Object.keys(store.availableVoices).length ? (
                <NoResultsMascot />
              ) : null
            }
            {
              !Object.keys(store.availableVoices).length && (
                <Mascot label="No voices available" />
              )
            }

            {/* Voice Modal */}
            <Modal size="2xl" isOpen={isOpen} onClose={closeVoiceModal} motionPreset="slideInBottom" blockScrollOnMount={false} isCentered>
              <ModalOverlay />
              <ModalContent bg={useColorModeValue('#FFFFFF', '#171717')} overflowY="hidden">
                <ModalHeader>{selectedLanguage}</ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY="auto" maxHeight="30em" minHeight="30em">
                  <Tabs isLazy variant={"soft-rounded"} index={voiceTabIndex} onChange={(index) => setVoiceTabIndex(index)}>
                    { getVoiceTabList(selectedLanguageVoices, tabTextColour) }
                    { getVoiceTabPanels(selectedLanguageVoices, currentVoiceElement, rowHoverColour) }
                  </Tabs>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )
      }

      {
        isApiKeySet() ? null : (
          <Mascot label="No voices available" />
        )
      }

    </>
  )
}

export default VoiceSelection
