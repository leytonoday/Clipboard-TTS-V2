import { useLayoutEffect }  from "react"
import { useStore } from 'renderer/store';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import 'intro.js/themes/introjs-modern.css';
import { isApiKeySet } from "renderer/utils";

export const useOnboarding = () => {
  useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      if (!isApiKeySet() || useStore.getState().currentOpenOptionPath !== "")
        return;

      if (useStore.getState().isOnboardingComplete) {
        clearInterval(intervalId);
        return;
      }

      introJs().oncomplete(() => {
        useStore.getState().setIsOnboardingComplete(true)
      }).onexit(() => {
        useStore.getState().setIsOnboardingComplete(true)
      }).start()
      clearInterval(intervalId);
    }, 500);
  }, [])
}
