import { atom } from 'recoil';

export const tempStateAtom = atom<boolean>({
  key: 'temp',
  default: '',
})