import { atom } from "recoil";
import {
  ProfileStateType,
  ProfileUpdateType,
} from "../types/mypage/profileType";
import { recoilPersist } from 'recoil-persist';

//sessionStorage에 저장
const sessionStorage = 
      typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
  key: 'persistProfile',
  storage: sessionStorage,
});

export const profileStateAtom = atom<ProfileStateType>({
  key: "profileState",
  default: {
    gender: true,
    nickname: "test",
    age: 24,
    interests: ["🎤 KPOP"],
    introduce: "자기소개",
    languages: [],
    nation: "ac",
    sns: null,
    image:
      "https://wingle-bucket.s3.ap-northeast-2.amazonaws.com/idCardImage/202303071306001975874871491172.png",
  },
  effects_UNSTABLE: [persistAtom],
});
export const profileUpdateStateAtom = atom<ProfileUpdateType>({
  key: "profileUpdateState",
  default: {
    image: null,
    imageDelete: false,
    nickname: "",
  },
});
