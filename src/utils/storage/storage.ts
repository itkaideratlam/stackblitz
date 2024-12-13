import { ChunkedStorage } from './chunkedStorage';
import { StorageData } from './types';
import { STORAGE_KEY } from './constants';

const storage = new ChunkedStorage(STORAGE_KEY);

export const saveToStorage = (data: StorageData): void => {
  storage.save(data);
};

export const loadFromStorage = (): StorageData | null => {
  return storage.load();
};

export const clearStorage = (): void => {
  storage.clear();
};