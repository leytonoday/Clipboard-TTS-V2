import { Box, useColorModeValue } from '@chakra-ui/react';
import { SketchPicker } from 'react-color';
import { css } from '@emotion/css';

interface ColourPickerProps {
  disabled: boolean,
  colour: string,
  onChange: (input: any) => void,
}

const ColourPicker = (props: ColourPickerProps) => {
  const disabledColour = useColorModeValue("#DDDDDD", "#404040")

  return (
    <Box
      cursor={props.disabled ? 'not-allowed' : undefined}
      border={`1px solid ${useColorModeValue('#DDDDDD', '#404040')}`}
      width="fit-content"
      borderRadius="0.25em"
      className={css`
      .sketch-picker {
        pointer-events: ${props.disabled ? "none" : undefined};
        background: ${useColorModeValue("#FFFFFF", '#171717')} !important;
      }
      .saturation-white, .saturation-black, .hue-horizontal, span > div {
        background: ${props.disabled ? disabledColour : undefined} !important;
      }
      .sketch-picker label {
        color: ${useColorModeValue('#222222', '#FFFFFF')} !important;
      }
      .sketch-picker input {
        border-radius: 0.5em;
        text-align: center;
        width: 100% !important;
      }
      .sketch-picker > div: last-child {
        display: none !important;
      }
      .sketch-picker > div: nth-child(2) > div: nth-child(2) > div: last-child {
        background: ${props.disabled ? disabledColour : undefined} !important;
      }
      .sketch-picker > div: nth-child(2) > div: first-child > div: first-child > div: first-child > div: first-child > div: last-child > div: first-child {
        display: ${props.disabled ? "none" : undefined} !important;
      }
      .saturation-white > div: last-child > div {
        display: ${props.disabled ? "none" : undefined} !important;
      }
      `}
    >
      <SketchPicker
        color={props.colour}
        disableAlpha
        onChange={(color) => props.onChange(color.hex)}

        styles={{
          default: {
            picker: {
              background: useColorModeValue('#FFFFFF', '#171717'),
              boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.1)',
            },
          },
        }}
      />
    </Box>
  );
};

export default ColourPicker;
