import { TextToSpeechMutation } from "./TextToSpeech";

export type ProcessTextReturn = {
  text: string;
  detectedLanguage?: string;
  mutationsApplied?: TextToSpeechMutation[]
  isError?: boolean;
}
