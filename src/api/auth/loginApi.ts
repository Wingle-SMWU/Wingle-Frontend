import instance from "../axiosModule";

export const postLogin = async (email: string, password: string) => {
  const response = await instance.post("/auth/login", { email, password });
  return response.data;
};
