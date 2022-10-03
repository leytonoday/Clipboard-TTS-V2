import {
  isApiKeySet,
  getPhonetics,
  playBase64Audio,
  capitalizeFirstLetter,
} from "renderer/utils"
import {
  Box,
  Spacer,
  Button,
  HStack,
  VStack,
  useToast
} from "@chakra-ui/react"
import {
  networkErrorToast,
  invalidCredentialsToast,
} from "renderer/misc/data"
import { useNavigate }      from 'react-router-dom';
import { useCallback }      from "react";
import { faVolumeHigh }     from "@fortawesome/free-solid-svg-icons"
import { WordDefinition }   from "renderer/types"
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome"
import SimpleTooltip from "renderer/components/common/SimpleTooltip";

interface FullWordButtonProps {
  wordDefinition: WordDefinition
}

const FullWordButton = (props: FullWordButtonProps) => {
  const navigate = useNavigate();
  const toast = useToast()

  const playWord = useCallback(async (word: string) => {
    try {
      await playBase64Audio(word)
    } catch (e: any) {
      if (e.code === "ERR_NETWORK")
        toast(networkErrorToast)
      else
        toast(invalidCredentialsToast)
    }
  }, [])

  return (
    <Button
      as={Box}
      marginTop="0.3em"
      variant="ghost"
      width="100%"
      justifyContent="flex-start"
      padding="1em"
      height="9em"
      onClick={() =>
        navigate(`/option/dictionary?word=${props.wordDefinition.word}`)
      }
      cursor="pointer"
      style={{
        wordWrap: "break-word",
        whiteSpace: "normal",
        textAlign: "left",
      }}
    >
      <HStack alignItems="center" spacing={'0.2em'} width="100%" height="100%">
        <VStack alignItems="start" >
          <Box fontSize="1.5em">
            {capitalizeFirstLetter(props.wordDefinition!.word)}
          </Box>
          <Box color="grey">{getPhonetics(props.wordDefinition!)}</Box>
          <Spacer />
          <SimpleTooltip label="Play word">
            <Button disabled={!isApiKeySet()} width="3em" onClick={(event) => {event.stopPropagation(); playWord(props.wordDefinition.word)}}>
              <FontAwesomeIcon icon={faVolumeHigh} />
            </Button>
          </SimpleTooltip>
        </VStack>

        <Box paddingLeft="1em" flex={1} height="7em">
          <VStack justifyContent="tart" alignItems="end" overflowY="auto" height="100%" width="100%">
            {
              props.wordDefinition.meanings.map((meaning, index) => (
                <Box key={index} textAlign={"right"} fontWeight="normal">
                  <span style={{fontWeight: "bold"}}>{`${index + 1}. ${capitalizeFirstLetter(meaning.partOfSpeech)}: `}</span>
                  {
                    meaning.definitions[0].definition
                  }
                </Box>
              ))
            }
          </VStack>
        </Box>

      </HStack>
    </Button>
  )
}

export default FullWordButton
