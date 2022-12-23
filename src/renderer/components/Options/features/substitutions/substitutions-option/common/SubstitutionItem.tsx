import { Box, Button, HStack, Input, Td } from '@chakra-ui/react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Substitution } from 'renderer/types';
import SimpleTooltip from 'renderer/components/common/SimpleTooltip';

interface SubstitutionItemProps {
  substitution: Substitution;
  editMode: boolean;
  updateMatchCase: (substitution: Substitution) => void;
  deleteSubstitution: (substitution: Substitution) => void;
}

const SubstitutionItem = (props: SubstitutionItemProps) => {
  return (
    <>
      <Td width="inherit">
        <Box wordBreak={'break-all'} whiteSpace={'normal'} width="100%">
          {props.editMode ? (
            <Input
              placeholder="Before"
              variant="filled"
              defaultValue={props.substitution.before}
              onChange={(event) => {
                props.substitution.before = event.target.value;
              }}
            />
          ) : (
            props.substitution.before
          )}
        </Box>
      </Td>
      <Td width="inherit">
        <Box wordBreak={'break-all'} whiteSpace={'normal'} flex={1}>
          {props.editMode ? (
            <Input
              placeholder="After"
              variant="filled"
              defaultValue={props.substitution.after}
              onChange={(event) => {
                props.substitution.after = event.target.value;
              }}
            />
          ) : (
            props.substitution.after || 'Blank'
          )}
        </Box>
      </Td>
      {
        props.editMode ? null : (
          <Td padding="0" textAlign="center" >
            <FontAwesomeIcon icon={props.substitution.matchCase ? faCheck : faTimes } style={{ color: props.substitution.matchCase ? 'green' : 'red' }} />
          </Td>
        )
      }
      {props.editMode ? (
        <Td>
          <HStack>
            <SimpleTooltip label="Match case">
              <Button
                size="sm"
                variant={props.substitution.matchCase ? 'solid' : 'ghost'}
                onClick={() => props.updateMatchCase(props.substitution)}
              >
                Aa
              </Button>
            </SimpleTooltip>
            <SimpleTooltip label={'Delete substitution'}>
              <Button
                onClick={() => props.deleteSubstitution(props.substitution)}
                size="sm"
              >
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
              </Button>
            </SimpleTooltip>
          </HStack>
        </Td>
      ) : null}
    </>
  );
};

export default SubstitutionItem;
