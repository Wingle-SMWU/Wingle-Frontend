import ListCard from "./listCard";
import { getArticles } from "@/src/api/community/get/articlesList";
import { useQuery } from "react-query";
import Loading from "../../ui/loadingUI";
import { reverseArray } from "@/src/utils/reverseArray";

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

  if (isLoading) return <Loading />;
  if (isError || isIdle) return <div>에러</div>;

  return (
    <>
      {interactArticles.length ? (
        reverseArray(interactArticles).map((article: Article, i: number) => (
          <ListCard
            key={i}
            imgUrl={imgUrl}
            isNotice={false}
            article={article}
          />
        ))
      ) : (
        <Loading />
      )}
    </>
  );
}
