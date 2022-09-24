import {
  getWordDefinition,
  capitalizeFirstLetter,
  getSpellingSuggestions
} from "renderer/utils"
import {
  Box,
  Center,
  Button,
  HStack,
  Divider,
} from "@chakra-ui/react"
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom"
import Mascot                   from "renderer/components/common/Mascot"
import SearchBar                from "renderer/components/common/SearchBar"
import { faStar }               from "@fortawesome/free-solid-svg-icons"
import ScaleLoader              from 'react-spinners/ScaleLoader'
import OptionHeader             from "../../../common/OptionHeader"
import { useStore }             from "renderer/store"
import SimpleTooltip            from "renderer/components/common/SimpleTooltip"
import AutoDictionary           from "../common/AutoDictionary"
import NoResultsMascot          from "renderer/components/common/NoResultsMascot"
import { WordDefinition }       from "renderer/types"
import { FontAwesomeIcon }      from "@fortawesome/react-fontawesome"
import WordDefinitionDisplay    from "./components/WordDefinitionDisplay"
import { useState, useEffect }  from "react"


const DictionaryOption = () => {
  const store = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  const [currentDefinition, setCurrentDefinition] = useState<null | undefined | WordDefinition>(undefined)
  const [spellingSuggestions, setSpellingSuggestions] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // If there is a search param for the word, this means that the user has navigated to this page from the saved words page. Open that word.
    const searchParmas = new URLSearchParams(location.search)
    const searchParamWord = searchParmas.get('word')?.toLowerCase()
    const searchParamWordDefinition = store.savedWords.find(i => i.word.toLowerCase() === searchParamWord)

    // I have no idea how this even works, but it gets rid of the word search parameter from the URLs
    searchParmas.delete("word")
    navigate({ search: searchParmas.toString() }, { replace: true })

    if (searchParamWordDefinition) {
      setCurrentDefinition(searchParamWordDefinition)
      setSearchQuery("")
    }
  }, [location.search, store.savedWords, store.autoDictionary])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) {
      return
    }
    setLoading(true)
    const definition = await getWordDefinition(searchQuery)
    setCurrentDefinition(definition)

    if (!definition) {
      const suggestions = getSpellingSuggestions(searchQuery)
      if (!suggestions.length) {
        setSpellingSuggestions([])
        setLoading(false)
        return
      }
      setSpellingSuggestions(suggestions[0].suggestions)
    }

    setLoading(false)
  }

  return (
    <>
      {location.pathname.includes('sub-option') ? ( // This is to allow for sub-options. Perhaps make a more elegant method in the future
        <Outlet />
      ) : (
        <>
          <OptionHeader
            title="Dictionary"
            subtitle="Here you can find and save the definition of words to improve your vocabulary. Only works in English :("
          />

          <AutoDictionary />

          <Divider margin="1em 0"/>

          <HStack margin="0 1em">
            <form style={{width: "100%"}} onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery)
            }}>
              <SearchBar searchQuery={searchQuery} handleSearch={(searchQuery) => setSearchQuery(searchQuery)} onClick={() => handleSearch(searchQuery)} />
            </form>
            <SimpleTooltip label="Saved words">
              <Button onClick={() => navigate("sub-options/saved-words")}>
                <FontAwesomeIcon icon={faStar} />
              </Button>
            </SimpleTooltip>
          </HStack>

          <br />

          {
            loading && (
              <Center>
                <ScaleLoader color={store.accent} loading={loading}  />
              </Center>
            )
          }

          {
            currentDefinition === null && loading === false && (
              <Box>
                {
                  !spellingSuggestions.length ? null :  (
                    <HStack justifyContent="center" flexWrap={"wrap"}>
                      <Box>
                        Did you mean:
                      </Box>
                      { spellingSuggestions.map((i, index) => (
                        <Box key={i} _hover={{ textDecoration: "underline", cursor: "pointer" }}
                          onClick={() => {
                            setSearchQuery(i)
                            handleSearch(i)
                          }}
                        >
                          {`${capitalizeFirstLetter(i)}${index !== spellingSuggestions.length - 1 ? "," : ""} `}
                        </Box>
                      )) }
                      <Box>
                        ?
                      </Box>
                    </HStack>
                  )
                }
                <br />
                <NoResultsMascot />
              </Box>
            )
          }

          {
            currentDefinition === undefined && loading === false && (
              <Mascot label="Search words and build your own dictionary!"/>
            )
          }

          {
            currentDefinition && loading === false && (
              <WordDefinitionDisplay wordDefinition={currentDefinition} />
            )
          }
        </>
      )
      }

    </>
  )
}

export default DictionaryOption
