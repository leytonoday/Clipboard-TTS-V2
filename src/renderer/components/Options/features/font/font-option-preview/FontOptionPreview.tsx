import FontOutput               from "../common/FontOutput"
import { useStore }             from "renderer/store"
import SimpleSlider             from "renderer/components/common/SimpleSlider"
import { Box, Divider }         from "@chakra-ui/react"
import { useMemo, useCallback } from "react"

const FontOptionPreview = () => {
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
    <Box marginBottom="0.5em">
      <FontOutput />

      <p style={{marginTop: "1em", textAlign: "center"}}>
        { store.font }
      </p>

      <Divider margin="1em 0 0.5em 0" />

      <SimpleSlider
        showLabel={false}
        label="Font Size"

        leftLabel="A"
        leftLabelStyle={{ marginRight: "0.5em" }}
        rightLabel="A"
        rightLabelStyle={{ marginLeft: "0.25em", fontSize: "2em" }}

        labelSize="md"
        size="sm"
        min={0.5}
        max={2}
        step={0.25}
        onChange={onFontSizeChange}
        value={store.fontSize}
        marks={fontSizeMarks}

        orientation="horizontal"
      />

    </Box>
  )
}

export default FontOptionPreview;
