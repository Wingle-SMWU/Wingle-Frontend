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
    data: interactArticles,
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
      {interactArticles.map((article: Article, i: number) => (
        <ListCard key={i} imgUrl={imgUrl} isNotice={false} article={article} />
      ))}
    </>
  );
}
