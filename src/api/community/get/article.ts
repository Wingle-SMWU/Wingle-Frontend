import { QueryFunctionContext } from "react-query";
import instance from "../../axiosModule";

export const getArticle = async ({queryKey} : QueryFunctionContext<[string, string, string]>) => {
  const [, forumId, articleId] = queryKey;
  const response =  await instance.get(`/community/${forumId}/articles/${articleId}`)
  return response.data;
}