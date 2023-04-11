import instance from "../axiosModul";

export interface SignUpData {
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

export const postSignUp = async (signUpData: SignUpData) => {
  const response = await instance.post("/auth/signup", signUpData)
  return response.data
};

