import {
  Box,
  Collapse,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react"
import {
  faAngleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import {
  ICommandOption,
  IComplexOption,
  IToggleOption
} from "renderer/types";
import { useStore }         from "renderer/store"
import ToggleOption         from "./option-types/ToggleOption"
import CommandOption        from "./option-types/CommandOption"
import ComplexOption        from "./option-types/ComplexOption"
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import React, { useEffect } from "react"

import { getOptionType, optionNameToOnbourdingData }    from "renderer/utils"

const OptionsBar = () => {
  const store = useStore()

  useEffect(() => {}, [store.currentlySpeaking, store.options])

  const optionColumns = useBreakpointValue({ sm: 5, md: 7, lg: 9, xl: 11, "2xl": 13, "3xl": 15, "4xl": 17 }) as number;
  let optionRows = Math.ceil(store.options.length / optionColumns)

  const { isOpen: optionsBarIsOpen, onToggle: optionsBarOnToggle } = useDisclosure({defaultIsOpen: true});


  // for each option within the limit of optionsToDisplay, render a Box
  const getOptions = (startIndex: number, endIndex: number) => {
    const optionsToDisplay = store.options.slice(startIndex, endIndex);

    return optionsToDisplay.map((option, index) => {
      const { dataStep, dataIntro } = optionNameToOnbourdingData(option.name)
      const optionType = getOptionType(option);
      switch(optionType) {
        case "toggle":
          return (
            <Box key={index} data-intro={dataIntro} data-step={dataStep}>
              <ToggleOption {...option as IToggleOption} />
            </Box>)
        case "complex":
          return (
            <Box key={index} data-intro={dataIntro} data-step={dataStep}>
              <ComplexOption {...option as IComplexOption} />
            </Box>
          )
        case "command":
          return (
            <Box key={index} data-intro={dataIntro} data-step={dataStep}>
              <CommandOption {...option as ICommandOption} />
            </Box>
          )
        default:
          return null;
      }
    })
  }

  const openIcon = () => {
    switch(store.optionsBarPosition) {
      case "TOP":
        return faAngleUp;
      case "LEFT":
        return faAngleLeft;
      case "RIGHT":
        return faAngleRight;
      case "BOTTOM":
        return faAngleDown;
    }
  }

  const closedIcon = () => {
    switch(store.optionsBarPosition) {
      case "TOP":
        return faAngleDown;
      case "LEFT":
        return faAngleRight;
      case "RIGHT":
        return faAngleLeft;
      case "BOTTOM":
        return faAngleUp;
    }
  }

  const margin = () => {
    switch(store.optionsBarPosition) {
      case "TOP":
        return "1em 0 0 0";
      case "BOTTOM":
        return "0 0 1em 0";
      default:
        return undefined;
    }
  }

  return (
    <Box display="flex" flexDirection="row" margin={margin()} data-step={2} data-intro={`This is the options bar. It contains a suit of tools to assist you in your reading.`}>
      <Box flex="1">

        <Collapse startingHeight={75} in={optionsBarIsOpen}>

          <Box display="flex" flexWrap="wrap">
              {
                Array.from({length: optionRows }, (_, index) =>
                  <Box key={index} w="100%" padding="0.5em 1em" display="flex" flexDirection="row" justifyContent="space-evenly">
                  {
                    getOptions((optionColumns * (index)), (optionColumns * (index)) + optionColumns)
                  }
                </Box>
                )
              }
          </Box>
        </Collapse>

      </Box>

      {
        optionColumns >= store.options.length ? null : (
          <Box w="4em" display="flex" alignContent="center" alignItems="center" justifyContent="center" padding="0.5em">
            <Box padding="0.5em" onClick={optionsBarOnToggle} cursor="pointer">
              <FontAwesomeIcon icon={optionsBarIsOpen ? openIcon() : closedIcon()} size="lg" />
            </Box>
          </Box>
        )
      }

    </Box>
  )
}

export default React.memo(OptionsBar);
