import {
  options,
  defaultAccent,
  optionsDefaultOrder,
  defaultOrderOfMutations,
  defaultVoiceExampleSentence
} from "renderer/misc/data"
import {
  Theme,
  TTSMutation,
  IToggleOption,
  IComplexOption,
  ICommandOption,
  OptionBarPositon,
} from "renderer/types"
import {
  electronStoreGet,
  electronStoreSet,
  sortByDisplayOrder,
  electronStoreClear,
} from "renderer/utils"
import { StoreSlice } from 'renderer/store';

// This store slice is used to store the user's settings and methods to change them.
export interface ISettingsSlice {

  // Option Bar
  options: Array<IToggleOption | IComplexOption | ICommandOption>
  optionsBarPosition: OptionBarPositon,
  setOptionsBarPosition: (optionsBarPosition: OptionBarPositon) => void,
  setOptionsDisplayOrder: (options: {key: string, displayOrder: number}[]) => void,
  resetOptionsDisplayOrder: () => void,


  // Shortcuts
  shortcutsEnabled: boolean,
  setShortcutsEnabled: (shortcutsEnabled: boolean) => void,


  // Credentials
  apiKey: string,
  setApiKey: (apiKey: string) => void,


  // Appearance
  theme: Theme,
  accent: string,
  setTheme: (theme: Theme) => void,
  setAccent: (accent: string) => void,
  resetAccent: () => void,


  // Character Limit
  characterLimit: number,
  setCharacterLimit: (characterLimit: number) => void,


  // Tooltips and Previews
  tooltipsEnabled: boolean,
  optionPreviewsEnabled: boolean,
  setTooltipsEnabled: (tooltipsEnabled: boolean) => void,
  setOptionPreviewsEnabled: (optionPreviewsEnabled: boolean) => void,


  // Factory Reset
  factoryDataReset: () => void,


  // Order of Mutations
  orderOfMutations: TTSMutation[],
  setOrderOfMutations: (orderOfMutations: TTSMutation[]) => void,
  resetOrderOfMutations: () => void,


  // Output Linger
  outputLingerEnabled: boolean,
  setOutputLingerEnabled: (outputLingerEnabled: boolean) => void,


  // Voice Example Sentence
  voiceExampleSentence: string,
  resetSetVoiceExampleSentence: () => void,
  setVoiceExampleSentence: (voiceExampleSentence: string) => void,

  // Preserve Newlines
  preserveNewlines: boolean,
  setPreserveNewlines: (preserveNewlines: boolean) => void,
}

