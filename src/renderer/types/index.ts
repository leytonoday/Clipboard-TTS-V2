import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface Shortcut {
  keybinding: string;
  command: () => void;
  commandName: string;
  tooltip: string;
}

export type Speed = {
  name: string;
  value: number;
}

export type Language = {
  value: string; // language code
  name: string;
}

export type Substitution = {
  before: string;
  after: string;
  matchCase: boolean;
}

export interface BaseOption {
  name: string;
  icon: IconDefinition;
  disabled?: (...args: any[]) => boolean;
  active?: (...args: any[]) => boolean;
}

export interface IToggleOption extends BaseOption {
  debounce?: number;
  isEnabled?: boolean;
}

export interface ICommandOption extends BaseOption {
  command: () => void;
  debounce?: number;
}

export interface IComplexOption extends BaseOption {
  path: string;
}

export type OptionBarPositon = "LEFT" | "RIGHT" | "TOP" | "BOTTOM";

export type Theme = "DARK" | "LIGHT";

export type ClipboardAction = 'electron-clipboard-read' | 'electron-clipboard-read-text' | 'electron-clipboard-read-image' | 'electron-clipboard-format' | 'electron-clipboard-write-text'

export type ClipboardData = {
  mimeType: string,
  data: string
}

export type GetBase64AudioArgs = {
  input: string;
  apiKey?: string;
  includeTimepoints?: boolean;
  voice?: { name: string; languageCode: string; ssmlGender: string; };
  isSsml?: boolean
}
export type GetBase64AudioReturn = { audioContent: string; timepoints: any };

export type GetBase64ImageArgs = {
  base64Input: string;
  apiKey?: string;
  mimeType: string;
}

export type TextToSpeechVoiceGender = "SSML_VOICE_GENDER_UNSPECIFIED" | "MALE" | "FEMALE" | "NEUTRAL"

export type TextToSpeechVoice = {
  languageCodes: string[],
  languageDescriptions: string[],
  name: string,
  ssmlGender: TextToSpeechVoiceGender,
  naturalSampleRateHertz: number
}

export type TextToSpeechVoices = {
  [key: string]: TextToSpeechVoice[],
}

export type VoiceType = "Neural2" | "Wavenet" | "Standard"

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

export type TTSMutation = "TRANSLATION" | "DICTIONARY" | "IMAGE_TO_TEXT" | "SUBSTITUTIONS" | "SPELLCHECK"

export type ProcessTextReturn = {
  text: string;
  detectedLanguage?: string;
  mutationsApplied?: TTSMutation[]
  isError?: boolean;
}

export type HistoryItem = {
  text: string;
  timestamp: string;
  voice: TextToSpeechVoice;
  mutationsApplied: TTSMutation[];
}

export type SpellingSuggestions = {
  word: string;
  suggestions: string[];
}

export type UploadedFile = {
  file?: Uint8Array,
  mimeType?: string,
  error?: string
}

export type OutputLingerData = {
  text: string;
  audioContent: string;
  timepoints: any;
}

export type AccordationItem = {
  title: string;
  text: string;
}

export type WhatsNewData = {
  version: string;
  newFeatures?: string[];
  bugFixes?: string[];
  notes?: string[];
}

export type SpellCheckSuggestion = {
  word: string;
  suggestions: string[];
}

export type SpellCheckException = {
  word: string;
}
