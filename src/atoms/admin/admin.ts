import { atom } from 'recoil';

export const postOrderStateAtom = atom<number>({
  key: 'postOrder',
  default: 0,
})