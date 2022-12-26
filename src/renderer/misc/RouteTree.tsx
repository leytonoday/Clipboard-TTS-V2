import { useRoutes, RouteObject } from "react-router-dom";

import Home from "renderer/pages/Home/Home"

import HighlightOption from 'renderer/components/options/features/highlight/highlight-option/HighlightOption'
import HighlightOptionPreview from 'renderer/components/options/features/highlight/highlight-option-preview/HighlightOptionPreview'

import OverlayOption from "renderer/components/options/features/overlay/overlay-option/OverlayOption"
import OverlayOptionPreview from 'renderer/components/options/features/overlay/overlay-option-preview/OverlayOptionPreview'

import FontOption from 'renderer/components/options/features/font/font-option/FontOption'
import FontOptionPreview from 'renderer/components/options/features/font/font-option-preview/FontOptionPreview'

import LanguageOption from "renderer/components/options/features/language/language-option/LanguageOption"
import LanguageOptionPreview from "renderer/components/options/features/language/language-option-preview/LanguageOptionPreview"

import AudioConfigOption from 'renderer/components/options/features/audio-config/audio-config-option/AudioConfigOption'
import AudioConfigOptionPreview from 'renderer/components/options/features/audio-config/audio-config-option-preview/AudioConfigOptionPreview'

import SubstitutionsOption from 'renderer/components/options/features/substitutions/substitutions-option/SubstitutionsOption'
import SubstitutionOptionsPreview from 'renderer/components/options/features/substitutions/substitutions-option-preview/SubstitutionsOptionPreview'

import HistoryOption from 'renderer/components/options/features/history/history-option/HistoryOption'
import HistoryOptionPreview from 'renderer/components/options/features/history/history-option-preview/HistoryOptionPreview'

import DictionaryOption from "renderer/components/options/features/dictionary/dictionary-option/DictionaryOption";
import DictionaryOptionPreview from "renderer/components/options/features/dictionary/dictionary-option-preview/DictionaryOptionPreview";
import SavedWords from "renderer/components/options/features/dictionary/dictionary-option/sub-options/saved-words/SavedWords";

import SettingsOption from "renderer/components/options/features/settings/settings-option/SettingsOption";
import SettingsOptionPreview from 'renderer/components/options/features/settings/settings-option-preview/SettingsOptionPreview'
import OptionsBarSettings from 'renderer/components/options/features/settings/settings-option/sub-options/options-bar-settings/OptionsBarSettings'
import AppearanceSettings from 'renderer/components/options/features/settings/settings-option/sub-options/appearance-settings/AppearanceSettings'
import GeneralManagementSettings from 'renderer/components/options/features/settings/settings-option/sub-options/general-management-settings/GeneralManagementSettings'
import Help from "renderer/components/options/features/settings/settings-option/sub-options/help/Help"
import Info from "renderer/components/options/features/settings/settings-option/sub-options/info/Info"
import DeveloperSettings from "renderer/components/options/features/settings/settings-option/sub-options/developer-settings/DeveloperSettings"

import TextToSpeechQueue from "renderer/pages/Home/components/TextToSpeechQueue"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "text-to-speech-queue",
        element: <TextToSpeechQueue />,
      },
      {
        path: "option/highlight",
        element: <HighlightOption />,
      },
      {
        path: "option/highlight/preview",
        element: <HighlightOptionPreview />,
      },
      {
        path: "option/overlay",
        element: <OverlayOption />,
      },
      {
        path: "option/overlay/preview",
        element: <OverlayOptionPreview />,
      },
      {
        path: "option/font",
        element: <FontOption />,
      },
      {
        path: "option/font/preview",
        element: <FontOptionPreview />,
      },
      {
        path: "option/language",
        element: <LanguageOption />,
      },
      {
        path: "option/language/preview",
        element: <LanguageOptionPreview />,
      },
      {
        path: "option/audio-config",
        element: <AudioConfigOption />,
      },
      {
        path: "option/audio-config/preview",
        element: <AudioConfigOptionPreview />,
      },
      {
        path: "option/substitutions",
        element: <SubstitutionsOption />,
      },
      {
        path: "option/substitutions/preview",
        element: <SubstitutionOptionsPreview />,
      },
      {
        path: "option/history",
        element: <HistoryOption />
      },
      {
        path: "option/history/preview",
        element: <HistoryOptionPreview />
      },
      {
        path: "option/dictionary/",
        element: <DictionaryOption />,
        children: [
          {
            path: "sub-options/saved-words",
            element: <SavedWords />
          }
        ]
      },
      {
        path: "option/dictionary/preview",
        element: <DictionaryOptionPreview />
      },
      {
        path: "option/settings",
        element: <SettingsOption />,
        children: [
          {
            path: "sub-options/options-bar-settings",
            element: <OptionsBarSettings />,
          },
          {
            path: "sub-options/appearance-settings",
            element: <AppearanceSettings />,
          },
          {
            path: "sub-options/general-management-settings",
            element: <GeneralManagementSettings />,
          },
          {
            path: "sub-options/help",
            element: <Help />,
          },
          {
            path: "sub-options/info",
            element: <Info />,
          },
          {
            path: "sub-options/developer-settings",
            element: <DeveloperSettings />,
          }
        ]
      },
      {
        path: "option/settings/preview",
        element: <SettingsOptionPreview />,
      }
    ]
  },
]

const RouteTree = () => {
  return useRoutes(routes)
}

export default RouteTree;
