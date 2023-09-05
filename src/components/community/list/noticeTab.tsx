import ListCard from "./listCard";
import { getArticles } from "@/src/api/community/get/articlesList";
import { useQuery } from "react-query";
import Loading from "../../ui/loadingUI";
import NoData from "../../ui/NoDataUI";

export default function NoticeTab({
  forumId,
  imgUrl,
}: {
  forumId: number;
  imgUrl: string;
}): JSX.Element {
  const {
    data: noticeArticles,
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
      {noticeArticles.length ? (
        noticeArticles.map((article: Article, i: number) => (
          <ListCard key={i} imgUrl={imgUrl} isNotice={true} article={article} />
        ))
      ) : (
        <NoData type="article" />
      )}
    </>
  );
}
