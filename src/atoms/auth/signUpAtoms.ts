import { atom } from "recoil";

export interface SignUpFormData {
  idCardImage: string;
  email: string;
  password: string;
  name: string;
  isNicknameChecked: boolean;
  nickname: string;
  nation: string;
  gender: boolean;
  termsOfUse: boolean;
  termsOfPersonalInformation: boolean;
  termsOfPromotion: boolean;
}

export const signUpFormDataAtom = atom<SignUpFormData>({
  key: "signUpFormDataAtom",
  default: {
    idCardImage: "",
    email: "",
    password: "",
    name: "",
    isNicknameChecked: false,
    nickname: "",
    nation: "Republic of Korea",
    gender: true,
    termsOfUse: false,
    termsOfPersonalInformation: false,
    termsOfPromotion: false,
  },
});
