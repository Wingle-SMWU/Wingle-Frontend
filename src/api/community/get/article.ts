import instance from "../../axiosModule";
import { QueryFunctionContext } from "react-query";

export const getArticle = async ({
  queryKey,
}: QueryFunctionContext<[string, string, string]>): Promise<Article> => {
  const [, forumId, articleId] = queryKey;
  const { data: response } = await instance.get(
    `/community/${forumId}/articles/${articleId}`
  );
  return response.data;
};
