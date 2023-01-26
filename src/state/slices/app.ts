import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@src/state';
import { Slices } from '@src/state/slices';

interface AppState {
  version: {
    shouldSoftPushVersion: boolean;
    shouldHardPushVersion: boolean;
  };
}

const initialState: AppState = {
  version: {
    shouldSoftPushVersion: false,
    shouldHardPushVersion: false,
  },
};

const appSlice = createSlice({
  name: Slices.APP,
  initialState,
  reducers: {
    setShouldSoftPushVersion: (state, { payload }: PayloadAction<boolean>) => {
      state.version.shouldSoftPushVersion = payload;
    },
    setShouldHardPushVersion: (state, { payload }: PayloadAction<boolean>) => {
      state.version.shouldHardPushVersion = payload;
    },
  },
});

export const { setShouldSoftPushVersion, setShouldHardPushVersion } =
  appSlice.actions;

export const selectAppVersion = (state: RootState) =>
  state[appSlice.name].version;

export const selectShouldSoftPushVersion = (state: RootState) =>
  state[appSlice.name].version.shouldSoftPushVersion;

export const selectShouldHardPushVersion = (state: RootState) =>
  state[appSlice.name].version.shouldHardPushVersion;

export const appReducer = { [appSlice.name]: appSlice.reducer };
