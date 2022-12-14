import {
  escapeHtml,
  isApiKeySet,
  getBase64Audio,
  debuggingOutput,
  newLinesToBreaks,
  HighlightTimeout,
  dictioaryMutation,
  electronClipboard,
  getLanguageByCode,
  removePunctuation,
  textToSpeechEnqueue,
  textToSpeechDequeue,
  imageToTextMutation,
  translationMutation,
  substitutionMutation,
  getVoiceLanguageCode,
  errorRequestToNotification,
  sanitizeLanguageCode
} from "renderer/utils"
import {
  ClipboardData,
  GetBase64AudioReturn,
  HistoryItem,
  ProcessTextReturn
} from "renderer/types"
import dateFormat                       from "dateformat"
import { useStore }                     from "renderer/store"
import { useToast }                     from "@chakra-ui/react"
import { useState, useEffect, useRef }  from "react"
import { stoppingPunctuation } from "renderer/misc/data"

const addToHistory = (historyItem: HistoryItem) => {
  const store = useStore.getState()
  const history = store.history

  // history is a stack, with a rotating buffer
  // if the history is full, remove the oldest item.
  // Add item to start of stack
  if (history.length === store.historySize)
    history.pop()

  history.unshift(historyItem)
  store.setHistory(history)
}

const processText = async (input: ClipboardData): Promise<ProcessTextReturn> => {
  const store = useStore.getState()

  let output: ProcessTextReturn = {
    text: "",
    mutationsApplied: []
  }

  // If the clipboard data is an image, convert it to text. Otherwise leave as is
  output = await imageToTextMutation(output, input)

  // Error handling and text cleanup
  if (output.text.length === 0)
    return { text: "", isError: true  }

  if (store.autoDictionary && output.text.split(" ").length > 1)
    return { text: "Error: Auto Dictionary is only available for single words.", isError: true }

  const characterLimit = store.characterLimit
  if (output.text.length > characterLimit)
    return { text: `Error: Character limit of ${characterLimit} exceeded`, isError: true  }


  const mutations = store.orderOfMutations.slice(1); // text-to-image is always the first, because it must run first
  const mutationToMutator: { [key: string]: (output: ProcessTextReturn) => Promise<ProcessTextReturn> } = {
    "TRANSLATION": translationMutation,
    "SUBSTITUTIONS": substitutionMutation,
    "DICTIONARY": dictioaryMutation,
  }

  // Apply mutations
  for (const mutation of mutations) {
    const result = await mutationToMutator[mutation](output)
    if (result.isError) {
      return result
    }
  }

  if (output.mutationsApplied)
    debuggingOutput(store.textToSpeechDebuggingOutput, "textToSpeechDebuggingOutput", `Mutations applied: ${output.mutationsApplied.length ? output.mutationsApplied.join(", ") : "None"}`)

  return output
}

const textToSsml = (input: string) => {
  // If the input is comprised solely of punctuation, return an empty string
  if (removePunctuation(input).length === 0)
    return "";

  // Get all instances of stoppingPunctuation
  const stoppingPunctuationInstances = input.split("").map((i) => stoppingPunctuation.includes(i) ? i : "").filter(i => i !== "")

  // At the start of each sentence (which was seperated by stopping punctuation) add a "mark" SSML tag. This is used to determinte timepoints for highlighting
  const tokens = input.split(new RegExp(`[${stoppingPunctuation.join("")}]`, "g")).map((i, index) =>
    i.length > 0 ? `<mark name="${index}"/>${escapeHtml(i).trim()}`: ""
  ).filter(i => i !== "")

  const output = []

  for (let i = 0; i < tokens.length; i++) {
    let toPush = tokens[i]
    if (i < stoppingPunctuationInstances.length)
      toPush += stoppingPunctuationInstances[i]
    output.push(toPush)
  }

  return `<speak>${output.join(" ")}</speak>`
}

