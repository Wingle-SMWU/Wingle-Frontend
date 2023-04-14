import { useQuery, useQueryClient } from "react-query";
import ListCard from "./listCard";
import { getArticles } from "@/src/api/community/get/articlesList";

export default function FreeTab(props: { forumId: number, imgUrl: string }) {

  const { data: freeArticles, isLoading, isError } = useQuery({
    queryFn: getArticles,
    queryKey: ['articles', props.forumId, 0, 30, false],
  });

  if (isLoading) return <div>로딩중</div>
  if (isError) return <div>에러</div>
  
  return (
    <>
      {
        freeArticles.map((article: Article, i: number ) => (
          <ListCard key={i} imgUrl={props.imgUrl} isNotice={false} article={article}></ListCard>
        ))
      }
    </>
  );
}
