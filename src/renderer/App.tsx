import {
  useShortcuts,
  useNotifications,
  useFileDragAndDrop
} from './hooks'
import Titlebar                       from "renderer/components/titlebar/Titlebar"
import RouteTree                      from "renderer/misc/RouteTree"
import { getTheme }                   from "./misc/theme"
import { useStore }                   from 'renderer/store'
import { HashRouter as Router }       from 'react-router-dom'
import { getPlatform }                from './utils'
import { ChakraProvider, Flex, Box }  from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

const App: React.FC = () => {
  useShortcuts()
  useNotifications()
  useFileDragAndDrop()
  const store = useStore()

  const [platform] = useState(getPlatform())
  const [theme, setTheme] = useState(getTheme(store.accent))

  useEffect(() => {
    useStore.subscribe((state, prevState) => {
      if (state.accent !== prevState.accent) {
        setTheme(getTheme(state.accent))
      }
    })
    store.loadAvailableVoices()

    const interval = setInterval(() => {
      if (Object.keys(useStore.getState().availableVoices).length === 0)
        store.loadAvailableVoices()
      else
        clearInterval(interval)
    }, 5000)
  }, [])


  return (
    <ChakraProvider theme={theme}>
      <Flex height="100%">
        {
          platform === "win32" ? <Titlebar /> : null
        }
        <Box flex={1} marginTop="30px">
          <Router>
            <RouteTree />
          </Router>
        </Box>
      </Flex>
    </ChakraProvider>
  )
}

export default App
