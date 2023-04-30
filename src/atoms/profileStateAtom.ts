import { atom } from 'recoil';
import Introduce from '../pages/mypage/edit/introduce';

type ProfileStateType = {
  gender : boolean;
  nickname: string;
  age: number;
  interests : string[];
  introduce: string;
  languages : object[];
  nation : string;
  sns : any;
  image: string;
};


export const profileStateAtom = atom<ProfileStateType>({
  key: 'profileState',
  default: {
    gender : true,
    nickname: 'test',
    age: 24,
    interests : ["🎤 KPOP"],
    introduce: "자기소개",
    languages : [{order: 1, interest: 'KR 한국어'}],
    nation : "kor",
    sns : null,
    image : 'https://wingle-bucket.s3.ap-northeast-2.amazonaws.com/idCardImage/202303071306001975874871491172.png'
    }
});
