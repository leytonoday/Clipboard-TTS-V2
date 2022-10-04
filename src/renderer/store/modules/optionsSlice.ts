import {
  HistoryItem,
  Substitution,
  WordDefinition,
  TextToSpeechVoice,
  SpellCheckException,
} from "renderer/types"
import {
  defaultFont,
  defaultVoice,
  defaultAudioProfile,
  defaultSubstitutions
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
  liveHighlightEnabled: boolean,
  autoHighlightTextColour: boolean,
  setHighlightEnabled: (highlightEnabled: boolean) => void,
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
  lastDetectedLanguage: string,
  setVoice: (voice: TextToSpeechVoice) => void,
  resetVoice: () => void,
  setTranslationEnabled: (translationEnabled: boolean) => void,
  setLastDetectedLanguage: (lastDetectedLanguage: string) => void,


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
  substitutionsSortBy: string,
  substitutionsEnabled: boolean,
  setSubstitutions: (substitutions: Substitution[]) => void,
  setSubstitutionsSortBy: (substitutionsSortBy: string) => void,
  setSubstitutionsEnabled: (substitutionsEnabled: boolean) => void,


  // History
  history: HistoryItem[],
  historySize: number,
  setHistory: (history: HistoryItem[]) => void,
  setHistorySize: (historySize: number) => void,


  // Spell Check
  spellCheckEnabled: boolean,
  spellCheckExceptions: SpellCheckException[],
  spellCheckExceptionsSortBy: string,
  setSpellCheckEnabled: (spellCheckEnabled: boolean) => void,
  setSpellCheckExceptions: (spellCheckExceptions: SpellCheckException[]) => void,
  setSpellCheckExceptionsSortBy: (spellCheckExceptionsSortBy: string) => void,
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
  sampleRate: (electronStoreGet("sampleRate") || 20000) as number,
  speakingRate: (electronStoreGet("speakingRate") || 1) as number,
  volumeGainDb: (electronStoreGet("volumeGainDb") || 0) as number,
  audioProfile: (electronStoreGet("audioProfile") || defaultAudioProfile) as string,
  speakingPitch: (electronStoreGet("speakingPitch") || 0) as number,
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
  translationEnabled: (electronStoreGet("translationEnabled") === undefined ? false : electronStoreGet("translationEnabled")) as boolean,
  lastDetectedLanguage: (electronStoreGet("lastDetectedLanguage") || (electronStoreGet("voice") ? electronStoreGet("voice").languageCodes[0].split("-")[0] : "en" )) as string,
  setVoice: (voice: TextToSpeechVoice) => {
    electronStoreSet("voice", voice)
    set(state => ({ ...state, voice }))
  },
  resetVoice: () => {
    electronStoreSet("voice", defaultVoice)
    set(state => ({ ...state, voice: defaultVoice }))
  },
  setTranslationEnabled: (translationEnabled: boolean) => {
    electronStoreSet("translationEnabled", translationEnabled)
    set(state => ({ ...state, translationEnabled }))
  },
  setLastDetectedLanguage: (lastDetectedLanguage: string) => {
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
  substitutionsSortBy: (electronStoreGet("substitutionsSortBy") || "Sort by Addition Date") as string,
  substitutionsEnabled: (electronStoreGet("substitutionsEnabled") === undefined ? false : electronStoreGet("substitutionsEnabled")) as boolean,
  setSubstitutions: (substitutions: Substitution[]) => {
    electronStoreSet("substitutions", substitutions)
    set(state => ({ ...state, substitutions }))
  },
  setSubstitutionsSortBy: (substitutionsSortBy: string) => {
    electronStoreSet("substitutionsSortBy", substitutionsSortBy)
    set(state => ({ ...state, substitutionsSortBy }))
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


  // Spell Check
  spellCheckEnabled: (electronStoreGet("spellCheckEnabled") === undefined ? false : electronStoreGet("spellCheckEnabled")) as boolean,
  spellCheckExceptions: (electronStoreGet("spellCheckExceptions") || []) as SpellCheckException[],
  spellCheckExceptionsSortBy: (electronStoreGet("spellCheckExceptionsSortBy") || "Sort by Addition Date") as string,
  setSpellCheckEnabled: (spellCheckEnabled: boolean) => {
    electronStoreSet("spellCheckEnabled", spellCheckEnabled)
    set(state => ({ ...state, spellCheckEnabled }))
  },
  setSpellCheckExceptions: (spellCheckExceptions: SpellCheckException[]) => {
    electronStoreSet("spellCheckExceptions", spellCheckExceptions)
    set(state => ({ ...state, spellCheckExceptions }))
  },
  setSpellCheckExceptionsSortBy: (spellCheckExceptionsSortBy: string) => {
    electronStoreSet("spellCheckExceptionsSortBy", spellCheckExceptionsSortBy)
    set(state => ({ ...state, spellCheckExceptionsSortBy }))
  }
})