export const createSettingsSlice: StoreSlice<ISettingsSlice> = (set, get) => ({

  // Option Bar
  options: sortByDisplayOrder(options, electronStoreGet("optionsDisplayOrder") || optionsDefaultOrder),
  optionsBarPosition: (electronStoreGet("optionsBarPosition") || "BOTTOM") as OptionBarPositon,
  setOptionsBarPosition: (optionsBarPosition: OptionBarPositon) => {
    electronStoreSet("optionsBarPosition", optionsBarPosition)
    set(state => ({ ...state, optionsBarPosition }))
  },
  setOptionsDisplayOrder: (options: {key: string, displayOrder: number}[]) => {
    electronStoreSet("optionsDisplayOrder", options)
    set(state => ({ ...state, options: sortByDisplayOrder(get().options, options) }))
  },
  resetOptionsDisplayOrder: () => {
    electronStoreSet("optionsDefaultOrder", undefined)

    set(state => ({ ...state, options: sortByDisplayOrder(state.options, optionsDefaultOrder) }))
  },


  // Shortcuts
  shortcutsEnabled: (electronStoreGet("shortcutsEnabled") === undefined ? true: electronStoreGet("shortcutsEnabled")) as boolean,
  setShortcutsEnabled: (shortcutsEnabled: boolean) => {
    electronStoreSet("shortcutsEnabled", shortcutsEnabled)
    set(state => ({ ...state, shortcutsEnabled }))
  },


  // Credentials
  apiKey: (electronStoreGet("apiKey") || "") as string,
  setApiKey: (apiKey: string) => {
    electronStoreSet("apiKey", apiKey)
    set(state => ({ ...state, apiKey }))
  },


  // Appearance
  theme: (electronStoreGet("theme") || "LIGHT") as Theme,
  accent: (electronStoreGet("accent") || defaultAccent) as string,
  setTheme: (theme: Theme) => {
    electronStoreSet("theme", theme)
    set(state => ({ ...state, theme }))
  },
  setAccent: (accent: string) => {
    electronStoreSet("accent", accent)
    set(state => ({ ...state, accent }))
  },
  resetAccent: () => {
    electronStoreSet("accent", defaultAccent)
    set(state => ({ ...state, accent: defaultAccent }))
  },


  // Character Limit
  characterLimit: (electronStoreGet("characterLimit") || 2000) as number,
  setCharacterLimit: (characterLimit: number) => {
    electronStoreSet("characterLimit", characterLimit)
    set(state => ({ ...state, characterLimit }))
  },


  // Tooltips and Previews
  tooltipsEnabled: (electronStoreGet("tooltipsEnabled") === undefined ? true: electronStoreGet("tooltipsEnabled")) as boolean,
  optionPreviewsEnabled: (electronStoreGet("optionPreviewsEnabled") === undefined ? true: electronStoreGet("optionPreviewsEnabled")) as boolean,
  setTooltipsEnabled: (tooltipsEnabled: boolean) => {
    electronStoreSet("tooltipsEnabled", tooltipsEnabled)
    set(state => ({ ...state, tooltipsEnabled }))
  },
  setOptionPreviewsEnabled: (optionPreviewsEnabled: boolean) => {
    electronStoreSet("optionPreviewsEnabled", optionPreviewsEnabled)
    set(state => ({ ...state, optionPreviewsEnabled }))
  },


  // Factory Reset
  factoryDataReset: () => {
    electronStoreClear()
  },


  // Order of Mutations
  orderOfMutations: (electronStoreGet("orderOfMutations") || defaultOrderOfMutations) as TTSMutation[],
  setOrderOfMutations: (orderOfMutations: TTSMutation[]) => {
    electronStoreSet("orderOfMutations", orderOfMutations)
    set(state => ({ ...state, orderOfMutations }))
  },
  resetOrderOfMutations: () => {
    electronStoreSet("orderOfMutations", defaultOrderOfMutations)
    set(state => ({ ...state, orderOfMutations: defaultOrderOfMutations }))
  },


  // Output Linger
  outputLingerEnabled: (electronStoreGet("outputLingerEnabled") === undefined ? true: electronStoreGet("outputLingerEnabled")) as boolean,
  setOutputLingerEnabled: (outputLingerEnabled: boolean) => {
    electronStoreSet("outputLingerEnabled", outputLingerEnabled)
    set(state => ({ ...state, outputLingerEnabled }))
  },


  // Voice Example Sentence
  voiceExampleSentence: (electronStoreGet("voiceExampleSentence") || defaultVoiceExampleSentence) as string,
  resetSetVoiceExampleSentence: () => {
    electronStoreSet("voiceExampleSentence", defaultVoiceExampleSentence)
    set(state => ({ ...state, voiceExampleSentence: defaultVoiceExampleSentence }))
  },
  setVoiceExampleSentence: (voiceExampleSentence: string) => {
    electronStoreSet("voiceExampleSentence", voiceExampleSentence)
    set(state => ({ ...state, voiceExampleSentence }))
  },

  // Preserve Newlines
  preserveNewlines: (electronStoreGet("preserveNewlines") === undefined ? true: electronStoreGet("preserveNewlines")) as boolean,
  setPreserveNewlines: (preserveNewlines: boolean) => {
    electronStoreSet("preserveNewlines", preserveNewlines)
    set(state => ({ ...state, preserveNewlines }))
  }
})
