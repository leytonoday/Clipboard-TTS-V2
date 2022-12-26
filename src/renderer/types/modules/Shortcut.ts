export interface Shortcut {
  keybinding: string;
  command: () => void;
  commandName: string;
  tooltip: string;
}
