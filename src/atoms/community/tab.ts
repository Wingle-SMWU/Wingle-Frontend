import { atom } from "recoil";

export const currentTabStateAtom = atom<string>({
  key: "currentTab",
  default: "자유",
});
