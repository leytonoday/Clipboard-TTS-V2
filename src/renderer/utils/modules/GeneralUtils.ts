import * as lookup      from 'country-code-lookup';
import { useStore }     from "renderer/store";
import { FLAG_API_URL } from 'renderer/misc/constants';

export function escapeHtml(unsafe: string): string {
  return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function paginateArray(data: any, currentPage: number, pageSize: number): any {
  if (Array.isArray(data))
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  else // Object
    return Object.fromEntries(Object.entries(data).slice(currentPage * pageSize, (currentPage + 1) * pageSize))
}

export function brightnessToTextColour (hexColour: string) { // https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
  hexColour = hexColour.replace("#", "")
  const r = parseInt(hexColour.substr(0,2),16)
  const g = parseInt(hexColour.substr(2,2),16)
  const b = parseInt(hexColour.substr(4,2),16)
  const yiq = ((r*299)+(g*587)+(b*114))/1000
  return (yiq >= 150) ? 'black' : 'white'
}

export function findNthIndex(str: string, char: string, n: number): number {
  let i = -1;
  while (n-- && i++ < str.length) {
    i = str.indexOf(char, i);
    if (i < 0) break;
  }
  return i;
}

export function removeLastInstanceOf(str: string, item: string): string {
  return str.substring(0, str.lastIndexOf(item)) + str.substring(str.lastIndexOf(item) + item.length);
}

export function removeFirstInstanceOf(str: string, item: string): string {
  return str.substring(0, str.indexOf(item)) + str.substring(str.indexOf(item) + item.length);
}

export function countryCodeToCountry(countryCode: string) {
  // @ts-ignore
  const countryData = lookup.byIso(countryCode)

  return countryData ? countryData.country : "Unknown";
}

export function getFlagUrl(countryCode: string){
  if (countryCode === "XA")
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Flag_of_the_Arab_Federation.svg/1200px-Flag_of_the_Arab_Federation.svg.png"

  return `${FLAG_API_URL}${countryCode}`
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

export function optionNameToOnbourdingData(name: string) {
  switch (name) {
    case "Enable / Disable": {
      return { dataStep: 3, dataIntro: `Use this option to Enable / Disable Clipboard TTS. When this option is enabled, Clipboard TTS will
        scan the clipboard for changes and read them aloud instantly.` }
    }
    case "Stop Speech": {
      return { dataStep: 4, dataIntro: `Use this option to stop the current speech.` }
    }
    case "Language & Translation": {
      return { dataStep: 5, dataIntro: `Use this option to change the language and voice of the Text-to-Speech, or to enable tralsation` }
    }
    case "Substitutions": {
      return { dataStep: 6, dataIntro: `Use this option to add or remove substitutions. Substitutions are used to replace words or phrases with your custom replacements`}
    }
    case "Dictionary": {
      return { dataStep: 7, dataIntro: `Use this option to look up and save words to your own dictionary, or to enable auto dictionary lookup`}
    }
    case "Audio Config": {
      return { dataStep: 8, dataIntro: `Use this option to maniuplate the speaking rate, speaking pitch, etc.`}
    }
    case "Highlight": {
      return { dataStep: 9, dataIntro: `Use this option to enable highlighting, to follow along with the speech, or to change the highlight colour`}
    }
    case "Overlay": {
      return { dataStep: 10, dataIntro: `Use this option to enable the overlay for improved text readability, or to change the overlay colour`}
    }
    case "Font": {
      return { dataStep: 11, dataIntro: `Use this option to customize the font styles of the output box`}
    }
    case "Bionic Reading": {
      return { dataStep: 12, dataIntro: `Use this option to enable Bionic Reading, which could help you read faster using artificial fixation points in the output box text`}
    }
    case "History": {
      return { dataStep: 13, dataIntro: `Use this option to view your recent Clipboard TTS history`}
    }
    case "Settings": {
      return { dataStep: 14, dataIntro: `Use this option to customize the appearance and behaviour of Clipboard TTS, or to read the help material`}
    }
    default: {
      return {}
    }
  }
}

export function asynchronousSleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function removePunctuation(str: string) {
  return str.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"")
}

export function hasPunctuation(str: string): boolean {
  return /[.,\/#!?$%\^&\*;:{}=\-_`~()]/g.test(str)
}

// remove punctuation from the beginning and end of a string
export function trimPunctuation(str: string) {
  return str.replace(/^[.,\/#!?$%\^&\*;:{}=\-_`~()]+|[.,\/#!?$%\^&\*;:{}=\-_`~()]+$/g, "")
}

export class HighlightTimeout {
  private timeoutDuration: number
  private startTime: number
  private timeout: NodeJS.Timeout | null
  private highlightIndex: number

  constructor(highlightIndex: number, timeoutDuration: number) {
    this.timeoutDuration = timeoutDuration
    this.startTime = -1
    this.timeout = null
    this.highlightIndex = highlightIndex
  }

  public start() {
    this.startTime = Date.now()
    this.timeout = setTimeout(() => {
      useStore.getState().setHighlightIndex(this.highlightIndex)
    }, this.timeoutDuration)
  }

  public getTimeLeft(): number {
    return this.timeoutDuration - (Date.now() - this.startTime)
  }

  public clear() {
    if (this.timeout)
      clearTimeout(this.timeout)
  }

  public getHighlightIndex() {
    return this.highlightIndex
  }
}
