import { nanoid } from '@reduxjs/toolkit';

import { Storage, StorageKeys } from '@src/storage';
import type { IBAN, IBANWithID } from '@src/types';

const IBANStorage = () => {
  const { getData, storeData } = new Storage<Array<IBANWithID>>(
    StorageKeys.IBAN,
  );

  const pushData = async (iban: IBAN): Promise<IBANWithID[]> => {
    const data = await getData([]);
    const id = nanoid();

    data.push({ id, ...iban });

    await storeData(data);
    return data;
  };

  const removeData = async (id: string): Promise<IBANWithID[]> => {
    const data = await getData([]);
    const index = data.findIndex(iban => iban.id === id);

    if (index <= -1) return data;

    const newData = data.splice(index, 1);
    return newData;
  };

  return {
    pushData,
    removeData,
    loadData: () => getData([]),
  };
};

export const IBANStorageService = IBANStorage();
