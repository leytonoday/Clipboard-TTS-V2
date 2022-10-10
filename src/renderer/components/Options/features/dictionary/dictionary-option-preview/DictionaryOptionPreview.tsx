import { useStore }                             from "renderer/store"
import { useState }                             from "react"
import AutoDictionary                           from "../common/AutoDictionary"
import { Box, Divider, VStack }                 from "@chakra-ui/react"
import { capitalizeFirstLetter, getPhonetics }  from "renderer/utils"
import Mascot from "renderer/components/common/Mascot"

const DictionaryOptionPreview = () => {
  const store = useStore()
  const [randomWord] = useState(store.savedWords[Math.floor(Math.random() * store.savedWords.length)])

  return (
    <>
      {
        randomWord ? (
          <>
            <VStack spacing="-0.25em">
              <Box fontSize="2.5em">
                {capitalizeFirstLetter(randomWord.word)}
              </Box>
              <Box color="grey">{getPhonetics(randomWord)}</Box>
            </VStack>

          </>
        ): (
          <Mascot label="No saved words" />
          )
        }

      <Divider margin="1em 0" />

      <AutoDictionary />

    </>
  )
}

export default DictionaryOptionPreview;
