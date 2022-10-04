import {
  getFlagUrl,
  isApiKeySet,
  getVoiceCountryCode,
  countryCodeToCountry,
} from "renderer/utils"
import Mascot                     from "renderer/components/common/Mascot"
import { useStore }               from "renderer/store"
import SimpleTooltip              from "renderer/components/common/SimpleTooltip"
import AutoTranslatation          from "../common/AutoTranslatation"
import { Divider, VStack, Box, Image }   from "@chakra-ui/react"
import LoadedImage from "renderer/components/common/LoadedImage"

const LanguageOptionPreview = () => {
  const store = useStore()

  return (
    <>
      {
        !Object.keys(store.availableVoices).length && (
          <Box marginBottom="1em">
            <Mascot label="No voices available" />
          </Box>
        )
      }
      {
        isApiKeySet() && Object.keys(store.availableVoices).length ?  (
          <>
            <VStack marginTop="0.5em">
              <SimpleTooltip
                label={countryCodeToCountry(
                  getVoiceCountryCode(store.voice.name)
                )}
              >
                <LoadedImage src={getFlagUrl(getVoiceCountryCode(store.voice.name))} width="auto" height="4em" loaderWidth="4px" loaderHeight="40px" />
              </SimpleTooltip>
              <Box>
                {`${store.voice.languageDescriptions[0]}, ${store.voice.name}`}
              </Box>
            </VStack>

            <Divider margin="1em 0" />
          </>
        ) : null
      }

      <AutoTranslatation />
    </>
  )
}

export default LanguageOptionPreview;
