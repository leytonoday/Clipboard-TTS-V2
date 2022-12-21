import {
  TTSMutation,
  Substitution,
  IToggleOption,
  IComplexOption,
  ICommandOption,
  AccordationItem,
  TextToSpeechVoiceGender,
  WhatsNewData,
} from "renderer/types"
import {
  faCog,
  faBook,
  faFill,
  faBold,
  faFont,
  faPlay,
  faPause,
  faPowerOff,
  faLanguage,
  faWaveSquare,
  faSquareFull,
  faHighlighter,
  faClockRotateLeft,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons"
import { useStore }     from "renderer/store"
import { isApiKeySet }  from "renderer/utils"
import { UseToastOptions } from "@chakra-ui/react"
import { CURRENT_VERSION } from "./constants"

export const options: Array<IToggleOption | IComplexOption | ICommandOption> = [
  {
    name: "Enable / Disable",
    icon: () => faPowerOff,
    disabled: () => {
      return !isApiKeySet();
    }
  },
  {
    name: "Stop Speech",
    icon: () => faSquareFull,
    command: () => {
      const store = useStore.getState();
      useStore.setState({ ...store, stopSpeech: store.stopSpeech + 1 }) // Increment this to act as an event emitter
    },
    disabled: () => !useStore.getState().currentlySpeaking
  },
  {
    name: "Pause / Resume",
    icon: () => !useStore.getState().currentlyPaused ? faPause : faPlay,
    command: () => {
      const store = useStore.getState();
      useStore.setState({ ...store, pauseSpeech: store.pauseSpeech + 1 }) // Increment this to act as an event emitter
    },
    disabled: () => !useStore.getState().currentlySpeaking
  },
  {
    name: "Language & Translation",
    icon: () => faLanguage,
    path: "/option/language/",
    active: () => useStore.getState().translationEnabled
  },
  {
    name: "Substitutions",
    icon: () => faArrowRightArrowLeft,
    path: "/option/substitutions/",
    active: () => useStore.getState().substitutionsEnabled
  },
  {
    name: "Dictionary",
    icon: () => faBook,
    path: "/option/dictionary/",
    active: () => useStore.getState().autoDictionary
  },
  {
    name: "Audio Config",
    icon: () => faWaveSquare,
    path: "/option/audio-config/",
    active: () => {
      const store = useStore.getState();
      return  store.speakingPitch !== defaultSpeakingPitch ||
              store.speakingRate !== defaultSpeakingRate ||
              store.volumeGainDb !== defaultVolumeGainDb ||
              store.sampleRate !== defaultSampleRate;
    }
  },
  {
    name: "Highlight",
    icon: () => faHighlighter,
    path: "/option/highlight/",
    active: () => useStore.getState().highlightEnabled,
    disabled: () => useStore.getState().voice.name.includes("Neural2")
  },
  {
    name: "Overlay",
    icon: () => faFill,
    path: "/option/overlay/",
    active: () => useStore.getState().currentlyActiveOptions.includes("Overlay")
  },
  {
    name: "Font",
    icon: () => faFont,
    path: "/option/font/"
  },
  {
    name: "Bionic Reading",
    icon: () => faBold,
  },
  {
    name: "History",
    icon: () => faClockRotateLeft,
    path: "/option/history/",
  },
  {
    name: "Settings",
    icon: () => faCog,
    path: "/option/settings/",
  },
]

export const optionsDefaultOrder = options.map((option, index) => { return {key: option.name, displayOrder: index} })

export const defaultAccent = "#4F9EAF"

export const colours = [ "#fbe784",  "#f8ff71", "#d6ff5b", "#acff7d", "#9afced", "#98d6fd", "#98befd", "#dea3fd", "#dd8fff", "#fe86e8", "#feb0d8", "#ffaf74" ]

export const availableFonts = ["Agency FB", "Algerian", "Anonymous Pro for Powerline", "Arial", "Arial Rounded MT", "Arimo for Powerline", "Bahnschrift", "Baskerville Old Face", "Bauhaus 93", "Bell MT", "Berlin Sans FB", "Bernard MT", "Blackadder ITC", "Bodoni MT Poster", "Bodoni MT", "Book Antiqua", "Bookman Old Style", "Bookshelf Symbol 7", "Bradley Hand ITC", "Britannic", "Broadway", "Brush Script MT", "Calibri", "Californian FB", "Calisto MT", "Cambria", "Cambria Math", "Candara", "Cascadia Code", "Cascadia Mono", "Castellar", "Centaur", "Century", "Century Gothic", "Century Schoolbook", "Chiller", "Colonna MT", "Comic Sans MS", "Consolas", "Constantia", "Cooper", "Copperplate Gothic", "Corbel", "Courier New", "Cousine for Powerline", "Curlz MT", "DejaVu Sans Mono for Powerline", "Droid Sans Mono Dotted for Powerline", "Droid Sans Mono for Powerline", "Droid Sans Mono Slashed for Powerline", "Dubai", "Ebrima", "Edwardian Script ITC", "Elephant", "Engravers MT", "Eras ITC", "Felix Titling", "Fira Mono for Powerline", "Footlight MT", "Forte", "Franklin Gothic Book", "Franklin Gothic", "Freestyle Script", "French Script MT", "Gabriola", "Gadugi", "Garamond", "Georgia", "Gigi", "Gill Sans MT", "Gill Sans", "Global Monospace", "Global Sans Serif", "Global Serif", "Global User Interface", "Gloucester MT", "Go Mono for Powerline", "Goudy Old Style", "Goudy Stout", "Hack", "Haettenschweiler", "Harlow Solid", "Harrington", "High Tower Text", "HoloLens MDL2 Assets", "IBM 3270 Semi", "IBM 3270", "Impact", "Imprint MT Shadow", "Inconsolata for Powerline BoldForPowerline", "Inconsolata for Powerline", "Inconsolata-dz for Powerline", "Inconsolata-g for Powerline", "Informal Roman", "Ink Free", "Javanese Text", "Jokerman", "Juice ITC", "Kristen ITC", "Kunstler Script", "Leelawadee", "Leelawadee UI", "Liberation Mono for Powerline", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "Lucida Handwriting", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Lucida Sans", "Magneto", "Maiandra GD", "Malgun Gothic", "Marlett", "Matura MT Script Capitals", "Meslo LG L DZ for Powerline", "Meslo LG L for Powerline", "Meslo LG M DZ for Powerline", "Meslo LG M for Powerline", "Meslo LG S DZ for Powerline", "Meslo LG S for Powerline", "Microsoft Himalaya", "Microsoft JhengHei UI", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei UI", "Microsoft Yi Baiti", "MingLiU-ExtB", "MingLiU_HKSCS-ExtB", "Mistral", "Modern No. 20", "Mongolian Baiti", "monofur for Powerline", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MV Boli", "Myanmar Text", "Niagara Engraved", "Niagara Solid", "Nirmala UI", "Noto Mono for Powerline", "NovaMono for Powerline", "OCR A", "Old English Text MT", "Onyx", "Palace Script MT", "Palatino Linotype", "Papyrus", "Parchment", "Perpetua", "Perpetua Titling MT", "Playbill", "PMingLiU-ExtB", "Poor Richard", "Pristina", "ProFont for Powerline", "Rage", "Ravie", "Roboto Mono for Powerline", "Roboto Mono Light for Powerline", "Roboto Mono Medium for Powerline", "Roboto Mono Thin for Powerline", "Rockwell", "Script MT", "Segoe MDL2 Assets", "Segoe Print", "Segoe Script", "Segoe UI Emoji", "Segoe UI Historic", "Segoe UI Symbol", "Segoe UI", "Showcard Gothic", "SimSun-ExtB", "Sitka Banner", "Sitka Display", "Sitka Heading", "Sitka Small", "Sitka Subheading", "Sitka Text", "Snap ITC", "Source Code Pro for Powerline", "Space Mono for Powerline", "Space Mono", "Stencil", "Sylfaen", "Symbol", "Symbol Neu for Powerline", "Tahoma", "TeamViewer15", "Tempus Sans ITC", "Times New Roman", "Tinos for Powerline", "Trebuchet MS", "Tw Cen MT", "Ubuntu Mono derivative Powerline", "Verdana", "Viner Hand ITC", "Vivaldi", "Vladimir Script", "Webdings", "Wide Latin", "Wingdings", "Wingdings 2", "Wingdings 3", "Yu Gothic UI", "Yu Gothic", "宋体", "微软雅黑", "新宋体", ]

export const defaultFont = "Segoe UI"

export const audioProfiles = ['headphone-class-device', 'small-bluetooth-speaker-class-device', 'medium-bluetooth-speaker-class-device', 'large-home-entertainment-class-device']
export const defaultAudioProfile = 'medium-bluetooth-speaker-class-device'

export const defaultVoice = {
  languageCodes: ["en-US"],
  name: "en-US-Wavenet-D",
  ssmlGender: "MALE" as TextToSpeechVoiceGender,
  naturalSampleRateHertz: 24000,
  languageDescriptions: ["English"]
}

export const defaultSubstitutions: Substitution[] = [
  {
    before: "(https?:\/\/(www\.)?)",
    after: "",
    matchCase: false
  },
  {
    before: "[[0-9]+]",
    after: "",
    matchCase: false
  }
]

export const defaultOrderOfMutations: TTSMutation[] = ["IMAGE_TO_TEXT", "TRANSLATION", "SUBSTITUTIONS", "DICTIONARY"]

export const defaultSampleRate = 24000
export const defaultSpeakingRate = 1
export const defaultSpeakingPitch = 0
export const defaultVolumeGainDb = 0

export const instructions: AccordationItem[] = [
  {
    title: "How to acquire credentials",
    text: `This application requires a Google Cloud Platform API key to function. You can get one by following these steps:
      <br /><br />
      <ol style="margin-left: 1em">
        <li>Go to <span style="color: blue;">https://developers.google.com/workspace/guides/create-project</span>, and follow the instructions to make
          a new project. You can name it whatever you want. Don't worry about the billing information, you won't be charged anything.
        </li>
        <li>
          Once you've created the project, go to the Google Cloud Console, then the APIs & Services tab, and click
          on Enable APIs and Services</span>.
        </li>
        <li>
          Search for 'Cloud Text-to-Speech API' and click on it. Then click Enable API.
        </li>
        <li>
          Search for 'Cloud Translation API' and click on it. Then click Enable API.
        </li>
        <li>
          Search for 'Cloud Vision API' and click on it. Then click Enable API.
        </li>
        <li>
          Now that you have all the APIs enabled, go to the Credentials tab, and click on Create Credentials.
        </li>
        <li>
          Select API key option, and then copy this API key. Input this API key in Settings > General Management > Credentials.
        </li>
      </ol>
    `
  },
  {
    title: "General Instructions",
    text: `Click the power button (or press Control+[) to enable the application. Then, any text you copy to the clipboard is immediately read out loud. This includes images also; if you
      copy an image to the clipboard, the image is scanned for text, and this text is read out loud. By enabling the options you can mutate the output audio in various ways.

      <br/><br/>

      Most options have a preview window with the most important settings, so with a quick hover you can alter the most significant and useful settings.`
  },
  {
    title: "Stop Speech",
    text: `Click the stop button (or press Control+]) to stop the current speech. If there are items in the queue, the next item will immediately begin processing
      and will be read out loud shortly after.`
  },
  {
    title: "Language and Translation",
    text: `You can change the language of the output audio (by pressing Control+,), choosing between three categories of voices: Neural2, Standard, and Wavenet. Neural2 voices are the most
      accurate and expensive, but limited in number. Wavenet voices are very high quality and also expensive, and have a large number of voices. Standard voices
      are the cheapest and worst sounding voices, but have the largest number of voices. With the vast majority of languages, you have a selection of several different
      male and female voices.

      <br/><br/>

      An example of when you should change the voice is when you're reading text of another language. For example, if you're reading Japanese text, the English US
      voice won't pronounce it correctly, and thus the Japanese voice is more appropriate.

      <br/><br/>

      You can also enable Auto Translation, which will automatically detect the language of the copied text, and translate it to the language of the output audio.
      For example if you have your voice set to English US, and you copy some Spanish text, it'll be translated into English US before being read out loud.`
  },
  {
    title: "Substitutions",
    text: `You can add substitutions to the text before it's read out loud (by pressing Control+.). For example, if you have a substitution that replaces all instances of "hello" with "hi". Another
      example is if your text has a dot in it, but you don't want the Text-to-Speech to pause (it'll think the dot signifies the end of a sentence, and thus it will pause).
      In this case, you'd replace "Node.js" with "Node js".
      <br /><br />
      There are two default substitutions. The first is to remove the "https://" and "http://" from the beginning of URLs. The second is to remove the "[1]" from
      Wikipedia articles.`
  },
  {
    title: "Dictionary",
    text: `
      You can search the definition of words here, and save them for later reference. Another useful feature is Auto Dictionary (press Control+/), which will automatically
      read out the definition of any word that you copy to the clipboard.`
  },
  {
    title: "Audio Configuration",
    text: `
      You can change the audio profile, which will change the audio quality. The default is "medium-bluetooth-speaker-class-device", which is entirely arbitrary.
      You can also change the audio pitch, volume gain db (how loud the audio is), the speaking rate (how fast the audio is), and the sample rate (how high quality the audio is).

      <br /><br />
      One interesting setting is the audio profile, which is a setting that Google has defined for various audio devices. For example, if you're listening to the audio
      on a small bluetooth speaker, you'd want to use the "small-bluetooth-speaker-class-device" profile. If you're listening to the audio on a large home entertainment
      system, you'd want to use the "large-home-entertainment-class-device" profile.
      This will change the audio quality to be more appropriate for the device you're listening to it on.`
  },
  {
    title: "Highlight",
    text: `
      You can highlight the text that's currently being read out loud. This is useful if you're reading a long article, and you want to know which part of the article
      is currently being read out loud. The current sentence is highlighted in whatever colour you choose. If you dislike the default colours, you can choose a custom one.
      <br /><br />
      Auto Text Colour will automatically change the text colour to be the most readable colour based on how bright the highlight colour is. For example, if you're in dark mode,
      and you have a bright highlight colour, the text colour will be changed to black so that it's readable. If you're in light mode, and you have a dark highlight colour,
      the text colour will be changed to white so that it's readable.`
  },
  {
    title: "Overlay",
    text: `
      You can enable an overlay, which basically changes the colour of the background of the output box, simulating the effect of a physical overlay. This is useful
      for dyslexic people, who have trouble reading text on a white background. The aim of this feature is to improve the readability of the text.
      <br /><br />
      Auto Text Colour will automatically change the overlay colour to be the most readable colour based on how bright the highlight colour is.
      For example, if you're in dark mode, and you have a bright overlay colour, the text colour will be changed to black so that it's readable. If you're in light mode,
      and you have a dark overlay colour, the text colour will be changed to white so that it's readable.
      <br /><br />
      Auto Text Colour for overlay is overridden within the highlighted area when Auto Text Colour for Highlight is enabled.`
  },
  {
    title: "Font",
    text: `
      You can change the font of the output, the letter spacing, and also the font size. You get a miniuature preview of what the text will look like
      after your settings are applied.`
  },
  {
    title: "Bionic Reading",
    text: `
      Inspired by <span style="color: blue;">www.bionic-reading.com</span>. This implementation is much more rudimentary, but it's pretty much the same.
      The first half of the word is bold, and so it guides the eye over the text by creating artificial fixation points.`
  },
  {
    title: "Setttings - Output Linger",
    text: `
      Enabling this causes the output text to linger, and not be cleared immediately after the speech has finished. This is useful for when you need to re-read the text,
      or re-listen to the audio. You can replay the audio by clicking the play button, or download the audio by clicking the download button.`
  },
  {
    title: "Settings - Character Limit",
    text: `
      You can set a character limit to save costs, to prevent hundreds or thousands of characters being read out at once. Also, if the limit is too high, you'll find that
      you zone out and don't remember what you've read. A limit of 2000 is recommended.`
  },
  {
    title: "Settings - Order of Mutations",
    text: `
      You can change the order of mutations. For example, the default is for translation to occur before substitutions, but if you dislike this, you can change the order
      easily. Image to text must be first however.`
  },
]

export const tipsAndTricks: AccordationItem[] = [
  {
    title: "Useful Keyboard Shortcuts",
    text: `
      As well as the keyboard shortcuts listed in the Help section, there are some other useful keyboard shortcuts that you can use.
      They are listed below:
      <br/><br/>
      <div style="margin-left: 1em;">
        <ul>
          <li>Control + C - Copy</li>
          <li>Windows Key + Shift + S - Screenshot</li>
        </ul>
      </div>
    `
  },
  {
    title: "Study Tips",
    text: `When you're studying, you should increase the speaking rate to 1.5x to churn through the text faster. Press the "Enable / Disable" button,
      and leave this app in the background while you study. It'll still be detecting clipboard changes and reading out the text.`
  },
  {
    title: "Image to text",
    text: `
      An unintentional feature of this application is that you can use it to convert images to text. Simply copy text, and then go to the History option, and
      you can see the scanned text from the image.
    `
  },
]

export const faqs: AccordationItem[] = [
  {
    title: "Why do I need an API key? Isn't this application free?",
    text: `
      This application is free, but I didn't want to compromise on the quality of the Text-to-Speech, and so I chose to use Google's Text-to-Speech API. This is a paid
      service, however as you can see in Settings > General Management > Pricing, all of the APIs that I use have a free monthly quota. You would never exceed this
      monthly quota, even if you used this application every day. Therefore, you're extremely unlikely to ever pay a penny.`
  },
  {
    title: "Why is the audio quality so bad?",
    text: `The audio quality is determined by the audio profile and sample rate that you choose. You need to choose the appropriate audio profile most suitable
      for the device that you're listening to the audio on. You should also increase the sample rate if you're experiencing audio quality issues.`
  },
  {
    title: "Why is the audio quality so good?",
    text: `Neural2 and Wavenet voices all sound great, but they're slightly more expensive than the standard voices. You're still likely to never pay a penny each month however.`
  },
  {
    title: "Why can't I drag and drop PDF files?",
    text: `Considering that there is a character limit, dropping a whole PDF is rarely going to even work, seen as the text is likely to be over 2000 characters`
  },
  {
    title: "Why is the drag and drop file size limit 15MB?",
    text: `This is totally arbitrary. If you want it changing, please let me know. I just don't think a 15MB text file or image is too common.`
  },
  {
    title: "Why is one highlight and one overlay colour disabled?",
    text: `This is because the highlight and overlay cannot be the same colour, and so if the colour of the highlight is X, then colour X is disabled for the overlay, and
      vice versa.`
  },
  {
    title: "Why can't I change the settings when replaying audio?",
    text: `When you copy the text, after all processing, a request is sent to the Google Cloud Text-to-Speech API, and if Output Linger is enabled, the result of this
      request is cached. This is so that you can replay the audio without having to wait for the request to be sent again. If you change the settings, the cached result
      is still the result of the previous request, and so the new settings are not applied. To hear the audio with the new settings applied, you need to copy the text again.`
  },
]

export const invalidCredentialsToast: UseToastOptions = {
  title: "Invalid Credentials",
  description: "Ensure API key is valid. See Settings > Help > Instructions for more information",
  status: "error",
  duration: 5000,
  isClosable: true
}

export const invalidInputToast: UseToastOptions = {
  title: "Invalid Input",
  description: "Input is invalid. Ensure that you have copied UTF-8 text",
  status: "error",
  duration: 5000,
  isClosable: true
}

export const unknownErrorToast: UseToastOptions = {
  title: "Unknown Error",
  description: "An unknown error has occurred. Report this to the developer, with the steps to reproduce this error",
  status: "error",
  duration: 5000,
  isClosable: true
}

export const unsupportedTranslationToast: UseToastOptions = {
  title: "Unsupported Translation",
  description: "The language you're trying to translate to is not supported by Google Cloud Translation API. Disable Translation when using this language. Example sentence will also fail to translate",
  status: "error",
  duration: 5000,
  isClosable: true
}

export const networkErrorToast: UseToastOptions = {
  title: "Network Error",
  description: "Ensure you have an internet connection",
  status: "error",
  duration: 5000,
  isClosable: true
}

export const stoppingPunctuation = [".", "!", "?", "。", "෴", "।", "॥", "။", "።"]

export const whatsNewData: WhatsNewData = {
  version: CURRENT_VERSION,
  bugFixes: [
    "Implemented error handling for unsupported translation voice",
    "Fixed small bug caused by Neural2 voices not supporting SSML",
    "Minimized jumping when highlighting enabled in Output Box",
    "Fixed bug where Flags would not load (Flag API was down)"
  ],
  newFeatures: [
    "Changing the Audio Configuration now causes the option icon to change colour to the accent colour, to indicate that the audio configuration has been changed from the default"
  ]
}

export const defaultVoiceExampleSentence = "This is an example sentence, demonstrating this voice.";
