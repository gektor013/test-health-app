import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export const MMKVStorage = {
  setItem: (key: string, value: any) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
  clear: () => {
    storage.clearAll();
    return Promise.resolve();
  },
};
