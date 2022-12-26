import { TextToSpeechVoice, TextToSpeechMutation } from "./TextToSpeech";

export type HistoryItem = {
  text: string;
  timestamp: string;
  voice: TextToSpeechVoice;
  mutationsApplied: TextToSpeechMutation[];
}