const playBase64Audio = (base64Audio: string, audio: React.MutableRefObject<HTMLAudioElement | null>, endedEventHandler: () => void): void => {
  audio.current = new Audio(base64Audio)
  audio.current.addEventListener("ended", endedEventHandler)
  audio.current.pause();
  audio.current.currentTime = 0;
  audio.current.play()
}

const readInitClipboardData = (): string => {
  let clipboardData: any = undefined

  switch (electronClipboard("electron-clipboard-format")) {
    case "text/plain": {
      clipboardData = electronClipboard("electron-clipboard-read-text")
      break
    }
    // For some reason text/html is the mime type when you right click and copy an image from google images. Irritating. So now I must account for this edge case
    case "text/html":
    case "image/png": {
      clipboardData = electronClipboard("electron-clipboard-read-image")
      break
    }
    default: {
      clipboardData = electronClipboard("electron-clipboard-read")
      break
    }
  }

  return clipboardData
}

const readClipboardData = async (): Promise<ClipboardData> => {
  const clipboardDataFormat = electronClipboard("electron-clipboard-format")

  if (clipboardDataFormat === "text/plain")
    return { mimeType: clipboardDataFormat, data: electronClipboard("electron-clipboard-read-text") }
  else if (clipboardDataFormat === "image/png" || clipboardDataFormat === "text/html")
    return { mimeType: clipboardDataFormat, data: electronClipboard("electron-clipboard-read-image") }
  else
    return { mimeType: "", data: "" }
}

