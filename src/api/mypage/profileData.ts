import instance from "../axiosModule";
import { ProfileStateType } from "@/src/types/mypage/profileType";

export const getProfile = async (): Promise<ProfileStateType> => {
  const response = await instance.get("/profile/detail");
  const data = response.data.data;

  return data;
};

export const postIntroduce =async (introduce:string) => {
  const response =  await instance.post("/profile/introduction", {
     "introduction" : introduce
  });

  return response.data;
}

export const postLanguage = async (language: String[]): Promise<void> => {
  const response = await instance.post("/profile/languages", {
    "languages": language.filter(v=>v!=='')
  });

  return response.data;
};

export const postInterest = async (interest : String[] ): Promise<void> => {
  const response =  await instance.post("/profile/interests", {
    "interests": interest
  })

  return response.data;
};