import {
  getFlagUrl,
  electronClipboard,
  getVoiceCountryCode,
  capitalizeFirstLetter,
} from "renderer/utils";
import {
  faBook,
  faImage,
  faClone,
  faLanguage,
  IconDefinition,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  VStack,
  HStack,
  Button,
  Spacer,
  Image
} from "@chakra-ui/react";
import SimpleTooltip                from "renderer/components/common/SimpleTooltip";
import { FontAwesomeIcon }          from "@fortawesome/react-fontawesome";
import { HistoryItem, TTSMutation } from "renderer/types";
import LoadedImage from "renderer/components/common/LoadedImage";

interface HistoryItemDisplayProps {
  historyItem: HistoryItem,
  previewMode?: boolean
}

const HistoryItemDisplay = (props: HistoryItemDisplayProps) => {
  const mutationToIcon: { [key in TTSMutation]: IconDefinition } = {
    "TRANSLATION": faLanguage,
    "SUBSTITUTIONS": faArrowRightArrowLeft,
    "DICTIONARY": faBook,
    "IMAGE_TO_TEXT": faImage,
  }

  const mutationToTooltip: { [key in TTSMutation]: string } = {
    "TRANSLATION": "This text was translated",
    "SUBSTITUTIONS": "Substitutions were made to this text",
    "DICTIONARY": "This text was looked up in the dictionary",
    "IMAGE_TO_TEXT": "This text was converted from an image",
  }

  return (
    <Box width="100%">
      <VStack alignItems="start" width="100%">
        <HStack alignItems="center" marginRight="1em" width="100%">
          <HStack justifyContent="center">
            <Box>
              <SimpleTooltip label={`${props.historyItem.voice.name}, ${capitalizeFirstLetter(props.historyItem.voice.ssmlGender.toLowerCase())}`}>
                <LoadedImage src={getFlagUrl(getVoiceCountryCode(props.historyItem.voice.name))} width="100%" height="1.8em" loaderWidth="2px" loaderHeight="20px" />
              </SimpleTooltip>
            </Box>
            {
              props.historyItem.mutationsApplied.length === 0 ? null : (
                <>
                  {
                    props.historyItem.mutationsApplied.map((mutation, index) => (
                      <SimpleTooltip key={index} label={mutationToTooltip[mutation]} >
                        <Button size="sm" as={Box}>
                          <FontAwesomeIcon icon={mutationToIcon[mutation]} />
                        </Button>
                      </SimpleTooltip>
                    ))
                  }
                </>
              )
            }
          </HStack>
          <Spacer />
          {
            props.previewMode ? null : (
              <>
                <Box fontWeight="bold">
                  {
                    `${props.historyItem.timestamp}`
                  }
                </Box>
                <SimpleTooltip label="Copy to clipboard">
                  <Button size="sm" onClick={() => {electronClipboard('electron-clipboard-write-text', props.historyItem.text)}}>
                    <FontAwesomeIcon icon={faClone} />
                  </Button>
                </SimpleTooltip>
              </>
            )
          }
        </HStack>
        {
          !props.previewMode ? null : (
            <Box fontWeight="bold" padding="0.5em 0">
              {
                `${props.historyItem.timestamp}`
              }
            </Box>
          )
        }
        <Box width="100%" wordBreak={"break-word"} maxHeight="15em" overflowY="auto">
          {
            props.historyItem.text
          }
        </Box>
      </VStack>
    </Box>
  )
}

export default HistoryItemDisplay;
