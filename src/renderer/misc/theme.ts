import {
  extendTheme,
  ThemeConfig,
  ConfigColorMode,
  withDefaultColorScheme
} from '@chakra-ui/react'
import { useStore } from 'renderer/store'

const config: ThemeConfig = {
  initialColorMode: useStore.getState().theme.toLowerCase() as ConfigColorMode,
  useSystemColorMode: false,
}

const breakpoints = {
  sm: '30em',
  md: '40em',
  lg: '50em',
  xl: '60em',
  '2xl': '70em',
  '3xl': '80em',
  '4xl': '90em',
}

const fontSize = {
  xs: '0.4em',
  sm: '0.6em',
  md: '0.7em',
  lg: '0.8em',
  xl: '0.5em',
  '2xl': '1em',
}

export const getTheme = (accent: string) => {
  return extendTheme({
    config,
    breakpoints,
    fontSize,
    colors: {
      primary: {
       200: accent,
       500: `${accent}AA`,
     }
    },
    styles: {
      global: ({colorMode}: any) => ({
        body: {
          bg: colorMode === 'light' ? "#EEEEEE": '#171717',
          color: colorMode === "light" ? "#313131" : '#EEEEEE',
        }
      })
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary', components: ["Switch", "Radio", "Input", "TableContainer", "Tr", "Table", "Tbody", "Tfoot", "Th", "Thead", "Tr", "Td",]})
  )
}

