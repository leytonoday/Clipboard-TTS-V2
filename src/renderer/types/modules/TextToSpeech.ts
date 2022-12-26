export type TextToSpeechVoiceGender = "SSML_VOICE_GENDER_UNSPECIFIED" | "MALE" | "FEMALE" | "NEUTRAL"

export type TextToSpeechVoiceType = "Neural2" | "Wavenet" | "Standard"

export type TextToSpeechMutation = "TRANSLATION" | "DICTIONARY" | "IMAGE_TO_TEXT" | "SUBSTITUTIONS"

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
