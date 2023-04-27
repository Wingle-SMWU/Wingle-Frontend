import { getImageUrl } from "@/src/modules/utils";
import { useState } from "react";
import styled from "styled-components";
import Modal from "../../modal";
import { Margin, Text } from "../../ui";

export default function Profile(props: { currentTab: string, userNickname: string, createdTime: string, forumId: string, articleId: string }) {
  const [modalVisible, setModalVisible] = useState(false);

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <>
      <S.Profile>
        <S.ProfileLeft>
          <S.ProfileImg src={getImageUrl(props.currentTab)} />
          <Margin direction="row" size={10} />
          <S.ProfileInfo>
            <Text.Body6 color="gray900">{props.userNickname}</Text.Body6>
            <Text.Caption3 color="gray500">10분 전</Text.Caption3>
            {/* 시간 처리 함수 이후 제작 */}
          </S.ProfileInfo>
        </S.ProfileLeft>
        <S.CancelImg
          src="/community/detail/close-gray.svg"
          onClick={onClickModal}
        />
      </S.Profile>
      {modalVisible && (
        <Modal type="detail-delete-contents" deleteInform={{forumId: props.forumId, articleId: props.articleId, id: 0}} onClickModal={onClickModal} />
      )}
    </>
  );
}

const S = {
  Profile: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 65px 24px 8px 24px;
  `,

  ProfileImg: styled.img`
    border-radius: 50%;
    width: 36px;
    height: 36px;
  `,

  ProfileInfo: styled.div`
    display: flex;
    flex-direction: column;
  `,

  ProfileLeft: styled.div`
    display: flex;
    flex-direction: row;
  `,

  CancelImg: styled.img`
    width: 24px;
    height: 24px;
  `,
};
