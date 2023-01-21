import { createAsyncThunk } from '@reduxjs/toolkit';

import { Slices } from '@src/state/slices';
import { replaceIBANInStore } from '@src/state/slices/iban';
import { getThunkName } from '@src/state/thunk';
import { IBANStorageService } from '@src/storage/ibans';
import type { IBAN, IBANWithID } from '@src/types';

const IBANThunk = {
  ADD: getThunkName(Slices.IBAN, 'ADD_IBAN'),
  REMOVE: getThunkName(Slices.IBAN, 'REMOVE_IBAN'),
  LOAD: getThunkName(Slices.IBAN, 'LOAD_IBAN'),
  REPLACE: getThunkName(Slices.IBAN, 'REPLACE_IBAN'),
};

export const addIBAN = createAsyncThunk(
  IBANThunk.ADD,
  async (iban: IBAN, thunkAPI) => {
    const ibans = await IBANStorageService.pushData(iban);

    thunkAPI.dispatch(replaceIBANInStore(ibans));
  },
);

export const removeIBAN = createAsyncThunk(
  IBANThunk.REMOVE,
  async (id: string, thunkAPI) => {
    const ibans = await IBANStorageService.removeData(id);

    thunkAPI.dispatch(replaceIBANInStore(ibans));
  },
);

export const loadIBAN = createAsyncThunk(
  IBANThunk.LOAD,
  async (_, thunkAPI) => {
    const ibans = await IBANStorageService.loadData();

    thunkAPI.dispatch(replaceIBANInStore(ibans));
  },
);

export const replaceIBAN = createAsyncThunk(
  IBANThunk.REPLACE,
  async (iban: IBANWithID, thunkAPI) => {
    const ibans = await IBANStorageService.replaceData(iban);

    thunkAPI.dispatch(replaceIBANInStore(ibans));
  },
);
