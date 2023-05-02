import ListCard from "./listCard";
import { getArticles } from "@/src/api/community/get/articlesList";
import { useQuery, useQueryClient } from "react-query";
import Loading from "../../ui/loadingUI";
import NoData from "../../ui/NoDataUI";

export default function FreeTab({
  forumId,
  imgUrl,
}: {
  forumId: number;
  imgUrl: string;
}) {
  const {
    data: freeArticles,
    isLoading,
    isError,
    isIdle,
  } = useQuery({
    queryFn: getArticles,
    queryKey: ["articles", forumId, 0, 30, false],
  });

  if (isLoading) return <Loading />;
  if (isError || isIdle) return <div>에러</div>;

  return (
    <>
      {freeArticles.length ? (
        freeArticles.map((article: Article, i: number) => (
          <ListCard key={i} imgUrl={imgUrl} isNotice={false} article={article} />
        ))
      ) : (
      <NoData type="article" />
      )}
    </>
  );
}
