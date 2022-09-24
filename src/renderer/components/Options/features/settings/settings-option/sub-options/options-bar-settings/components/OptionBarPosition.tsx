import {
  Box,
  VStack,
  HStack,
  useColorModeValue
} from "@chakra-ui/react"
import {
  faCaretUp,
  faCaretLeft,
  faCaretDown,
  faCaretRight,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { useStore }         from "renderer/store";
import OptionSubHeader      from "renderer/components/options/common/OptionSubHeader"
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";

const PositionButton = (props: { disabled?: boolean, icon: IconDefinition, width: string, height: string, onClick: () => void, active: boolean, accent: string }) => {
  return (
    <Box
      width={props.width}
      height={props.height}
      textAlign="center"
      marginInlineStart="0 !important"
      padding="0.25em"
      cursor={props.disabled ? "not-allowed": "pointer"}
      onClick={props.disabled ? undefined: props.onClick}
    >
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        border={`2px solid ${props.active ? props.accent : "grey"}`}
        borderRadius="0.25em"
        _hover={ props.disabled ? undefined : { bg: `#DDDDDD${useColorModeValue("", "33")}` }}
      >
        <FontAwesomeIcon icon={props.icon} />
      </Box>
    </Box>
  )
}

const OptionBarPosition = () => {

  const store = useStore();
  const { optionsBarPosition, accent } = store;

  return (
    <Box>
      <OptionSubHeader includePadding title="Configure Options Bar Position" />
      <br />
      <VStack width="10em" marginLeft="1em">

        <HStack width="100%" justifyContent="center">
          <PositionButton icon={faCaretUp} width="6em" height="2em" onClick={() => store.setOptionsBarPosition("TOP")} active={optionsBarPosition === "TOP"} accent={accent}/>
        </HStack>

        <HStack width="100%" justifyContent="space-between" marginTop="0 !important">
          <PositionButton disabled icon={faCaretLeft} width="2em" height="6em" onClick={() => store.setOptionsBarPosition("LEFT")} active={optionsBarPosition === "LEFT"} accent={accent}/>

          <Box width="6em" height="6em" marginInlineStart="0 !important" padding="0.4em">
            <Box height="100%" width="100%" border="4px solid grey" transition="0.3s all ease"
              borderTop={optionsBarPosition === "TOP" ? "1em solid grey": undefined}
              borderLeft={optionsBarPosition === "LEFT" ? "1em solid grey": undefined}
              borderRight={optionsBarPosition === "RIGHT" ? "1em solid grey": undefined}
              borderBottom={optionsBarPosition === "BOTTOM" ? "1em solid grey": undefined}
              >
            </Box>
          </Box>

          <PositionButton disabled icon={faCaretRight} width="2em" height="6em" onClick={() => store.setOptionsBarPosition("RIGHT")} active={optionsBarPosition === "RIGHT"} accent={accent}/>
        </HStack>

        <HStack width="100%" justifyContent="center" marginTop="0 !important">
          <PositionButton icon={faCaretDown} width="6em" height="2em" onClick={() => store.setOptionsBarPosition("BOTTOM")} active={optionsBarPosition === "BOTTOM"} accent={accent}/>
        </HStack>
      </VStack>
    </Box>
  )
}

export default OptionBarPosition;
