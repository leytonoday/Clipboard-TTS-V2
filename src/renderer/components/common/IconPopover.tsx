import {
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react"
import { faCircleInfo, faTriangleExclamation, faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

interface IconPopoverrProps {
  content: string | React.ReactNode,
  status: "info" | "warning" | "danger"
}

const IconPopover = (props: IconPopoverrProps) => {
  const bgColour = useColorModeValue("#FFFFFF", "#171717")

  const icon = () => {
    switch (props.status) {
      case "info":
        return faCircleInfo
      case "warning":
        return faTriangleExclamation
      case "danger":
        return faCircleExclamation
    }
  }

  const iconColour = () => {
    switch (props.status) {
      case "info":
        return undefined;
      case "warning":
        return "#FFA500"
      case "danger":
        return "#FF0000"
    }
  }

  return (
    <Popover trigger="hover" openDelay={400} closeDelay={100} isLazy={true}>
      <PopoverTrigger>
        <span>
          <FontAwesomeIcon style={{color: iconColour()}} icon={icon()} />
        </span>
      </PopoverTrigger>
        <PopoverContent
          bg={bgColour}
          width="fit-content"
          maxWidth="25em"
          height="fit-content"
          border="1px solid grey"
          borderRadius="0.75em"
          >
          <PopoverArrow bg={bgColour} />
          <PopoverBody>
            {
              props.content
            }
          </PopoverBody>
        </PopoverContent>
    </Popover>
  )
}

export default React.memo(IconPopover);
