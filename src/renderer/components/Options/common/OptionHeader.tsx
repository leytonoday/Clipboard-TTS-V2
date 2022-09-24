import React from "react"

interface OptionHeaderProps {
  title: string,
  subtitle: string
}

const OptionHeader = (props: OptionHeaderProps) => {
  return (
    <>
      <p style={{fontSize: "1.75em", letterSpacing: "2px"}}>{props.title}</p>
      <p style={{ fontSize: "1.1em", color: "grey" }}>{props.subtitle}</p>
      <br />
    </>
  )
}

export default React.memo(OptionHeader);
