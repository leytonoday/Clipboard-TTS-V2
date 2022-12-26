export type WordDefinitionDefinition = {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

export type WordDefinitionMeaning = {
  partOfSpeech: string;
  definitions: WordDefinitionDefinition[];
}

export type WordDefinitionPhonetic = {
  text: string;
  audio: string;
}

export type WordDefinition = {
  word: string;
  phonetic: string;
  phonetics: WordDefinitionPhonetic[];
  origin: string;
  meanings: WordDefinitionMeaning[];
}
