import { useColorModeValue } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useStore } from "renderer/store"
import React from "react"

interface SimpleSelectProps {
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  value: any
  options: {label: string, value: any}[]
  onChange: (input: any) => void,
  width: string
}

const SimpleSelect = (props: SimpleSelectProps) => {
  const store = useStore()

  const value = {
    label: props.value.toString(),
    value: props.value
  }

  const chakraStyles = {
    container: (provided: any) => ({
      ...provided,
      width: props.width,
    }),
    control: (provided: any) => ({
      ...provided,
      borderRadius: "0.4em",
    }),
    menu: (provided: any) => ({
      ...provided,
      width: props.width,
    }),
    menuList: (provided: any) => ({
      ...provided,
      minWidth: "0px !important",
      background: useColorModeValue("#FFFFFF", '#171717'),
    }),
  };

  const styles ={
    menuPortal: (provided: any) => ({
      ...provided,
      width: "100px",
      zIndex: 9999,
    })
  }

  return (
    <Select focusBorderColor={store.accent} selectedOptionStyle="check" chakraStyles={chakraStyles} menuPortalTarget={document.body} styles={styles} size={props.size || "md"} options={props.options} value={value} isDisabled={props.disabled} onChange={props.onChange} isSearchable={false} isClearable={false} />
  )
}

export default React.memo(SimpleSelect)
