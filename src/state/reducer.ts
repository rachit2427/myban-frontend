import { combineReducers } from '@reduxjs/toolkit';

import { ibanReducer } from '@src/state/slices/iban';
import { keyboardReducer } from '@src/state/slices/keyboard';

export const rootReducer = combineReducers({
  ...keyboardReducer,
  ...ibanReducer,
});
