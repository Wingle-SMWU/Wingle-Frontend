import { getArticle } from "@/src/api/community/get/article";
import { getComments } from "@/src/api/community/get/comments";
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

  const article = useQuery({
    queryFn: getArticle,
    queryKey: ["article", forumId, articleId],
  });
  const comments = useQuery({
    queryFn: getComments,
    queryKey: ["comments", forumId, articleId, 0, 10],
  });

  if (article.isLoading || comments.isLoading) return <div>로딩중</div>;
  if (article.isError || comments.isError || comments.isIdle)
    return <div>에러</div>;

  return (
    <S.Wrapper>
      <S.DetailTop>
        <Header currentTab={currentTab} />
        <Profile article={article.data} currentTab={currentTab} />
        <Body content={article.data.content} />
        <Comment
          comments={comments.data}
          currentTab={currentTab}
          forumId={forumId}
          articleId={articleId}
        />
      </S.DetailTop>
      <S.CommentInputFixed>
        <CommentInput
          forumId={article.data.forumId}
          articleId={article.data.articleId}
        />
      </S.CommentInputFixed>
    </S.Wrapper>
  );
}

const S = {
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
