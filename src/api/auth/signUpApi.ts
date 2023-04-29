import { SignUpFormData } from "@/src/atoms/auth/signUpAtoms";
import instance from "../axiosModul";

const withFormData = (data: SignUpFormData) => {
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

export const postSignUp = async (signUpData: SignUpFormData) => {
  const response = await instance.post("/auth/signup", withFormData(signUpData), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
