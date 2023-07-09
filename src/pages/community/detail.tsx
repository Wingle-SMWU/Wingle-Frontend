import { getArticle } from "@/src/api/community/get/article";
import { getComments } from "@/src/api/community/get/comments";
import Body from "@/src/components/community/detail/body";
import Comment from "@/src/components/community/detail/comment";
import CommentInput from "@/src/components/community/detail/commentInput";
import Header from "@/src/components/community/detail/header";
import Profile from "@/src/components/community/detail/profile";
import Loading from "@/src/components/ui/loadingUI";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "styled-components";

export default function Detail(): JSX.Element {
  const router = useRouter();
  const currentTab = `${router.query.tab}`;
  const forumId = `${router.query.forumId}`;
  const articleId = `${router.query.articleId}`;

  const article = useQuery({
    queryFn: getArticle,
    queryKey: ["article", forumId, articleId],
    cacheTime: 5 * 60 * 1000,
    staleTime: 0,
  });
  const comments = useQuery({
    queryFn: getComments,
    queryKey: ["comments", forumId, articleId, 0, 10],
    cacheTime: 5 * 60 * 1000,
    staleTime: 0,
  });

  if (article.isLoading || comments.isLoading) return <Loading />;
  if (article.isError || comments.isError || article.isIdle || comments.isIdle)
    return <div>에러</div>;

  return (
    <S.Wrapper>
      <S.DetailTop>
        <Header currentTab={currentTab} />
        <Profile article={article.data} currentTab={currentTab} />
        <Body content={article.data.content} />
        {currentTab !== "공지" && (
          <Comment
            comments={comments.data}
            currentTab={currentTab}
            forumId={forumId}
            articleId={articleId}
          />
        )}
      </S.DetailTop>
      {currentTab !== "공지" && (
        <S.CommentInputFixed>
          <CommentInput
            forumId={article.data.forumId}
            articleId={article.data.articleId}
          />
        </S.CommentInputFixed>
      )}
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
    height: 1px;
    min-height: calc(100vh - 57px);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  `,

  CommentInputFixed: styled.div`
    width: 100%;
    max-width: 500px;
    position: fixed;
    bottom: 0px;
  `,
};
