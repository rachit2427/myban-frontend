import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@src/state';
import { Slices } from '@src/state/slices';

interface KeyboardState {
  isShown: boolean;
}

const initialState: KeyboardState = {
  isShown: false,
};

const keyboardSlice = createSlice({
  name: Slices.Keyboard,
  initialState,
  reducers: {
    show: state => {
      state.isShown = true;
    },
    hide: state => {
      state.isShown = false;
    },
  },
});

export const { show: keyboardShown, hide: keyboardHidden } =
  keyboardSlice.actions;

export const selectIsKeyboardShown = (state: RootState) =>
  state[keyboardSlice.name].isShown;

export const keyboardReducer = { [keyboardSlice.name]: keyboardSlice.reducer };
