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
  // multipart/form-data 형식으로 데이터를 보내기 위해 FormData 객체를 생성
  // const formData = new FormData();
  // Object.keys(signUpData).forEach((key) => {
  //   // idCardImage를 제외한 나머지 필드는 직접 formData에 추가
  //   if (key !== "idCardImage") {
  //     formData.append(key, signUpData[key]);
  //   }
  // });
  // formData.append("idCardImage", signUpData.idCardImage);
  // const response = await instance.post("/auth/signup", formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  // return response.data;
};
