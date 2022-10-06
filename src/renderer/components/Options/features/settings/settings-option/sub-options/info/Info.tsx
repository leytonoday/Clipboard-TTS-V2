import React                    from "react"
import WhatsNew                 from "renderer/components/common/WhatsNew"
import SubOptionHeader          from "renderer/components/options/common/SubOptionHeader"
import OptionSubHeader          from "renderer/components/options/common/OptionSubHeader"
import { CURRENT_VERSION }      from "renderer/misc/constants"
import { VStack, Box, Divider } from "@chakra-ui/react"

const Info: React.FC = () => {
  return (
    <>
      <SubOptionHeader
        title="Info"
        subtitle="Version, author, and credits"
      />

      <Box margin="0 1em">
        <OptionSubHeader title={`Version ${CURRENT_VERSION} Beta`} />
        <Box color="grey" fontSize="0.9em">
          <WhatsNew />
        </Box>
      </Box>

      <Divider margin="1em 0" />

      <VStack margin="0 1em" alignItems="start">
        <OptionSubHeader title={`Author`} />

        <Box color="grey" fontSize="0.9em">
          <p>Name: Leyton O'Day</p>
          <p>Email: leytonodayabc123@gmail.com</p>
          <p>GitHub: https://github.com/leytonoday</p>
        </Box>
      </VStack>

      <Divider margin="1em 0" />

      <VStack margin="0 1em" alignItems="start">
        <OptionSubHeader title="Credits" />

        <Box color="grey" fontSize="0.9em">
          <p>https://icons8.com/illustrations/illustration/handy-meditating-cloud</p>
          <p>https://icons8.com/illustrations/illustration/handy-blue-cloud-with-raised-hands</p>
        </Box>
      </VStack>

    </>
  )
}

export default Info
