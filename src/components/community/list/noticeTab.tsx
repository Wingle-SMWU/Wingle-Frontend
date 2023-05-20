import ListCard from "./listCard";
import { getArticles } from "@/src/api/community/get/articlesList";
import { useQuery } from "react-query";
import Loading from "../../ui/loadingUI";
import NoData from "../../ui/NoDataUI";
import { reverseArray } from "@/src/utils/reverseArray";

export default function InteractTab({
  forumId,
  imgUrl,
}: {
  forumId: number;
  imgUrl: string;
}) {
  const {
    data: noticeArticles,
    isLoading,
    isError,
    isIdle,
  } = useQuery({
    queryFn: getArticles,
    queryKey: ["articles", forumId, 0, 30, false],
    cacheTime: 5 * 60 * 1000,
    staleTime: 0,
  });

  if (isLoading) return <Loading />;
  if (isError || isIdle) return <div>에러</div>;

  return (
    <>
      {noticeArticles.length ? (
        reverseArray(noticeArticles).map((article: Article, i: number) => (
          <ListCard key={i} imgUrl={imgUrl} isNotice={true} article={article} />
        ))
      ) : (
        <NoData type="article" />
      )}
    </>
  );
}
