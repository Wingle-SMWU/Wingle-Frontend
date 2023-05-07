import { atom } from "recoil";
import {
  ProfileStateType,
  ProfileUpdateType,
} from "../types/mypage/profileType";

export const profileStateAtom = atom<ProfileStateType>({
  key: "profileState",
  default: {
    gender: true,
    nickname: "test",
    age: 24,
    interests: ["🎤 KPOP"],
    introduce: "자기소개",
    languages: [],
    nation: "AC",
    sns: null,
    image:
      "https://wingle-bucket.s3.ap-northeast-2.amazonaws.com/idCardImage/202303071306001975874871491172.png",
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
