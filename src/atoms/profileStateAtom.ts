import { atom } from "recoil";
import { ProfileStateType } from "../types/mypage/profileType";

export const profileStateAtom = atom<ProfileStateType>({
  key: "profileState",
  default: {
    gender: true,
    nickname: "",
    age: 0,
    interests: [],
    introduce: "",
    languages: [],
    nation: "",
    sns: null,
    image: "",
  },
});
