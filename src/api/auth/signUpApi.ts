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

const withFormData = (data: SignUpData) => {
  // multipart/form-data 형식으로 데이터를 보내기 위해 FormData 객체를 생성
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const postSignUp = async (signUpData: SignUpData) => {
  const response = await instance.post("/auth/signup", withFormData(signUpData), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
