import { Box }                  from '@chakra-ui/react'
import SimpleSlider             from "renderer/components/common/SimpleSlider"
import { useStore }             from "renderer/store"
import { useMemo, useCallback } from "react"

const FontSizeSlider = () => {
  const store = useStore()

  const fontSizeMarks = useMemo(() => ([
    {
      label: "50%",
      value: 0.5
    },
    {
      label: "75%",
      value: 0.75
    },
    {
      label: "100%",
      value: 1
    },
    {
      label: "125%",
      value: 1.25
    },
    {
      label: "150%",
      value: 1.5
    },
    {
      label: "175%",
      value: 1.75
    },
    {
      label: "200%",
      value: 2
    }
  ]), [])

  const onFontSizeChange = useCallback((value: any) => {
    store.setFontSize(value)
  }, [])

  return (
    <Box margin="0 1em">
      <SimpleSlider
        showLabel={true}
        label="Font Size"

        leftLabel="A"
        leftLabelStyle={{ marginRight: "1em" }}
        rightLabel="A"
        rightLabelStyle={{ marginLeft: "0.5em", fontSize: "2em" }}

        labelSize="md"
        size="md"
        min={0.5}
        max={2}
        step={0.25}
        onChange={onFontSizeChange}
        value={store.fontSize}
        marks={fontSizeMarks}

        orientation="horizontal"

        info="Changes the font size of the output box. Increase for increased readability, decrease for increased space."
      />
    </Box>
  )
}

export default FontSizeSlider;
