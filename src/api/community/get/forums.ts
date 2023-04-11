import instance from "../../axiosModule";

export const getForums = async() => {
  const response = await instance.get("/community/forums")
  return response.data;
}