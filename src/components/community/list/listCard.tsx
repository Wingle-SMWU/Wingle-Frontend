import { Text } from "../../ui";
import betweenTime from "@/src/utils/betweenTime";
import { useRouter } from "next/router";
import styled from "styled-components";
import { countryImg } from "@/src/modules/utils";
import { Content } from "../detail/content";
import { useRecoilValue } from "recoil";
import { currentTabStateAtom } from "@/src/atoms/community/tab";
import UnivLabel from "../../ui/univLabel";

export default function ListCard({
  imgUrl,
  isNotice,
  article,
}: {
  imgUrl: string;
  isNotice: boolean;
  article: Article;
}): JSX.Element {
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
    userSchoolName,
    userId,
    userNickname,
    userImage,
    userNation,
  } = article;

  const time = betweenTime(createdTime);
  const tab = useRecoilValue(currentTabStateAtom);
  const onClickMoveToDetail = (): void => {
    // if (isNotice) {
    //   return;
    // }
    router.push({
      pathname: `/community/detail`,
      query: { tab, forumId: forumId, articleId: articleId },
    });
  };

  return (
    <S.Contents onClick={onClickMoveToDetail}>
      <S.ContentsHeader>
        {tab === "교류" ? (
          <S.ImageBox
            onClick={(e): void => {
              e.stopPropagation();
              router.replace(`/profile?userID=${userId}`);
            }}
          >
            <S.ContentsHeaderImg src={userImage ? userImage : imgUrl} />
            <S.NationIcon src={countryImg(userNation)} />
          </S.ImageBox>
        ) : (
          <S.ContentsHeaderImg src={imgUrl} />
        )}
        <S.ContentsHeaderInfo>
          <S.HeaderTop>
            <Text.Body6 color="gray900" pointer={true}>
              {userNickname}
            </Text.Body6>
            <UnivLabel univ={userSchoolName} />
          </S.HeaderTop>
          <Text.Caption3 color="gray500">{time}</Text.Caption3>
        </S.ContentsHeaderInfo>
      </S.ContentsHeader>
      <Text.Body4 color="gray900" pointer={true}>
        {content.split("\n").map((text, i) => (
          <div key={i}>
            <Content text={text} isNotice={isNotice} isDetail={false} />
          </div>
        ))}
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
    cursor: pointer;
  `,

  HeaderTop: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  ImageBox: styled.div`
    position: relative;
    width: 36px;
    height: 36px;
  `,

  ContentsHeaderImg: styled.img`
    object-fit: cover;

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
