import { getArticle } from "@/src/api/community/get/article";
import Body from "@/src/components/community/detail/body";
import Comment from "@/src/components/community/detail/comment";
import CommentInput from "@/src/components/community/detail/commentInput";
import Header from "@/src/components/community/detail/header";
import Profile from "@/src/components/community/detail/profile";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "styled-components";

export default function Detail() {
  const router = useRouter();
  const currentTab = `${router.query.tab}`;
  const forumId = `${router.query.forumId}`;
  const articleId = `${router.query.articleId}`;

  const { data: article, isLoading, isError } = useQuery({
    queryFn: getArticle,
    queryKey: ['article', forumId, articleId],
  });

  if (isLoading) return <div>로딩중</div>
  if (isError) return <div>에러</div>

  return (
    <Style.Wrapper>
      <Style.DetailTop>
        <Header currentTab={currentTab} />
        <Profile currentTab={currentTab} userNickname={article.userNickname} createdTime={article.createdTime} forumId={forumId} articleId={articleId}/>
        <Body content={article.content}/>
        <Comment currentTab={currentTab} forumId={forumId} articleId={articleId} />
      </Style.DetailTop>
      <Style.CommentInputFixed>
        <CommentInput forumId={article.forumId} articleId={article.articleId} />
      </Style.CommentInputFixed>
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
  `,

  DetailTop: styled.div`
    padding-bottom: 56px;
  `,

  CommentInputFixed: styled.div`
    width: 100%;
    max-width: 500px;
    position: fixed;
    bottom: 0px;
  `,
};
