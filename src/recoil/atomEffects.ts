import { AtomEffect } from 'recoil';

import { loadItem, removeItem, saveItem } from '@/services/storage';

/* eslint-disable import/prefer-default-export */
export const localStorageEffect = <T>(
  key: string,
): AtomEffect<T> => ({ setSelf, onSet }) => {
    const savedValue = loadItem<T>(key);

    if (savedValue != null) {
      setSelf(savedValue);
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        removeItem(key);
        return;
      }

      saveItem(key, newValue);
    });
  };
