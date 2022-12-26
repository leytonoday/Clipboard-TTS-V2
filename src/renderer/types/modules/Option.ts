import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface BaseOption {
  name: string;
  icon: () => IconDefinition;
  disabled?: (...args: any[]) => boolean;
  active?: (...args: any[]) => boolean;
}

export interface IToggleOption extends BaseOption {
  debounce?: number;
  isEnabled?: boolean;
}

export interface ICommandOption extends BaseOption {
  command: () => void;
  debounce?: number;
}

export interface IComplexOption extends BaseOption {
  path: string;
}

export type OptionBarPositon = "LEFT" | "RIGHT" | "TOP" | "BOTTOM";
