import instance from "../../axiosModule";
import { QueryFunctionContext } from "react-query";

export const getComments = async ({
  queryKey,
}: QueryFunctionContext<[string, string, string, number, number]>): Promise<
  Comment[]
> => {
  const [, forumId, articleId, page, size] = queryKey;
  const response = await instance.get(
    `/community/${forumId}/articles/${articleId}/comments?page=${page}&size=${size}`
  );
  return response.data;
};
