import { StoreSlice }                       from 'renderer/store';
import { ClipboardData, OutputLingerData, SpellCheckSuggestion }  from 'renderer/types';

// This store slice is used solely as a means for cross-component communication.
export interface IGlobalStateSlice {

  // TextToSpeech Loading
  ttsLoading: boolean;
  setTtsLoading: (ttsLoading: boolean) => void;

  // Currently Speaking
  currentlySpeaking: boolean
  setCurrentlySpeaking: (currentlySpeaking: boolean) => void


  // Highlight
  stopSpeech: number, // Incremented to act as an event emitter
  highlightIndex: number,
  highlightTimeouts: NodeJS.Timeout[],
  setHighlightIndex: (highlightIndex: number) => void
  setHighlightTimeouts: (highlightTimeouts: NodeJS.Timeout[]) => void,


  // Text-To-Speech
  textToSpeechQueue: ClipboardData[],
  textToSpeechQueueSize: number,
  setTextToSpeechQueue: (textToSpeechQueue: ClipboardData[]) => void,


  // Drag and Drop
  dragAndDropModalOpen: boolean,
  setDragAndDropModalOpen: (dragAndDropModalOpen: boolean) => void,


  // Output Linger
  replaySpeech: number, // Incremented to act as an event emitter
  currentLingeringOutput: OutputLingerData | null,
  setCurrentLingeringOutput: (currentLingeringOutput: OutputLingerData | null) => void,


  // Spelling
  spellCheckText: string,
  spellCheckSuggestions: SpellCheckSuggestion[],
  setSpellCheckText: (spellCheckText: string) => void,
  setSpellCheckSuggestions: (spellCheckSuggestions: SpellCheckSuggestion[]) => void,
}

export const createGlobalStateSlice: StoreSlice<IGlobalStateSlice> = (set, get) => ({

  // TextToSpeech Loading
  ttsLoading: false,
  setTtsLoading: (ttsLoading: boolean) => {
    set(state => ({...state, ttsLoading}))
  },

  // Currently Speaking
  stopSpeech: 0,
  currentlySpeaking: false,
  setCurrentlySpeaking: (currentlySpeaking: boolean) => {
    set(state => ({...state, currentlySpeaking}))
  },


  // Highlight
  highlightIndex: -1,
  highlightTimeouts: [],
  setHighlightIndex: (highlightIndex) => {
    set(state => ({...state, highlightIndex}))
  },
  setHighlightTimeouts: (highlightTimeouts: NodeJS.Timeout[]) => {
    set(state => ({...state, highlightTimeouts}))
  },


  // Text-To-Speech
  textToSpeechQueue: [],
  textToSpeechQueueSize: 15,
  setTextToSpeechQueue: (textToSpeechQueue: ClipboardData[]) => {
    set(state => ({...state, textToSpeechQueue}))
  },


  // Drag and Drop
  dragAndDropModalOpen: false,
  setDragAndDropModalOpen: (dragAndDropModalOpen: boolean) => {
    set(state => ({...state, dragAndDropModalOpen}))
  },


  // Output Linger
  replaySpeech: 0,
  currentLingeringOutput: null,
  setCurrentLingeringOutput: (currentLingeringOutput: OutputLingerData | null) => {
    set(state => ({...state, currentLingeringOutput: currentLingeringOutput}))
  },


  // Spelling
  spellCheckText: "",
  spellCheckSuggestions: [],
  setSpellCheckText: (spellCheckText: string) => {
    set(state => ({...state, spellCheckText}))
  },
  setSpellCheckSuggestions: (spellCheckSuggestions: SpellCheckSuggestion[]) => {
    set(state => ({...state, spellCheckSuggestions}))
  }
})
