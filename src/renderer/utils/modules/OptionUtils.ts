import {
  ICommandOption,
  IComplexOption,
  IToggleOption
} from "renderer/types";
import { useStore }         from "renderer/store"
import { electronStoreSet } from "./ElectronUtils"

export function getOptionType(option: ICommandOption | IComplexOption | IToggleOption): string {
  if ("path" in option)
    return "complex"
  else if ("command" in option)
    return "command"
  else
    return "toggle"
}

export function sortByDisplayOrder(input: any[], displayOrder: {key: string, displayOrder: number}[]): any[] {
  if (!displayOrder)
    return input

  return input.sort((a, b) => {
    return displayOrder.findIndex(i => i.key === a.name) - displayOrder.findIndex(i => i.key === b.name)
  })
}

export function toggleOptionEnabled(name: string): void {
  const currentlyActiveOptions = [...useStore.getState().currentlyActiveOptions]

  const index = currentlyActiveOptions.findIndex(i => i === name)
  if (index < 0)
    currentlyActiveOptions.push(name)
  else
    currentlyActiveOptions.splice(index, 1)

    useStore.setState({ ...useStore.getState(), currentlyActiveOptions })
  electronStoreSet("currentlyActiveOptions", currentlyActiveOptions);
}

export const optionsBarPositionToflexDirection = () => {
  switch (useStore.getState().optionsBarPosition) {
    case 'TOP':
      return 'column';
    case 'BOTTOM':
      return 'column-reverse';
    case 'LEFT':
      return 'row';
    case 'RIGHT':
      return 'row-reverse';
  }
};
