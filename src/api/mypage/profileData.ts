import instance from "../axiosModule";
import { ProfileStateType } from "@/src/types/mypage/profileType";

export const getProfile = async (): Promise<ProfileStateType> => {
  const response = await instance.get("/profile/detail");
  const data = response.data.data;

  return data;
};
