import ListCard from "./listCard";
import { getArticles } from "@/src/api/community/get/articlesList";
import { useQuery } from "react-query";

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
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError || isIdle) return <div>에러</div>;

  return (
    <>
      {noticeArticles.map((article: Article, i: number) => (
        <ListCard
          key={i}
          imgUrl={imgUrl}
          isNotice={true}
          article={article}
        ></ListCard>
      ))}
    </>
  );
}
