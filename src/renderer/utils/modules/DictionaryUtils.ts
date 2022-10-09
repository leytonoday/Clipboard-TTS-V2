import {
  WordDefinition,
  WordDefinitionPhonetic
} from "renderer/types"
import axios              from "axios"
import { DICTIONARY_URL } from "renderer/misc/constants"

export async function getWordDefinition(word: string): Promise<WordDefinition | null> {
  try {
    const response = await axios.get(`${DICTIONARY_URL}${word}`)
    return response.data[0] as WordDefinition
  } catch (e: any) {
    if (e.code === "ERR_NETWORK")
      throw e
    return null;
  }
}

export function getPhonetics(wordDefinition: WordDefinition) {
  if (wordDefinition.phonetic)
    return wordDefinition.phonetic

  const phonetics = wordDefinition.phonetics.map((phonetic: WordDefinitionPhonetic) => phonetic.text).filter(i => i !== undefined)
  return phonetics.length ? phonetics.join(", ") : null
}

