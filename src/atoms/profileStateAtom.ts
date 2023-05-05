import { atom } from "recoil";
import {
  ProfileStateType,
  ProfileUpdateType,
} from "../types/mypage/profileType";

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

export const profileUpdateStateAtom = atom<ProfileUpdateType>({
  key: "profileUpdateState",
  default: {
    image: null,
    imageDelete: false,
    nickname: "",
  },
});
