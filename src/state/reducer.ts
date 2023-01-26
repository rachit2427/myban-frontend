import { combineReducers } from '@reduxjs/toolkit';

import { appReducer } from '@src/state/slices/app';
import { ibanReducer } from '@src/state/slices/iban';
import { keyboardReducer } from '@src/state/slices/keyboard';

export const rootReducer = combineReducers({
  ...keyboardReducer,
  ...ibanReducer,
  ...appReducer,
});
