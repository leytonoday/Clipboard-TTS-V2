import {
  Box,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from '@chakra-ui/react';
import ColorBlock       from "renderer/components/common/colour-block/ColourBlock"
import ColourPicker     from "renderer/components/common/ColourPicker"
import { useStore }     from 'renderer/store';
import { useLocation }  from "react-router-dom"
import OptionSubHeader  from "renderer/components/options/common/OptionSubHeader"

const AccentPicker = () => {
  const { accent, setAccent, resetAccent } = useStore();
  const location = useLocation()

  return (
    <Popover placement="top" trigger="hover" openDelay={300} closeDelay={100} isLazy={true}>
      <HStack
        alignItems="center"
        width="100%"
        justifyContent="space-between"
        padding="0 1em"
      >
        <OptionSubHeader title="Accent Colour" />

        <HStack alignItems="center" width="fit-content">
          <p> {accent} </p>
          <PopoverTrigger>
            <Box>
              <ColorBlock color={accent} size="2em" />
            </Box>
          </PopoverTrigger>
          { // Don't show this on a preview
            !location.pathname.includes("preview") && <Button onClick={resetAccent} size="sm">Reset</Button>
          }
        </HStack>
      </HStack>

      <PopoverContent w="fit-content" border="1px solid grey" background={useColorModeValue("#FFFFFF", '#171717')}>
        <PopoverArrow bg={useColorModeValue("#FFFFFF", '#171717')}/>
        <ColourPicker colour={accent} onChange={setAccent} disabled={false} />
      </PopoverContent>
    </Popover>
  );
};

export default AccentPicker;
