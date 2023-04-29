import instance from "../../axiosModule";

export const getForums = async (): Promise<Forum[]> => {
  const { data: response } = await instance.get("/community/forums");
  return response.data;
};
