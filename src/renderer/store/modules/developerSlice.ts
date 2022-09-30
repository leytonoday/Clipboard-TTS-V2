import {
  electronStoreGet,
  electronStoreSet,
} from "renderer/utils"
import { StoreSlice } from 'renderer/store';

// This store slice is used to store data that is only used by the developer for debugging purposes
export interface IDeveloperSlice {

  textToSpeechDebuggingOutput: boolean;
  setTextToSpeechDebuggingOutput: (textToSpeechDebuggingOutput: boolean) => void;

  languageOptionDebuggingOutput: boolean;
  setLanguageOptionDebuggingOutput: (languageOptionDebuggingOutput: boolean) => void;

  substitutionOptionDebuggingOutput: boolean;
  setSubstitutionOptionDebuggingOutput: (substitutionOptionDebuggingOutput: boolean) => void;

  dictionaryOptionDebuggingOutput: boolean;
  setDictionaryOptionDebuggingOutput: (dictionaryOptionDebuggingOutput: boolean) => void;

  shortcutsDebuggingOutput: boolean;
  setShortcutsDebuggingOutput: (shortcutsDebuggingOutput: boolean) => void;

  outputLingerDebuggingOutput: boolean;
  setOutputLingerDebuggingOutput: (outputLingerDebuggingOutput: boolean) => void;
}

export const createDeveloperSlice: StoreSlice<IDeveloperSlice> = (set) => ({

  textToSpeechDebuggingOutput: electronStoreGet("textToSpeechDebuggingOutput") === undefined ? false : electronStoreGet("textToSpeechDebuggingOutput"),
  setTextToSpeechDebuggingOutput: (textToSpeechDebuggingOutput: boolean) => {
    electronStoreSet("textToSpeechDebuggingOutput", textToSpeechDebuggingOutput);
    set(state => ({ ...state, textToSpeechDebuggingOutput }))
  },

  languageOptionDebuggingOutput: electronStoreGet("languageOptionDebuggingOutput") === undefined ? false : electronStoreGet("languageOptionDebuggingOutput"),
  setLanguageOptionDebuggingOutput: (languageOptionDebuggingOutput: boolean) => {
    electronStoreSet("languageOptionDebuggingOutput", languageOptionDebuggingOutput);
    set(state => ({ ...state, languageOptionDebuggingOutput }))
  },

  substitutionOptionDebuggingOutput: electronStoreGet("substitutionOptionDebuggingOutput") === undefined ? false : electronStoreGet("substitutionOptionDebuggingOutput"),
  setSubstitutionOptionDebuggingOutput: (substitutionOptionDebuggingOutput: boolean) => {
    electronStoreSet("substitutionOptionDebuggingOutput", substitutionOptionDebuggingOutput);
    set(state => ({ ...state, substitutionOptionDebuggingOutput }))
  },

  dictionaryOptionDebuggingOutput: electronStoreGet("dictionaryOptionDebuggingOutput") === undefined ? false : electronStoreGet("dictionaryOptionDebuggingOutput"),
  setDictionaryOptionDebuggingOutput: (dictionaryOptionDebuggingOutput: boolean) => {
    electronStoreSet("dictionaryOptionDebuggingOutput", dictionaryOptionDebuggingOutput);
    set(state => ({ ...state, dictionaryOptionDebuggingOutput }))
  },

  shortcutsDebuggingOutput: electronStoreGet("shortcutsDebuggingOutput") === undefined ? false : electronStoreGet("shortcutsDebuggingOutput"),
  setShortcutsDebuggingOutput: (shortcutsDebuggingOutput: boolean) => {
    electronStoreSet("shortcutsDebuggingOutput", shortcutsDebuggingOutput);
    set(state => ({ ...state, shortcutsDebuggingOutput }))
  },

  outputLingerDebuggingOutput: electronStoreGet("outputLingerDebuggingOutput") === undefined ? false : electronStoreGet("outputLingerDebuggingOutput"),
  setOutputLingerDebuggingOutput: (outputLingerDebuggingOutput: boolean) => {
    electronStoreSet("outputLingerDebuggingOutput", outputLingerDebuggingOutput);
    set(state => ({ ...state, outputLingerDebuggingOutput }))
  }
})
