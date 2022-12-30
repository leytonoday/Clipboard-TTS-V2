import axios              from "axios"
import { useStore }       from "renderer/store"
import { TRANSLATE_URL }  from "renderer/misc/constants"

export const translate = async (text: string, target: string, source?: string): Promise<{text: string, detectedLanguage: string}> => {
  const response = await axios.post(`${TRANSLATE_URL}${useStore.getState().apiKey}`, {
    q: text,
    target: target,
    source: source ? source : undefined,
    format: "text"
  })

  const translatedText = response.data.data.translations[0].translatedText;
  const detectedLanguage = response.data.data.translations[0].detectedSourceLanguage;

  // the response is html encoded, and so it must be decoded
  return {
    text: new DOMParser().parseFromString(translatedText, "text/html").documentElement.textContent as string,
    detectedLanguage
  };
}
