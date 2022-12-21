import {
  Box,
  Flex,
  Button,
  HStack,
  VStack,
  Divider,
  Spacer,
  Image
} from "@chakra-ui/react";
import Mascot               from "renderer/components/common/Mascot";
import parseHtml            from 'html-react-parser';
import { faTimes }          from "@fortawesome/free-solid-svg-icons";
import { useStore }         from "renderer/store"
import OptionHeader         from "renderer/components/options/common/OptionHeader";
import SimpleTooltip        from "renderer/components/common/SimpleTooltip";
import { useCallback }      from "react"
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";
import { escapeHtml, newLinesToBreaks } from "renderer/utils";

const TextToSpeechQueue = () => {
  const store = useStore()

  const removeItemFromQueue = useCallback((index: number) => {
    const newQueue = [...store.textToSpeechQueue]
    newQueue.splice(index, 1)
    store.setTextToSpeechQueue(newQueue)

  }, [store.textToSpeechQueue])

  const clearQueue = useCallback(() => {
    store.setTextToSpeechQueue([])
  }, [])

  return (
    <>
      <OptionHeader title="Text-to-Speech Queue" subtitle="View and remove items from Text-to-Speech queue"/>

      {
        store.textToSpeechQueue.length > 0 ? (
          <Flex marginBottom="0.5em">
            <Spacer/>
            <Button size="sm" onClick={() => clearQueue()}>Clear Queue</Button>
          </Flex>
        ) : null
      }

      <VStack width="100%">
        {
          store.textToSpeechQueue.map((item, index) => (
            <Box key={index} width="100%">
              <HStack width="100%" padding="0.5em 1em">
                <Box marginRight="0.5em">
                  {`${index + 1}.`}
                </Box>
                {
                  item.mimeType.includes("text/") ?
                    <Box flex={1} width="100%" wordBreak={"break-word"} maxHeight="15em" overflowY="auto">
                      { parseHtml(newLinesToBreaks(escapeHtml(item.data))) }
                    </Box>
                  : null
                }
                {
                  item.mimeType.includes("image/") ?
                    <Box flex={1}>
                      <Image onDragStart={(e) => e.preventDefault() } style={{pointerEvents: "none"}} src={item.data} alt="Image from Text-to-Speech queue" />
                    </Box>
                  : null
                }
                <SimpleTooltip label="Remove from queue">
                  <Button size="sm" onClick={() => removeItemFromQueue(index)}>
                    <FontAwesomeIcon style={{color: "red"}} icon={faTimes} />
                  </Button>
                </SimpleTooltip>
              </HStack>
              {
                index !== store.textToSpeechQueue.length - 1 && <Divider margin="1em 0" />
              }
            </Box>
          ))
        }
      </VStack>

      {
        !store.textToSpeechQueue.length && (
          <Mascot label="No items in Text-to-Speech queue" />
        )
      }

    </>
  )
}

export default TextToSpeechQueue;
