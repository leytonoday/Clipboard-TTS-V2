import {
  VISION_URL,
  TEXT_TO_SPEECH_URL,
  TEXT_TO_SPEECH_VOICE_LIST_URL
} from "renderer/misc/constants";
import {
  translate,
  findNthIndex,
  truncateString,
  debuggingOutput,
  getWordDefinition,
  capitalizeFirstLetter,
} from "renderer/utils"
import {
  ClipboardData,
  TextToSpeechVoice,
  ProcessTextReturn,
  GetBase64ImageArgs,
  GetBase64AudioArgs,
  GetBase64AudioReturn,
} from "renderer/types"
import axios        from "axios"
import { useStore } from "renderer/store"
import dateFormat   from "dateformat"

export function isApiKeySet(): boolean {
  const apiKey = useStore.getState().apiKey
  return !!apiKey;
}

export const getTextFromImage = async (args: GetBase64ImageArgs): Promise<string> => {
  const store =  useStore.getState()
  const apiKey = !args.apiKey ? store.apiKey : args.apiKey
  let reply = null
  try {
    reply = (await axios.post(`${VISION_URL}${apiKey}`, {
      requests: [{
          image: {content: args.base64Input.substring(`data:${args.mimeType};base64,`.length)}, // remove the data:image/png;base64 from the beginning of the base64 encoded image data
          features: {
            type: "DOCUMENT_TEXT_DETECTION",
            maxResults: 1
          }},
        ]
      })).data.responses[0] as any
      if (Object.keys(reply).length === 0 || reply.error)
        reply = "";
      else
        reply = reply.fullTextAnnotation.text;
  } catch (e) {
    throw e
  }
  return reply;
}

export const getBase64Audio = async (args: GetBase64AudioArgs): Promise<string | GetBase64AudioReturn> => {
  const store =  useStore.getState()
  const apiKey = !args.apiKey ? store.apiKey : args.apiKey
  let reply = null
  try {
    reply = (await axios.post(`${TEXT_TO_SPEECH_URL}${apiKey}`, {
      input: args.isSsml ? { ssml: args.input } : { text: args.input },
      voice: args.voice || { name: store.voice.name, languageCode: store.voice.languageCodes[0], ssmlGender: store.voice.ssmlGender },
      audioConfig: {
        audioEncoding: "OGG_OPUS",
        speakingRate: store.speakingRate,
        pitch: store.speakingPitch,
        volumeGainDb: store.volumeGainDb,
        effectsProfileId: [store.audioProfile],
        sampleRateHertz: store.sampleRate
      },
      enableTimePointing: ["SSML_MARK"]
    })).data
  } catch(e) {
    throw e
  }

  if (args.includeTimepoints)
    return {
      audioContent: `data:audio/ogg;base64,${reply.audioContent}`,
      timepoints: reply.timepoints
    }
  else
    return `data:audio/ogg;base64,${reply.audioContent}`
}

export async function getAvailableVoices(): Promise<TextToSpeechVoice[]> {
  const apiKey = useStore.getState().apiKey
  let reply = null
  try {
    reply = (await axios.get(`${TEXT_TO_SPEECH_VOICE_LIST_URL}${apiKey}`)).data.voices
  } catch(e) {
    throw e
  }
  return reply
}

export function getAnnouncement(key: string, includedValue: string, notIncludedValue: string): string {
  const store = useStore.getState();
  return store.currentlyActiveOptions.includes(key) ? includedValue : notIncludedValue
}

export async function playBase64Audio(input: string): Promise<void> {
  let audioContent = null;
  try {
    audioContent = await getBase64Audio({input, isSsml: false});
  } catch (e) {
    throw e
  }
  const audio = new Audio(audioContent as string);
  audio.play()
}

export function getVoiceType(name: string) {
  const start = findNthIndex(name, "-", 2)
  const end = findNthIndex(name, "-", 3)
  return name.substring(start + 1, end)
}

export function getVoiceCountryCode(name: string) {
  const start = findNthIndex(name, "-", 1)
  const end = findNthIndex(name, "-", 2)
  return name.substring(start + 1, end)
}

export function getVoiceLanguageCode(name: string) {
  const index = findNthIndex(name, "-", 2)
  return name.substring(0, index)
}

