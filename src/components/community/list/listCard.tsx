import { Text } from "../../ui";
import betweenTime from "@/src/utils/betweenTime";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import { countryImg } from "../../mypage/countryImg";

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
    userImage,
    userNation,
  } = article;
  console.log(article);

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
        {currentTab === "교류" ? (
          <S.ImageBox>
            <S.ContentsHeaderImg src={userImage ? userImage : imgUrl} />
            <S.NationIcon src={countryImg(userNation)} />
          </S.ImageBox>
        ) : (
          <S.ContentsHeaderImg src={imgUrl} />
        )}
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

  ImageBox: styled.div`
    position: relative;
    width: 36px;
    height: 36px;
  `,

  ContentsHeaderImg: styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
  `,
  NationIcon: styled.img`
    width: 16px;
    height: 16px;
    border-radius: 100px;
    position: absolute;
    right: 0%;
    bottom: 0%;
    z-index: 0;
    cursor: pointer;
  `,

  ContentsHeaderInfo: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
  `,
};
