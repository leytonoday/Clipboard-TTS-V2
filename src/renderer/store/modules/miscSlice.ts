import {
  isApiKeySet,
  electronStoreGet,
  electronStoreSet,
  getAvailableVoices,
} from "renderer/utils"
import * as tags                                  from "language-tags"
import { StoreSlice }                             from 'renderer/store';
import { TextToSpeechVoice, TextToSpeechVoices }  from "renderer/types"

// This store slice is used to store miscellaneous data that is not specific to any other slice.
export interface IMiscSlice {

  // Keeps Preview modal open when the user clicks on an option that opens another modal.
  isModalOpen: boolean,
  setIsModalOpen: (isModalOpen: boolean) => void,


  // Voices
  availableVoices: TextToSpeechVoices,
  loadAvailableVoices: () => Promise<void>,


  // Onboarding
  isOnboardingComplete: boolean,
  setIsOnboardingComplete: (isOnboardingComplete: boolean) => void,
}

export const createMiscSlice: StoreSlice<IMiscSlice> = (set) => ({

  // Keeps Preview modal open when the user clicks on an option that opens another modal.
  isModalOpen: false,
  setIsModalOpen(isModalOpen: boolean) {
    set(state => ({ ...state, isModalOpen }))
  },


  // Voices
  availableVoices: {},
  async loadAvailableVoices() {
    if (!isApiKeySet()) return

    const availableVoices: TextToSpeechVoices = {};

    try {
      (await getAvailableVoices()).map((i: TextToSpeechVoice) => {
        const index = i.name.indexOf('-')
        const languageCode = i.name.substring(0, index)
        const languageDescriptions = tags.language(languageCode)?.descriptions() || []

        if (languageDescriptions.length > 0) {
          const langauge = languageDescriptions[0]

          if (availableVoices[langauge] === undefined)
            availableVoices[langauge] = []
          availableVoices[langauge].push({...i, languageDescriptions})
        }
      })
    } catch (e) {}

    Object.keys(availableVoices).map((i: string) => {
      availableVoices[i].sort((a: TextToSpeechVoice, b: TextToSpeechVoice) => {
        if (a.languageDescriptions[0] < b.languageDescriptions[0])
          return -1
        if (a.languageDescriptions[0] > b.languageDescriptions[0])
          return 1
        return 0
      })
    })
    set(state => ({ ...state, availableVoices }))
  },


  // Onboarding
  isOnboardingComplete: electronStoreGet("isOnboardingComplete") === undefined ? false : electronStoreGet("isOnboardingComplete"),
  setIsOnboardingComplete(isOnboardingComplete: boolean) {
    electronStoreSet("isOnboardingComplete", isOnboardingComplete)
    set(state => ({ ...state, isOnboardingComplete }))
  }
})
