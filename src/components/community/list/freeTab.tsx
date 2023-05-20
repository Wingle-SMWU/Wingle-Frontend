import ListCard from "./listCard";
import { getArticles } from "@/src/api/community/get/articlesList";
import { useQuery, useQueryClient } from "react-query";
import Loading from "../../ui/loadingUI";
import NoData from "../../ui/NoDataUI";
import { reverseArray } from "@/src/utils/reverseArray";

export default function FreeTab({
  forumId,
  imgUrl,
  my,
}: {
  forumId: number;
  imgUrl: string;
  my: boolean;
}) {
  const {
    data: freeArticles,
    isLoading,
    isError,
    isIdle,
  } = useQuery({
    queryFn: getArticles,
    queryKey: ["articles", forumId, 0, 30, my],
    cacheTime: 5 * 60 * 1000,
    staleTime: 0,
  });

  if (isLoading) return <Loading />;
  if (isError || isIdle) return <div>에러</div>;

  return (
    <>
      {freeArticles.length ? (
        reverseArray(freeArticles).map((article: Article, i: number) => (
          <ListCard
            key={i}
            imgUrl={imgUrl}
            isNotice={false}
            article={article}
          />
        ))
      ) : (
        <NoData type="article" />
      )}
    </>
  );
}
