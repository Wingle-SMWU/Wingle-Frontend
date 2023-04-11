import { useQuery } from "react-query";
import ListCard from "./listCard";
import { getArticles } from "@/src/api/community/get/articlesList";

export default function InteractTab(props: { imgUrl: string }) {
  const { data, isLoading, isError } = useQuery({
    queryFn: getArticles,
    queryKey: ['articles', 0, 30, false],
  });

  if (isLoading) return <div>로딩중</div>
  if (isError) return <div>에러</div>
  
  const articles = data.data.filter((article: Article) =>  article.forumId === 2);
  
  return (
    <>
      {
        articles.map((article: Article, i: number ) => (
          <ListCard key={i} imgUrl={props.imgUrl} isNotice={false} article={article}></ListCard>
        ))
      }
    </>
  );
}
