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
    const newData = data.filter(iban => iban.id !== id);

    await storeData(newData);
    return newData;
  };

  const replaceData = async (iban: IBANWithID): Promise<IBANWithID[]> => {
    const data = await getData([]);
    const newData = data.map(d => (d.id === iban.id ? iban : d));

    await storeData(newData);
    return newData;
  };

  return {
    pushData,
    removeData,
    loadData: () => getData([]),
    replaceData,
  };
};

export const IBANStorageService = IBANStorage();
