import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@src/state';
import { Slices } from '@src/state/slices';
import type { IBANWithID } from '@src/types';

interface IBANState {
  ibans: Array<IBANWithID>;
}

const initialState: IBANState = {
  ibans: [],
};

const ibanSlice = createSlice({
  name: Slices.IBAN,
  initialState,
  reducers: {
    replaceIBANInStore: (state, { payload }: PayloadAction<IBANWithID[]>) => {
      state.ibans = payload;
    },
  },
});

export const { replaceIBANInStore } = ibanSlice.actions;

export const selectIBANs = (state: RootState) => state[ibanSlice.name].ibans;

export const ibanReducer = { [ibanSlice.name]: ibanSlice.reducer };
