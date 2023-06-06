import { ProfileUpdateType } from "@/src/types/mypage/profileType";
import { NextApiResponse } from "next";
import instance from "../axiosModule";

const withFormData = (data: ProfileUpdateType): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
    } else if (key === "image") {
      if (value === null) {
        formData.append(key, "null");
        formData.delete("image");
      } else {
        formData.append(key, value.get("image"));
      }
    } else if (typeof value === "string") {
      formData.append(key, value);
    }
  });
  return formData;
};

export const postUpdateProfile = async (
  profileUpdateData: ProfileUpdateType
): Promise<NextApiResponse> => {
  const response = await instance.post(
    "/profile",
    withFormData(profileUpdateData),
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};
