import { atom } from 'recoil';

export const signInModalVisibleState = atom<boolean>({
  key: 'signInModalVisibleState',
  default: false,
});

export const publishModalVisibleState = atom<boolean>({
  key: 'publishModalVisibleState',
  default: false,
});
