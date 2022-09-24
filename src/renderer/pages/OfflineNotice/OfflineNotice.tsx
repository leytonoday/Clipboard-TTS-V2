import { Flex, Box } from '@chakra-ui/react'

const OfflineNotice = () => {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <Box textAlign="center">
        <p style={{fontSize: "2em", letterSpacing: "4px"}}><b>Offline :(</b></p>
        <p style={{fontSize: "1.5em", letterSpacing: "2px"}}>You are currently offline. Please connect to the internet to use this app.</p>
      </Box>
    </Flex>
  )
}

export default OfflineNotice;
