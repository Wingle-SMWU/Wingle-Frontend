import { QueryFunctionContext } from "react-query";
import instance from "../../axiosModule";

export const getArticles = async ({queryKey} : QueryFunctionContext<[string, number, number, number, boolean]>) => {
  const [, forumId, page, size, my] = queryKey;
  const response =  await instance.get(`/community/${forumId}/articles?page=${page}&size=${size}&my=${my}`)
  return response.data;
}