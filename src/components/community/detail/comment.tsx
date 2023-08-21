import Modal from "../../modal";
import { Text } from "../../ui";
import { getImageUrl } from "@/src/modules/utils";
import betweenTime from "@/src/utils/betweenTime";
import { useState } from "react";
import styled from "styled-components";
import { countryImg } from "@/src/modules/utils";
import NoData from "../../ui/NoDataUI";
import { useRouter } from "next/router";
import UnivLabel from "../../ui/univLabel";

export default function Comment({
  comments,
  currentTab,
  forumId,
  articleId,
  writerId,
}: {
  comments: Comment[];
  currentTab: string;
  forumId: string;
  articleId: string;
  writerId: string;
}): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteInform, setDeleteInform] = useState({
    forumId: "",
    articleId: "",
    id: 0,
  });
  const router = useRouter();
  const onClickModal = (): void => {
    setModalVisible((prev) => !prev);
  };
  return (
    <S.Wrapper comments={comments}>
      <S.CommentCount>
        <Text.Body3 color="gray900">댓글 {comments.length}</Text.Body3>
      </S.CommentCount>
      {comments.map((comment, i) => {
        const {
          content,
          createdTime,
          updatedTime,
          id,
          isMine,
          userId,
          userImage,
          userNation,
          userNickname,
          userSchoolName,
        } = comment;
        const isUserWriter = userId === writerId;
        // console.log(isUserWriter, userId, writerId);
        const time = betweenTime(createdTime);
        return (
          <S.Comment key={id}>
            <S.CommentTop>
              <S.CommentTopLeft>
                {currentTab === "교류" ? (
                  <S.ImageBox
                    onClick={(e): void => {
                      router.replace(`/profile?userID=${userId}`);
                    }}
                  >
                    <S.ProfileImg
                      src={userImage ? userImage : getImageUrl(currentTab)}
                    />
                    <S.NationIcon src={countryImg(userNation)} />
                  </S.ImageBox>
                ) : (
                  <S.ProfileImg src={getImageUrl(currentTab)} />
                )}
                <S.ProfileInfo>
                  <S.HeaderTop>
                    <Text.Body6 color="gray900">{userNickname}</Text.Body6>
                    {currentTab === "교류" ? (
                      <UnivLabel univ={userSchoolName} />
                    ) : (
                      isUserWriter && ""
                      // <Text.Caption2 color="orange500">작성자</Text.Caption2>
                    )}
                  </S.HeaderTop>
                  <Text.Caption3 color="gray500">{time}</Text.Caption3>
                </S.ProfileInfo>
              </S.CommentTopLeft>
              {isMine && (
                <S.CancelImg
                  src="/community/detail/close-gray.svg"
                  onClick={(): void => {
                    onClickModal();
                    setDeleteInform({
                      ...deleteInform,
                      forumId: forumId,
                      articleId: articleId,
                      id: id,
                    });
                  }}
                />
              )}
            </S.CommentTop>
            <S.CommentBottom>
              <Text.Body3 color="gray900">
                {content.split("\n").map((text, i) => (
                  <div key={i}>{text}</div>
                ))}
              </Text.Body3>
            </S.CommentBottom>
          </S.Comment>
        );
      })}
      <S.NoComment>{!comments.length && <NoData type="comment" />}</S.NoComment>

      {modalVisible && (
        <Modal
          type="detail-delete-comment"
          deleteInform={deleteInform}
          onClickModal={onClickModal}
        />
      )}
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div<{ comments: Comment[] }>`
    width: 100%;
    height: ${({ comments }) => (comments.length ? "auto" : "100%")};
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding-bottom: 57px;
  `,

  CommentCount: styled.div`
    padding: 16px 24px;
  `,

  Comment: styled.div`
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #eeeef2;
  `,

  HeaderTop: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  NoComment: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `,
  CommentTop: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

  CommentBottom: styled.div`
    padding-top: 4px;
  `,

  CommentTopLeft: styled.div`
    display: flex;
    flex-direction: row;
  `,
  ImageBox: styled.div`
    position: relative;
    width: 36px;
    height: 36px;
    cursor: pointer;
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
  ProfileImg: styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
  `,

  ProfileInfo: styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  `,

  CancelImg: styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
  `,
};
