import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKeys {
  IBAN = '@IBAN',
}

export class Storage<T> {
  constructor(private readonly key: string) {
    this.getData = this.getData.bind(this);
    this.storeData = this.storeData.bind(this);
  }

  public async storeData(value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify({ data: value });
      await AsyncStorage.setItem(this.key, jsonValue);
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert(e.message);
      }
    }
  }

  public async getData(defaultValue: T): Promise<T> {
    try {
      const jsonValue = await AsyncStorage.getItem(this.key);
      return jsonValue != null
        ? JSON.parse(jsonValue)?.data || defaultValue
        : defaultValue;
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert(e.message);
      }
    }

    return defaultValue;
  }
}
