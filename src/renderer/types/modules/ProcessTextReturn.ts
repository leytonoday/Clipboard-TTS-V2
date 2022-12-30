import { TextToSpeechMutation } from "./TextToSpeech";

export type ProcessTextReturn = {
  text: string;
  detectedLanguage?: string;
  mutationsApplied?: TextToSpeechMutation[]
  isError?: boolean;

  preTranslatedText?: string; // If Auto-translation is enabled, this is the original text before the translation, and the text propety is the translated text
}
