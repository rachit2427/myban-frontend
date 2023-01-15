import { combineReducers } from '@reduxjs/toolkit';

import { counterReducer } from '@src/state/slices/dummy';

export const rootReducer = combineReducers({ ...counterReducer });
