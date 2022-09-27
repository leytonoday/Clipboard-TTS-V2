import create, {GetState, SetState}                   from 'zustand';
import { IMiscSlice, createMiscSlice }                from './modules/miscSlice';
import { IOptionsSlice, createOptionsSlice }          from './modules/optionsSlice';
import { ISettingsSlice, createSettingsSlice }        from './modules/settingsSlice';
import { IDeveloperSlice, createDeveloperSlice }      from './modules/developerSlice';
import { IGlobalStateSlice, createGlobalStateSlice }  from './modules/globalStateSlice';

interface IStore extends IGlobalStateSlice, IMiscSlice, IOptionsSlice, ISettingsSlice, IDeveloperSlice {}

export type StoreSlice<T> = (
  set: SetState<IStore>,
  get: GetState<IStore>
) => T

export const useStore = create<IStore>((set, get) => ({
  ...createGlobalStateSlice(set, get),
  ...createMiscSlice(set, get),
  ...createOptionsSlice(set, get),
  ...createSettingsSlice(set, get),
  ...createDeveloperSlice(set, get)
}));
