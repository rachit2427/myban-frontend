import { combineReducers } from '@reduxjs/toolkit';

import { keyboardReducer } from '@src/state/slices/keyboard';

export const rootReducer = combineReducers({ ...keyboardReducer });
