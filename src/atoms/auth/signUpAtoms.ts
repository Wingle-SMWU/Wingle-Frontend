import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import { atom } from "recoil";

export const signUpFormDataAtom = atom<SignUpFormData>({
  key: "signUpFormDataAtom",
  default: {
    idCardImage: null,
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