export function getLanguageByCode(code: string): string {
  const availableVoices = useStore.getState().availableVoices;
  let targetLanguage = ""

  Object.keys(availableVoices).forEach(language => {
    if (availableVoices[language][0].languageCodes[0].includes(code))
      targetLanguage = language
  })

  return targetLanguage
}

export function textToSpeechEnqueue(data: ClipboardData): boolean {
  const store = useStore.getState()

  if (store.textToSpeechQueue.length >= store.textToSpeechQueueSize)
    return false

  debuggingOutput(store.textToSpeechDebuggingOutput, "textToSpeechDebuggingOutput", `Enqueued - ${data.data}`)

  const queue = [...store.textToSpeechQueue]
  store.setTextToSpeechQueue([...queue, data])
  return true
}

export function textToSpeechDequeue(): ClipboardData {
  const store = useStore.getState()
  const queue = [...store.textToSpeechQueue]
  const item = queue.shift() as ClipboardData

  debuggingOutput(store.textToSpeechDebuggingOutput, "textToSpeechDebuggingOutput", `Dequeued - ${item.data}`)

  store.setTextToSpeechQueue(queue)
  return item;
}

export async function imageToTextMutation(output: ProcessTextReturn, clipboardData: ClipboardData): Promise<ProcessTextReturn> {
  if (clipboardData.mimeType.includes("text/") && clipboardData.mimeType !== "text/html")
    output.text = clipboardData.data.trim()
  else if (clipboardData.mimeType.includes("image/") || clipboardData.mimeType === "text/html") {
    output.text = (await getTextFromImage({base64Input: clipboardData.data, mimeType: clipboardData.mimeType === "text/html" ? "image/png" : clipboardData.mimeType})).trim()
    output.mutationsApplied!.push("IMAGE_TO_TEXT")
  }
  return output
}

export async function translationMutation(input: ProcessTextReturn): Promise<ProcessTextReturn> {
  const store = useStore.getState()
  if (store.translationEnabled) {
    const translatedText = await translate(input.text, getVoiceLanguageCode(store.voice.name))

    input.text = translatedText.text
    input.detectedLanguage = translatedText.detectedLanguage

    if (!getVoiceLanguageCode(store.voice.name).includes(translatedText.detectedLanguage)) {
      input.mutationsApplied!.push("TRANSLATION")
      debuggingOutput(useStore.getState().languageOptionDebuggingOutput, "languageOptionDebuggingOutput", `Translated from ${translatedText.detectedLanguage}`)
    }

    return input
  }
  else
    return input
}

export async function substitutionMutation(input: ProcessTextReturn): Promise<ProcessTextReturn> {
  const store = useStore.getState()
  if (store.substitutionsEnabled) {
    const substitutions = store.substitutions
    const outputTextCopy = input.text

    for (const substitution of substitutions) {
      const regex = new RegExp(substitution.before, `${substitution.matchCase ? "" : "i"}g`)
      input.text = input.text.replaceAll(regex, substitution.after)
    }

    if (outputTextCopy !== input.text) {
      input.mutationsApplied!.push("SUBSTITUTIONS")
      debuggingOutput(useStore.getState().substitutionOptionDebuggingOutput, "substitutionOptionDebuggingOutput", `Substitutions applied`)
    }

    return input
  }
  else
    return input
}

export async function dictioaryMutation(input: ProcessTextReturn): Promise<ProcessTextReturn> {
  const store = useStore.getState()
  if (store.autoDictionary) {
    const punctuationStrippedText = input.text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    const definition = await getWordDefinition(punctuationStrippedText)

    if (!definition)
      return { text: "Error: No definition found", isError: true  }

    input.text = `${capitalizeFirstLetter(definition.word)}. ${definition.meanings.map((meaning, index) => `${index + 1}. ${capitalizeFirstLetter(meaning.partOfSpeech)}: ${meaning.definitions[0].definition}`).join(" ")}`
    input.mutationsApplied!.push("DICTIONARY")

    debuggingOutput(useStore.getState().dictionaryOptionDebuggingOutput, "dictionaryOptionDebuggingOutput", `Auto Dictionary applied`)

    return input
  }
  else
    return input
}

export async function downloadOggAudio(audioContent: string, text: string) {
  const link = document.createElement("a")
  link.href = audioContent
  link.download = `${dateFormat(new Date(), "[dd-mm-yy]").trim()} - ${useStore.getState().voice.name} - ${truncateString(text, 50)}.ogg`
  link.click()
}