export const useTextToSpeech = () => {
  const store = useStore()
  const toast = useToast()

  const [outputText, setOutputText] = useState("")
  // If Auto-translation is enabled, this is the original text before the translation, and the text propety is the translated text
  const [preTranslatedText, setPreTranslatedText] = useState<string | null>(null)
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null)

  const enabled = useRef(store.currentlyActiveOptions.includes("Enable / Disable"))
  const audio = useRef<HTMLAudioElement | null>(null)

  let oldClipboardData: any = null

  const stopSpeech = () => {
    useStore.getState().highlightTimeouts.forEach(i => i.clear())
    store.setHighlightTimeouts([])
    store.setHighlightIndex(-1)

    store.setCurrentlySpeaking(false)
    if (audio.current) {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
  }

  useEffect(() => {
    const initClipboardData = readInitClipboardData()
    oldClipboardData = initClipboardData

    pollForClipboardChanges()
    pollForClipboardQueue()

    useStore.subscribe((state, prevState) => {
      if (state.currentlyActiveOptions !== prevState.currentlyActiveOptions)
        enabled.current = state.currentlyActiveOptions.includes("Enable / Disable")

      if (enabled.current) {
        oldClipboardData = readInitClipboardData()
      }

      if (state.outputLingerEnabled !== prevState.outputLingerEnabled) {
        store.setCurrentLingeringOutput(null)

        // If we aren't speaking, remove the lingered outputText
        if (!state.outputLingerEnabled && !state.currentlySpeaking) {
          setOutputText("")
          setPreTranslatedText(null)
          store.setSplitScreenActive(false)
        }
      }

      // If "Stop Speech" option is clicked, stop it. StopSpeech is a number that is incremented to act as an event emitter
      if (prevState.stopSpeech !== state.stopSpeech && state.currentlySpeaking) {
        store.setCurrentlyPaused(false)
        stopSpeech()
        if (!state.outputLingerEnabled) {
          setOutputText("")
          setPreTranslatedText(null)
          store.setSplitScreenActive(false)
        }
      }

      if (state.replaySpeech !== prevState.replaySpeech) { // Replay the current lingering output
        stopSpeech()
        store.setCurrentlyPaused(false)
        store.setCurrentlySpeaking(true)

        const highlightTimeouts: HighlightTimeout[] = []
        // Set highlight timeouts
        state.currentLingeringOutput!.timepoints.forEach((i: any, index: number) => {
          const timeout = new HighlightTimeout(index, i.timeSeconds * 1000)
          highlightTimeouts.push(timeout)
        })
        store.setHighlightTimeouts(highlightTimeouts)
        useStore.getState().highlightTimeouts.forEach(i => i.start())

        playBase64Audio(state.currentLingeringOutput!.audioContent, audio, () => {
          if (!useStore.getState().outputLingerEnabled) {
            setOutputText("")
            setPreTranslatedText(null)
          }

          store.setCurrentlySpeaking(false)
          store.setHighlightIndex(-1)
          store.setHighlightTimeouts([])
        })
      }

      if (state.pauseSpeech != prevState.pauseSpeech) {
        if (!state.currentlyPaused) {
          audio.current!.pause()

          const newHighlightTimeouts = [...useStore.getState().highlightTimeouts].map(i => {
            if (i.getTimeLeft() > 0)
              return new HighlightTimeout(i.getHighlightIndex(), i.getTimeLeft())
            return null
          }).filter(i => i !== null) as HighlightTimeout[]

          useStore.getState().highlightTimeouts.forEach(i => i.clear())
          store.setHighlightTimeouts(newHighlightTimeouts)

        }
        else {
          audio.current!.play()
          useStore.getState().highlightTimeouts.forEach(i => {
            i.start()
          })
        }

        store.setCurrentlyPaused(!state.currentlyPaused)
      }
    })
  }, [])

  const pollForClipboardQueue = () => {
    setInterval(async () => {
      const store = useStore.getState()
      if (!enabled.current || store.ttsLoading || store.currentlySpeaking || store.textToSpeechQueue.length === 0 || store.highlightTimeouts.length)
        return

      const itemToSay = textToSpeechDequeue()
      say(itemToSay)

    }, 500)
  }

  const pollForClipboardChanges = () => {
    setInterval(async () => {
      if(!enabled.current || !isApiKeySet())
        return

      const newClipboardData = await readClipboardData()
      if (oldClipboardData !== newClipboardData.data && newClipboardData.data.trim().length > 0) {
        const success = textToSpeechEnqueue(newClipboardData)
        if (!success) {
          toast({
            title: "Clipboard Queue Full",
            description: `Queue limit of ${store.textToSpeechQueueSize} reached`,
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        }
        oldClipboardData = newClipboardData.data
      }

    }, 200)
  }

  const say = async (input: ClipboardData) => {
    if (!input.mimeType)
      return

    const store = useStore.getState()
    store.setTtsLoading(true)

    let outputText = ""
    try {
      const result = await processText(input)
      outputText = result.text;
      setPreTranslatedText(result.preTranslatedText || null) // Set it to null to clear it from the previous call
      setDetectedLanguage(result.detectedLanguage || null) // Set it to null to clear it from the previous call

      if (!result.isError && result.mutationsApplied)
        addToHistory({
          text: result.text,
          timestamp: dateFormat(new Date(), "H:MM , dd/mm/yy").trim(),
          mutationsApplied: result.mutationsApplied,
          voice: store.voice
        })

      if (store.translationEnabled && result.detectedLanguage) {
        const currentVoiceLanguageCode = getVoiceLanguageCode(store.voice.name).split("-")[0]
        const lastDetectedLanguage = store.lastDetectedLanguage
        const detectedLanguageCode = result.detectedLanguage?.split("-")[0]

        if (result.detectedLanguage && lastDetectedLanguage != result.detectedLanguage) {
          store.setLastDetectedLanguage(detectedLanguageCode)

          if (detectedLanguageCode !== currentVoiceLanguageCode) {
            store.setSplitScreenActive(true)
          }

          const detectedLanguageName = getLanguageByCode(result.detectedLanguage)

          setDetectedLanguage(detectedLanguageCode) // If it hasn't been set, just set it to null to clear it from the previous call

          if (lastDetectedLanguage !== detectedLanguageCode && currentVoiceLanguageCode !== detectedLanguageCode) {
            toast({
              title: "Translating Detected Language",
              description: detectedLanguageName ?
                `Translating from ${detectedLanguageName} to ${store.voice.languageDescriptions[0]}` :
                `Translating from an unrecognized language (language code: ${result.detectedLanguage})`,
              status: "success",
              duration: 5000,
              isClosable: true,
            })
          }
        }
        if (detectedLanguageCode === currentVoiceLanguageCode) {
          store.setSplitScreenActive(false);
        }
      }

    } catch (e: any) {
      errorRequestToNotification((e.response.data && e.response.data.error) || e, toast)
      store.setTtsLoading(false)
      return
    }

    if (!outputText) { // Incase an imaege is copied, but it has no text. Or if a text is copied, but it is empty
      store.setTtsLoading(false)
      return
    }

    // If highlighting is enabled, always get SSML, otherwise only get SSML if liveHighlight is enabled
    let output = ""

    if (!store.voice.name.includes("Neural2") && (store.highlightEnabled || store.liveHighlightEnabled)) {
      output = textToSsml(outputText)
      debuggingOutput(store.textToSpeechDebuggingOutput, "textToSpeechDebuggingOutput", "SSML Applied")
    }
    else
      output = outputText

    // This happens when the text comprises of only punctuation that is stripped
    if (removePunctuation(outputText).replaceAll("\n", "").replaceAll("\r", "").length === 0) {
      store.setTtsLoading(false)
      return
    }

    let base64AudioData: GetBase64AudioReturn | null = null

    // Get audio
    try {
      base64AudioData = await getBase64Audio({input: output, includeTimepoints: true, isSsml: store.highlightEnabled || store.liveHighlightEnabled}) as GetBase64AudioReturn
    } catch (e: any) {
      errorRequestToNotification((e.response.data && e.response.data.error) || e, toast)
      store.setTtsLoading(false)
      return
    }

    const { audioContent: outputAudio, timepoints } = base64AudioData as GetBase64AudioReturn

    // Reset highlight data
    store.setHighlightIndex(-1)
    store.highlightTimeouts.forEach(i => i.clear())
    store.setHighlightTimeouts([])

    const highlightTimeouts: HighlightTimeout[] = []
    // Set highlight timeouts
    timepoints.forEach((i: any, index: number) => {
      const timeout = new HighlightTimeout(index, i.timeSeconds * 1000)
      highlightTimeouts.push(timeout)
    })
    store.setHighlightTimeouts(highlightTimeouts)
    useStore.getState().highlightTimeouts.forEach(i => i.start())

    debuggingOutput(store.textToSpeechDebuggingOutput, "textToSpeechDebuggingOutput", `Timepoints -\n${JSON.stringify(timepoints, null, 2)}`)

    store.setTtsLoading(false)
    const cleanedOutputText = newLinesToBreaks(escapeHtml(outputText))
    setOutputText(cleanedOutputText)
    store.setCurrentlySpeaking(true)

    if (store.outputLingerEnabled) {
      const lingeredOutput = {
        text: outputText,
        audioContent: outputAudio,
        timepoints
      }
      debuggingOutput(store.outputLingerDebuggingOutput, "outputLingerDebuggingOutput", `Lingered output set -\n${JSON.stringify(lingeredOutput, null, 2)}`)
      store.setCurrentLingeringOutput(lingeredOutput)
    }

    playBase64Audio(outputAudio, audio, () => {
      if (!useStore.getState().outputLingerEnabled) {
        setOutputText("")
        setPreTranslatedText(null)
        store.setSplitScreenActive(false)
      }

      store.setCurrentlySpeaking(false)
      store.setHighlightIndex(-1)
      useStore.getState().highlightTimeouts.forEach(i => i.clear())
      store.setHighlightTimeouts([])
      debuggingOutput(useStore.getState().textToSpeechDebuggingOutput, "textToSpeechDebuggingOutput", "Finished Speaking")
    })

  }

  return {
    say,
    outputText,
    detectedLanguage,
    preTranslatedText,
    currentlySpeaking: store.currentlySpeaking,
  }
}
