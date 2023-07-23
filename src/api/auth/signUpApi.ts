import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import instance from "../axiosModule";

export const postIdCardImage = async (idCardImage: FormData) => {
  const response = await instance.post("/auth/idcardimage", idCardImage, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const postSignUp = async (signUpData: SignUpFormData) => {
  const response = await instance.post("/auth/signup", signUpData);

  return response.data;
};
