import { SignUpFormData } from "@/src/atoms/auth/signUpAtoms";
import instance from "../axiosModul";

const withFormData = (data: SignUpFormData) => {
  // multipart/form-data 형식으로 데이터를 보내기 위해 FormData 객체를 생성
  // formData를 그대로 넣어버리면 string으로 받아 오류, 그래서 idCardImage를 조건으로 넣고 그 값을 그대로 넣어줘야함.
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
    } else if (key === "idCardImage") {
      formData.append(key, value.get("idCardImage"));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const postSignUp = async (signUpData: SignUpFormData) => {
  const response = await instance.post("/auth/signup", withFormData(signUpData), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
