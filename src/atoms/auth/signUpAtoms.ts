import { atom } from "recoil";

export interface SignUpFormData {
  idCardImage: string;
  email: string;
  password: string;
  name: string;
  isNicknameChecked: boolean;
  nickname: string;
  gender: boolean;
  nation: string;
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
    gender: true,
    nation: "kr",
    termsOfUse: false,
    termsOfPersonalInformation: false,
    termsOfPromotion: false,
  },
});
