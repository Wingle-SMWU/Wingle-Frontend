import { Text } from "../../ui";
import betweenTime from "@/src/utils/betweenTime";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";

export default function ListCard({
  imgUrl,
  isNotice,
  article,
}: {
  imgUrl: string;
  isNotice: boolean;
  article: Article;
}) {
  const router = useRouter();
  const {
    articleId,
    commentCount,
    content,
    createdTime,
    forumId,
    images,
    isMine,
    likeCount,
    updatedTime,
    userId,
    userNickname,
  } = article;

  const currentTab: string = useMemo(() => {
    if (!router.query.tab) {
      return "자유";
    }
    return String(router.query.tab);
  }, [router.query.tab]);

  const onClickMoveToDetail = () => {
    if (isNotice) {
      return;
    }
    router.push({
      pathname: `/community/detail`,
      query: { tab: currentTab, forumId: forumId, articleId: articleId },
    });
  };

  const time = betweenTime(createdTime);

  return (
    <S.Contents onClick={onClickMoveToDetail}>
      <S.ContentsHeader>
        <S.ContentsHeaderImg src={imgUrl} />
        <S.ContentsHeaderInfo>
          <Text.Body6 color="gray900" pointer={true}>
            {userNickname}
          </Text.Body6>
          <Text.Caption3 color="gray500">{time}</Text.Caption3>
        </S.ContentsHeaderInfo>
      </S.ContentsHeader>
      <Text.Body4 color="gray900" pointer={true}>
        {content}
      </Text.Body4>
    </S.Contents>
  );
}

const S = {
  Contents: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #eeeef2;
    gap: 2px;
    padding: 12px 24px;
    background-color: #fff;
    cursor: pointer;
  `,

  ContentsHeader: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,

  ContentsHeaderImg: styled.img`
    border-radius: 50%;
    width: 36px;
    height: 36px;
  `,

  ContentsHeaderInfo: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
  `,
};
