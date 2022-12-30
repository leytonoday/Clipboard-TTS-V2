import { StoreSlice }                       from 'renderer/store';
import { ClipboardData, OutputLingerData }  from 'renderer/types';
import { HighlightTimeout } from 'renderer/utils';

// This store slice is used solely as a means for cross-component communication.
export interface IGlobalStateSlice {

  // Split Screen
  splitScreenActive: boolean, // is the split screen mode active? it can be enabled, but not actually active
  setSplitScreenActive: (splitScreenActive: boolean) => void,

  // TextToSpeech Loading
  ttsLoading: boolean;
  setTtsLoading: (ttsLoading: boolean) => void;

  // Currently Speaking
  currentlySpeaking: boolean
  setCurrentlySpeaking: (currentlySpeaking: boolean) => void


  // Highlight
  stopSpeech: number, // Incremented to act as an event emitter
  highlightIndex: number,
  highlightTimeouts: HighlightTimeout[],
  pausedHighlightIndex: number,
  pausedHighlightTimeouts: HighlightTimeout[],
  setHighlightIndex: (highlightIndex: number) => void
  setHighlightTimeouts: (highlightTimeouts: HighlightTimeout[]) => void,
  setPausedHighlightIndex: (pausedHighlightIndex: number) => void
  setPausedHighlightTimeouts: (pausedHighlightTimeouts: HighlightTimeout[]) => void,


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


  // Pause Speech
  pauseSpeech: number, // Incremented to act as an event emitter
  currentlyPaused: boolean,
  setCurrentlyPaused: (currentlyPaused: boolean) => void,
}

export const createGlobalStateSlice: StoreSlice<IGlobalStateSlice> = (set, get) => ({

  // Split Screen
  splitScreenActive: false,
  setSplitScreenActive: (splitScreenActive: boolean) => {
    set(state => ({...state, splitScreenActive}))
  },

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
  pausedHighlightIndex: -1,
  pausedHighlightTimeouts: [],
  setHighlightIndex: (highlightIndex) => {
    set(state => ({...state, highlightIndex}))
  },
  setHighlightTimeouts: (highlightTimeouts: HighlightTimeout[]) => {
    set(state => ({...state, highlightTimeouts}))
  },
  setPausedHighlightIndex: (pausedHighlightIndex) => {
    set(state => ({...state, pausedHighlightIndex}))
  },
  setPausedHighlightTimeouts: (pausedHighlightTimeouts: HighlightTimeout[]) => {
    set(state => ({...state, pausedHighlightTimeouts}))
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


  // Pause Speech
  pauseSpeech: 0,
  currentlyPaused: false,
  setCurrentlyPaused: (currentlyPaused: boolean) => {
    set(state => ({...state, currentlyPaused}))
  }
})
