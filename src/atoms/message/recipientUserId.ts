import { atom } from "recoil";

export const recipientUserId = atom<number>({
  key: "recipientUserId",
  default: 0,
});
