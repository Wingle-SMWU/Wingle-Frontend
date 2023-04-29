import instance from "../../axiosModule";
import { QueryFunctionContext } from "react-query";

export const getArticles = async ({
  queryKey,
}: QueryFunctionContext<[string, number, number, number, boolean]>): Promise<
  Article[]
> => {
  const [, forumId, page, size, my] = queryKey;
  const { data: response } = await instance.get(
    `/community/${forumId}/articles?page=${page}&size=${size}&my=${my}`
  );
  return response.data;
};
