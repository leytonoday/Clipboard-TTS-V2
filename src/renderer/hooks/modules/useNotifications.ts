import { useToast }   from '@chakra-ui/react'
import { useStore }   from 'renderer/store'
import { useEffect }  from 'react'

export const useNotifications = () => {
  const toast = useToast()

  useEffect(() => {
    useStore.subscribe((state, prevState) => {
      if (state.characterLimit !== prevState.characterLimit) {
        toast({
          title: "Character limit updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      }

      if (state.apiKey !== prevState.apiKey) {
        toast({
          title: "Credentials updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      }

      if (state.orderOfMutations !== prevState.orderOfMutations) {
        toast({
          title: "Order of mutations updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      }
    })
  }, [])
}
