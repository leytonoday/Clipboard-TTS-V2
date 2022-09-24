import { Button, VStack, HStack, } from "@chakra-ui/react"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"

interface SubOptionHeaderProps {
  title: string,
  subtitle: string
}

const SubOptionHeader = (props: SubOptionHeaderProps) => {
  const navigate = useNavigate();

  return (
    <HStack h="5em" margin="0 0 2em 0"> {/*The height here isn't actually obeyed. Only there to allow button to be 100% height, since it's parent must have a set height*/}
      <Button height="100% !important" variant="ghost" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <VStack alignItems="start" spacing="-5px" fontSize={['xs', 'sm', 'md']}>
        <p style={{fontSize: "1.75em", letterSpacing: "2px"}}>{props.title}</p>
        <p style={{ fontSize: "1.1em", color: "grey" }}>{props.subtitle}</p>
      </VStack>
    </HStack>
  )
}

export default SubOptionHeader;
