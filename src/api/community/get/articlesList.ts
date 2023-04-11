import { QueryFunctionContext } from "react-query";
import instance from "../../axiosModule";

export const getArticles = async ({queryKey} : QueryFunctionContext<[string, number, number, boolean]>) => {
  const [, page, size, my] = queryKey;
  const response =  await instance.get(`/community/1/articles/?page=${page}&size=${size}&my=${my}`)
  return response.data;
}