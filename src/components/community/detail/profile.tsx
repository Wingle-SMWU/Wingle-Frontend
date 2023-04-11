import { getImageUrl } from "@/src/modules/utils";
import { useState } from "react";
import styled from "styled-components";
import Modal from "../../modal";
import { Margin, Text } from "../../ui";

export default function Profile(props: { currentTab: string, userNickname: string, createdTime: string }) {
  const [modalVisible, setModalVisible] = useState(false);

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <>
      <Style.Profile>
        <Style.ProfileLeft>
          <Style.ProfileImg src={getImageUrl(props.currentTab)} />
          <Margin direction="row" size={10} />
          <Style.ProfileInfo>
            <Text.Body6 color="gray900">{props.userNickname}</Text.Body6>
            <Text.Caption3 color="gray500">10분 전</Text.Caption3>
            {/* 시간 처리 함수 이후 제작 */}
          </Style.ProfileInfo>
        </Style.ProfileLeft>
        <Style.CancelImg
          src="/community/detail/close-gray.svg"
          onClick={onClickModal}
        />
      </Style.Profile>
      {modalVisible && (
        <Modal type="detail-delete-contents" onClickModal={onClickModal} />
      )}
    </>
  );
}

const Style = {
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
