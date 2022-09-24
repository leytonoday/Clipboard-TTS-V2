import { Button, VStack } from "@chakra-ui/react"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface SubOptionButtonProps {
  icon: IconDefinition;
  title: string;
  subtitle: string;
  onClick: () => void;
}

const SubOptionButton = (props: SubOptionButtonProps) => {
  return (
    <Button
      marginTop="0.3em"
      variant="ghost"
      width="100%"
      justifyContent="flex-start"
      padding="1em"
      height="3.5em"
      onClick={props.onClick}
      style={{
        wordWrap: "break-word",
        whiteSpace: "normal",
        textAlign: "left",
      }}
    >
      <FontAwesomeIcon
        icon={props.icon}
        style={{ marginRight: '0.5em', fontSize: '1.5em', width: "1em" }}
      />
      <VStack alignItems="start" spacing={'0.2em'}>
        <p>{props.title}</p>
        <p style={{ fontWeight: 'normal', color: 'grey',fontSize: '0.7em'}}>
          {props.subtitle}
        </p>
      </VStack>
    </Button>
  );
};

export default SubOptionButton;
