import { Button, VStack }                         from "@chakra-ui/react"
import { WordDefinition }                         from "renderer/types"
import { useNavigate }                            from 'react-router-dom';
import { capitalizeFirstLetter, truncateString }  from "renderer/utils"

interface CompactWordButtonProps {
  wordDefinition: WordDefinition
}

const CompactWordButton = (props: CompactWordButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      marginTop="0.3em"
      variant="ghost"
      width="100%"
      justifyContent="flex-start"
      padding="1em"
      minHeight="3.5em"
      height="fit-content"
      onClick={() =>
        navigate(`/option/dictionary?word=${props.wordDefinition.word}`)
      }
      style={{
        wordWrap: "break-word",
        whiteSpace: "normal",
        textAlign: "left",
      }}
    >
      <VStack alignItems="start" spacing={'0.2em'}>
        <p>{capitalizeFirstLetter(props.wordDefinition.word)}</p>
        <p
          style={{
            fontWeight: 'normal',
            color: 'grey',
            fontSize: '0.7em',
          }}
        >
          {
            truncateString(
              props.wordDefinition.meanings
                .map((i) => i.definitions[0].definition)
                .join(', '),
              150)
          }
        </p>
      </VStack>
    </Button>
  )
}

export default CompactWordButton
