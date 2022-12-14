import {
  HistoryItem,
  Substitution,
  WordDefinition,
  TextToSpeechVoice,
} from "renderer/types"
import {
  defaultFont,
  defaultVoice,
  defaultAudioProfile,
  defaultSubstitutions,
  defaultSampleRate,
  defaultSpeakingRate,
  defaultSpeakingPitch,
  defaultVolumeGainDb
} from "renderer/misc/data"
import { StoreSlice }                         from 'renderer/store';
import { electronStoreGet, electronStoreSet } from "renderer/utils"

// This store slice is used to store the data for options. For example, the user's preferred font, or the user's preferred audio profile.
export interface IOptionsSlice {

  // Used to store options that are enabled, so the icons can be highlighted.
  currentlyActiveOptions: string[],
  toggleCurrentlyActiveEnabledState: (name: string) => void,


  // Used to open the Complex Option Modal. Once this changes (and isn't an empty string), the Complex Option Modal will open.
  currentOpenOptionPath: string
  setCurrentOpenOptionPath: (path: string) => void,


  // Highlight
  currentHighlight: string,
  setCurrentHighlight: (currentHighlight: string) => void,


  // Overlay
  currentOverlay: string,
  overlayEnabled: boolean,
  autoOverlayTextColour: boolean,
  setCurrentOverlay: (currentOverlay: string) => void,
  setOverlayEnabled: (overlayEnabled: boolean) => void,
  setAutoOverlayTextColour: (autoOverlayTextColour: boolean) => void,


  // Highlight
  highlightEnabled: boolean,
  highlightAutoScroll: boolean,
  liveHighlightEnabled: boolean,
  autoHighlightTextColour: boolean,
  setHighlightEnabled: (highlightEnabled: boolean) => void,
  setHighlightAutoScroll: (highlightAutoScroll: boolean) => void,
  setLiveHighlightEnabled: (liveHighlightEnabled: boolean) => void,
  setAutoHighlightTextColour: (autoHighlightTextColour: boolean) => void,


  // Font
  font: string,
  fontSize: number,
  fontSpacing: string,
  fontSelectionPageSize: number,
  setFont: (fontSize: string) => void,
  setFontSize: (fontSize: number) => void,
  resetFont: () => void,
  setFontSpacing: (fontSpacing: string) => void,
  setFontSelectionPageSize: (fontSelectionPageSize: number) => void,


  // Audio Configuration
  sampleRate: number,
  speakingRate: number,
  volumeGainDb: number,
  audioProfile: string,
  speakingPitch: number,
  previewTabIndex: number,
  setSampleRate: (sampleRate: number) => void,
  setSpeakingRate: (speakingRate: number) => void,
  setVolumeGainDb: (volumeGainDb: number) => void,
  setAudioProfile: (audioProfile: string) => void,
  setSpeakingPitch: (speakingPitch: number) => void,
  setPreviewTabIndex: (previewTabIndex: number) => void,


  // Language and Translation
  voice: TextToSpeechVoice,
  translationEnabled: boolean,
  splitScreenEnabled: boolean,
  lastDetectedLanguage: string | null,
  setVoice: (voice: TextToSpeechVoice) => void,
  resetVoice: () => void,
  setSplitScreenEnabled: (splitScreenEnabled: boolean) => void,
  setTranslationEnabled: (translationEnabled: boolean) => void,
  setLastDetectedLanguage: (lastDetectedLanguage: string | null) => void,


  // Dictionary
  savedWords: WordDefinition[],
  autoDictionary: boolean,
  savedWordsSortBy: string,
  savedWordsDisplayStyle: string,
  setSavedWords: (savedWords: WordDefinition[]) => void,
  setAutoDictionary: (autoDictionary: boolean) => void,
  setSavedWordsSortBy: (savedWordsSortBy: string) => void,
  setSavedWordsDisplayStyle: (savedWordsDisplayStyle: string) => void,


  // Substituions
  substitutions: Substitution[],
  substitutionsEnabled: boolean,
  setSubstitutions: (substitutions: Substitution[]) => void,
  setSubstitutionsEnabled: (substitutionsEnabled: boolean) => void,


  // History
  history: HistoryItem[],
  historySize: number,
  setHistory: (history: HistoryItem[]) => void,
  setHistorySize: (historySize: number) => void,
}

