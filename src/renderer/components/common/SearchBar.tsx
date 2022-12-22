import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchBarProps {
  searchQuery: string;
  handleSearch: (searchQuery: string) => void;
  onClick?: () => void;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <InputGroup>
      <Input
        placeholder="Search"
        onChange={(event) => props.handleSearch(event.target.value)}
        variant="filled"
        value={props.searchQuery}/>
      <InputRightElement
        onClick={props.onClick}
        _hover={{ cursor: props.onClick ? "pointer" : undefined }}
        children={
          <FontAwesomeIcon icon={faMagnifyingGlass}/>
        }
      />
    </InputGroup>
  )
}

export default SearchBar;
