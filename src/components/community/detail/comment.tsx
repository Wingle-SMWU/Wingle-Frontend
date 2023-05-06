import Modal from "../../modal";
import { Text } from "../../ui";
import { getImageUrl } from "@/src/modules/utils";
import betweenTime from "@/src/utils/betweenTime";
import { useState } from "react";
import styled from "styled-components";
import { countryImg } from "../../mypage/countryImg";

export default function Comment({
  comments,
  currentTab,
  forumId,
  articleId,
}: {
  comments: Comment[];
  currentTab: string;
  forumId: string;
  articleId: string;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteInform, setDeleteInform] = useState({
    forumId: "",
    articleId: "",
    id: 0,
  });

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <S.Wrapper>
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
        } = comment;
        const time = betweenTime(createdTime);
        return (
          <S.Comment key={id}>
            <S.CommentTop>
              <S.CommentTopLeft>
                {currentTab === "교류" ? (
                  <S.ImageBox>
                    <S.ProfileImg
                      src={userImage ? userImage : getImageUrl(currentTab)}
                    />
                    <S.NationIcon src={countryImg(userNation)} />
                  </S.ImageBox>
                ) : (
                  <S.ProfileImg src={getImageUrl(currentTab)} />
                )}
                <S.ProfileInfo>
                  <Text.Body6 color="gray900">{userNickname}</Text.Body6>
                  <Text.Caption3 color="gray500">{time}</Text.Caption3>
                </S.ProfileInfo>
              </S.CommentTopLeft>
              {isMine && (
                <S.CancelImg
                  src="/community/detail/close-gray.svg"
                  onClick={() => {
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
              <Text.Body3 color="gray900">{content}</Text.Body3>
            </S.CommentBottom>
          </S.Comment>
        );
      })}

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
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
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
