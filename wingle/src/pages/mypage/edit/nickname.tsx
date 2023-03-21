import styled from "styled-components";
import router from "next/router";
import { Margin, Text } from "@/src/components/ui";
import { useState, useCallback } from "react";
import Modal from "@/src/components/modal";

const Style = {
  Wapper: styled.div`
    width: 500px;
    min-width: 360px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  Content: styled.div`
    padding: 0 24px;
  `,
  ImageChangeBox: styled.div`
    width: 88px;
    height: 88px;
    margin: 30px 0px;
    position: relative;
  `,
  ProfileImage: styled.img`
    width: 88px;
    height: 88px;
    position: absolute;
    border-radius: 100px;
    border: 1px solid red;
    background-color: red;
    cursor: pointer;
  `,
  CameraIcon: styled.img`
    width: 24px;
    height: 24px;
    border-radius: 100px;
    position: absolute;
    right: 0%;
    bottom: 0%;
    z-index: 0;
    cursor: pointer;
  `,
  NicknameChangeBox: styled.div`
    .message {
      font-weight: 400;
      font-size: 12px;
      line-height: 140%;
      &.success {
        color: #959599;
      }
      &.error {
        color: #ff2727;
      }
    }
  `,
  InputNickname: styled.input`
    width: 93%;
    height: 52px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
    padding: 0px 16px;
    margin-bottom: 8px;

    ::placeholder {
      color: #959599;
    }
    :focus {
      border: 1px solid #dcdce0;
    }
  `,
  Header: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 14px 0;
  `,
  Left: styled.div``,
  GoBackArrow: styled.img`
    margin-right: 12px;
    cursor: pointer;
  `,
};

export default function Nickname() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState<string>("");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [isName, setIsName] = useState<boolean>(false);

  const onChangeName = useCallback((e: any) => {
    const nameRegex = /^[가-힣a-zA-Z]{2,10}$/;
    const nameCurrent = e.target.value;
    setName(nameCurrent);

    if (!nameRegex.test(nameCurrent)) {
      setNameMessage("한글/영어 2글자 이상 10글자 이하");
      setIsName(false);
    } else {
      setNameMessage("사용 가능한 형식입니다.");
      setIsName(true);
    }
  }, []);

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <>
      <Style.Wapper>
        <Style.Content>
          <Style.Header>
            <Style.Left>
              <Style.GoBackArrow
                src="/back-arrow.svg"
                alt="뒤로가기"
                onClick={onClickModal}
              />
              <Text.Title1 color="gray900">프로필 수정</Text.Title1>
            </Style.Left>
            <Text.Body1
              color="gray500" // 비활성화 상태
              // 활성화 상태에서는 color="gray900"
              onClick={() => router.push(`/mypage/edit`)}
              pointer
            >
              완료
            </Text.Body1>
          </Style.Header>
          <>
            <Style.ImageChangeBox>
              <Style.ProfileImage src="" alt="프로필 이미지" />
              <Style.CameraIcon src="/mypage/camera.svg" alt="변경 아이콘" />
            </Style.ImageChangeBox>

            <Style.NicknameChangeBox>
              <Text.Body5 color="gray700">닉네임</Text.Body5>{" "}
              <Margin direction="column" size={8} />
              <Style.InputNickname
                placeholder="기존 닉네임"
                type="text"
                onChange={onChangeName}
              />
              {name.length > 0 && (
                <span className={`message ${isName ? "success" : "error"}`}>
                  {nameMessage}
                </span>
              )}
              {/** 기존 닉네임 자리에 {nickname} */}
              <Margin direction="column" size={8} />
            </Style.NicknameChangeBox>
          </>
        </Style.Content>
        {modalVisible && (
          <Modal type="profile-back" onClickModal={onClickModal} />
        )}
      </Style.Wapper>
    </>
  );
}
