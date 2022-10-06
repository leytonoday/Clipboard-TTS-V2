import { Box, Divider, VStack } from '@chakra-ui/react';
import { whatsNewData } from 'renderer/misc/data';

const WhatsNew = () => {
  const outputSections: {[key: string]: (string[]) | undefined} = {
    "New Features": whatsNewData.newFeatures || undefined,
    "Bug Fixes": whatsNewData.bugFixes || undefined,
    "Notes": whatsNewData.notes || undefined,
  }

  const filteredOutputSections = Object.keys(outputSections).filter(i => outputSections[i] && outputSections[i]!.length > 0)

  return (
    <VStack spacing={0}>
    {
      filteredOutputSections.map((section, index) => (
        <Box key={index} width="100%">
          <b>{section}</b>
          <VStack width="100%" justifyContent="center" spacing="0.25em">
            {
              outputSections[section]!.map((feature, index) => (
                <Box key={index} width="100%">
                  • {feature}
                </Box>
              ))
            }
          </VStack>

          {
            index !== filteredOutputSections.length -1 && (
              <Divider margin="1em 0" />
            )
          }

        </Box>
      ))
    }
    </VStack>
  )
}

export default WhatsNew