export const createOptionsSlice: StoreSlice<IOptionsSlice> = (set, get) => ({

  // Used to store options that are enabled, so the icons can be highlighted.
  currentlyActiveOptions: electronStoreGet("currentlyActiveOptions") || [],
  toggleCurrentlyActiveEnabledState(name: string) {
    const index = get().currentlyActiveOptions.findIndex(i => i === name)
    const currentlyActiveOptions = [...get().currentlyActiveOptions]

    if (index < 0)
      currentlyActiveOptions.push(name)
    else
      currentlyActiveOptions.splice(index, 1)

    electronStoreSet("currentlyActiveOptions", currentlyActiveOptions)
    set(state => ({ ...state, currentlyActiveOptions }))
  },


  // Used to open the Complex Option Modal. Once this changes (and isn't an empty string), the Complex Option Modal will open.
  currentOpenOptionPath: "",
  setCurrentOpenOptionPath: (path: string) => set(state => ({ ...state, currentOpenOptionPath: path })),


  // Highlight
  currentHighlight: electronStoreGet("currentHighlight") || "#f8ff71",
  highlightEnabled: (electronStoreGet("highlightEnabled") === undefined ? false : electronStoreGet("highlightEnabled")),
  highlightAutoScroll: (electronStoreGet("highlightAutoScroll") === undefined ? true : electronStoreGet("highlightAutoScroll")),
  liveHighlightEnabled: (electronStoreGet("liveHighlightEnabled") === undefined ? false : electronStoreGet("liveHighlightEnabled")),
  autoHighlightTextColour: (electronStoreGet("autoHighlightTextColour") === undefined ? true : electronStoreGet("autoHighlightTextColour")) as boolean,
  setCurrentHighlight: (currentHighlight: string) => {
    electronStoreSet("currentHighlight", currentHighlight)
    set(state => ({ ...state, currentHighlight}))
  },
  setHighlightEnabled: (highlightEnabled: boolean) => {
    electronStoreSet("highlightEnabled", highlightEnabled)
    set(state => ({ ...state, highlightEnabled }))
  },
  setHighlightAutoScroll: (highlightAutoScroll: boolean) => {
    electronStoreSet("highlightAutoScroll", highlightAutoScroll)
    set(state => ({ ...state, highlightAutoScroll }))
  },
  setLiveHighlightEnabled: (liveHighlightEnabled: boolean) => {
    electronStoreSet("liveHighlightEnabled", liveHighlightEnabled)
    set(state => ({ ...state, liveHighlightEnabled }))
  },
  setAutoHighlightTextColour: (autoHighlightTextColour: boolean) => {
    electronStoreSet("autoHighlightTextColour", autoHighlightTextColour)
    set(state => ({ ...state, autoHighlightTextColour }))
  },


  // Overlay
  currentOverlay: electronStoreGet("currentOverlay") || "#9afced",
  overlayEnabled: (electronStoreGet("overlayEnabled") === undefined ? false : electronStoreGet("overlayEnabled")),
  autoOverlayTextColour: (electronStoreGet("autoOverlayTextColour") === undefined ? true : electronStoreGet("autoOverlayTextColour")),
  setCurrentOverlay: (currentOverlay: string) => {
    electronStoreSet("currentOverlay", currentOverlay)
    set(state => ({ ...state, currentOverlay}))
  },
  setOverlayEnabled: (overlayEnabled: boolean) => {
    electronStoreSet("overlayEnabled", overlayEnabled)
    set(state => ({ ...state, overlayEnabled }))
  },
  setAutoOverlayTextColour: (autoOverlayTextColour: boolean) => {
    electronStoreSet("autoOverlayTextColour", autoOverlayTextColour)
    set(state => ({ ...state, autoOverlayTextColour }))
  },



  // Font
  font: (electronStoreGet("font") === undefined ? defaultFont : electronStoreGet("font")) as string,
  fontSize: (electronStoreGet("fontSize") === undefined ? 1 : electronStoreGet("fontSize")) as number,
  fontSpacing: (electronStoreGet("fontSpacing") || "Default") as string,
  fontSelectionPageSize: (electronStoreGet("fontSelectionPageSize") || 18) as number,
  setFont: (font: string) => {
    electronStoreSet("font", font)
    set(state => ({ ...state, font }))
  },
  resetFont: () => {
    electronStoreSet("font", defaultFont)
    set(state => ({ ...state, font: defaultFont }))
  },
  setFontSize: (fontSize: number) => {
    electronStoreSet("fontSize", fontSize)
    set(state => ({ ...state, fontSize }))
  },
  setFontSpacing: (fontSpacing: string) => {
    electronStoreSet("fontSpacing", fontSpacing)
    set(state => ({ ...state, fontSpacing }))
  },
  setFontSelectionPageSize: (fontSelectionPageSize: number) => {
    electronStoreSet("fontSelectionPageSize", fontSelectionPageSize)
    set(state => ({ ...state, fontSelectionPageSize }))
  },


  // Audio Configuration
  sampleRate: (electronStoreGet("sampleRate") || defaultSampleRate) as number,
  speakingRate: (electronStoreGet("speakingRate") || defaultSpeakingRate) as number,
  volumeGainDb: (electronStoreGet("volumeGainDb") || defaultSpeakingPitch) as number,
  audioProfile: (electronStoreGet("audioProfile") || defaultAudioProfile) as string,
  speakingPitch: (electronStoreGet("speakingPitch") || defaultVolumeGainDb) as number,
  previewTabIndex: (electronStoreGet("previewTabIndex") || 0) as number,
  setSampleRate: (sampleRate: number) => {
    electronStoreSet("sampleRate", sampleRate)
    set(state => ({ ...state, sampleRate }))
  },
  setSpeakingRate: (speakingRate: number) => {
    electronStoreSet("speakingRate", speakingRate)
    set(state => ({ ...state, speakingRate }))
  },
  setVolumeGainDb: (volumeGainDb: number) => {
    electronStoreSet("volumeGainDb", volumeGainDb)
    set(state => ({ ...state, volumeGainDb }))
  },
  setAudioProfile: (audioProfile: string) => {
    electronStoreSet("audioProfile", audioProfile)
    set(state => ({ ...state, audioProfile }))
  },
  setSpeakingPitch: (speakingPitch: number) => {
    electronStoreSet("speakingPitch", speakingPitch)
    set(state => ({ ...state, speakingPitch }))
  },
  setPreviewTabIndex: (previewTabIndex: number) => {
    electronStoreSet("previewTabIndex", previewTabIndex)
    set(state => ({ ...state, previewTabIndex }))
  },


  // Language and Translation
  voice: (electronStoreGet("voice") || defaultVoice) as TextToSpeechVoice,
  splitScreenEnabled: (electronStoreGet("splitScreenEnabled") === undefined ? false : electronStoreGet("splitScreenEnabled")) as boolean,
  translationEnabled: (electronStoreGet("translationEnabled") === undefined ? false : electronStoreGet("translationEnabled")) as boolean,
  lastDetectedLanguage: null,
  setVoice: (voice: TextToSpeechVoice) => {
    // TODO - Come back in a few months and check if this issue has been fixed
    // Bug with Google Cloud TTS Beta, where Neural2 voices do not support timepoints
    if (voice.name.includes("Neural2")) {
      electronStoreSet("highlightEnabled", false)
      set(state => ({ ...state, highlightEnabled: false }))
      electronStoreSet("liveHighlightEnabled", false)
      set(state => ({ ...state, liveHighlightEnabled: false }))
    }

    set(state => ({ ...state, splitScreenActive: false}))

    electronStoreSet("voice", voice)
    set(state => ({ ...state, voice }))
  },
  setSplitScreenEnabled: (splitScreenEnabled: boolean) => {
    electronStoreSet("splitScreenEnabled", splitScreenEnabled)
    set(state => ({ ...state, splitScreenEnabled }))
  },
  resetVoice: () => {
    set(state => ({ ...state, splitScreenActive: false}))
    electronStoreSet("voice", defaultVoice)
    set(state => ({ ...state, voice: defaultVoice }))
  },
  setTranslationEnabled: (translationEnabled: boolean) => {
    electronStoreSet("translationEnabled", translationEnabled)
    set(state => ({ ...state, translationEnabled }))
  },
  setLastDetectedLanguage: (lastDetectedLanguage: string | null) => {
    electronStoreSet("lastDetectedLanguage", lastDetectedLanguage)
    set(state => ({ ...state, lastDetectedLanguage }))
  },

  // Dictionary
  savedWords: (electronStoreGet("savedWords") || []) as WordDefinition[],
  autoDictionary: (electronStoreGet("autoDictionary") === undefined ? false : electronStoreGet("autoDictionary")) as boolean,
  savedWordsSortBy: (electronStoreGet("savedWordsSortBy") || "Sort by Addition Date") as string,
  savedWordsDisplayStyle: (electronStoreGet("savedWordsDisplayStyle") || "Full") as string,
  setSavedWords: (savedWords: WordDefinition[]) => {
    electronStoreSet("savedWords", savedWords)
    set(state => ({ ...state, savedWords }))
  },
  setAutoDictionary: (autoDictionary: boolean) => {
    electronStoreSet("autoDictionary", autoDictionary)
    set(state => ({ ...state, autoDictionary }))
  },
  setSavedWordsSortBy: (savedWordsSortBy: string) => {
    electronStoreSet("savedWordsSortBy", savedWordsSortBy)
    set(state => ({ ...state, savedWordsSortBy }))
  },
  setSavedWordsDisplayStyle: (savedWordsDisplayStyle: string) => {
    electronStoreSet("savedWordsDisplayStyle", savedWordsDisplayStyle)
    set(state => ({ ...state, savedWordsDisplayStyle }))
  },


  // Substituions
  substitutions: (electronStoreGet("substitutions") || defaultSubstitutions) as Substitution[],
  substitutionsEnabled: (electronStoreGet("substitutionsEnabled") === undefined ? false : electronStoreGet("substitutionsEnabled")) as boolean,
  setSubstitutions: (substitutions: Substitution[]) => {
    electronStoreSet("substitutions", substitutions)
    set(state => ({ ...state, substitutions }))
  },
  setSubstitutionsEnabled: (substitutionsEnabled: boolean) => {
    electronStoreSet("substitutionsEnabled", substitutionsEnabled)
    set(state => ({ ...state, substitutionsEnabled }))
  },


  // History
  history: (electronStoreGet("history") || []) as HistoryItem[],
  historySize: (electronStoreGet("historySize") || 10) as number,
  setHistory: (history: HistoryItem[]) => {
    electronStoreSet("history", history)
    set(state => ({ ...state, history }))
  },
  setHistorySize: (historySize: number) => {
    electronStoreSet("historySize", historySize)
    set(state => ({ ...state, historySize }))
  },
})
