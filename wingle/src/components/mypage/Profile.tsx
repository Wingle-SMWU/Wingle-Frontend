import styled from "styled-components";
import { Text } from "@/src/components/ui";
import { useRouter } from "next/router";
import { useState } from "react";

const Style = {
  UserBox: styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeef2;
    gap: 14px;
    position: relative;
  `,
  UserImgBox: styled.div`
    width: 56px;
    height: 56px;
    border: 1px solid green;
  `,
  UserProfileImg: styled.img`
    border: 1px solid #eeeef2;
  `,
  UserFlagImg: styled.img``,
  UserInfoBox: styled.div`
    width: 340px;
    height: 86px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  UserNicknameAndSex: styled.div`
    display: flex;
  `,
  UserSexImg: styled.img``,
  RegisterBtn: styled.button`
    width: 45px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff812e;
    border-radius: 8px;
  `,
  EditBtn: styled.button`
    width: 45px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #6c6c70;
    border-radius: 8px;
  `,
  DropBubbleHigh: styled.div`
    position: absolute;
    top: 63px;
    left: 435px;
    border-bottom: 8px solid #303033;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  `,

  DropBubbleLow: styled.div`
    width: 153px;
    height: 42px;
    background-color: #303033;
    border-radius: 8px;
    position: absolute;
    top: 70px;
    left: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default function Profile() {
  const router = useRouter();
  const [isRegisterBtnHover, setIsRegisterBtnHover] = useState(false);

  const handleRegisterBtnHover = () => {
    setIsRegisterBtnHover(true);
  };
  const handleRegisterBtnLeave = () => {
    setIsRegisterBtnHover(false);
  };
  return (
    <>
      <Style.UserBox>
        <Style.UserImgBox>
          <Style.UserProfileImg src="" alt="프로필" />
          {/* <Style.UserFlagImg src="" alt="국기" /> */}
        </Style.UserImgBox>
        <Style.UserInfoBox>
          <Style.UserNicknameAndSex>
            <Text.Body1 color="gray900">닉네임</Text.Body1>
            {/* {gender ? 여자 이미지 : 남자 이미지} */}
            <Style.UserSexImg src="" alt="성별" />
          </Style.UserNicknameAndSex>
          <Text.Body6 color="gray800">국적</Text.Body6>
        </Style.UserInfoBox>

        {/* 자기소개, 언어선택, 관심사 중 하나라도 등록되지 않은 사용자 ? 등록 : 수정*/}

        {/* <>

        <Style.RegisterBtn
          onMouseOver={() => setIsRegisterBtnHover(true)}
          onMouseLeave={() => setIsRegisterBtnHover(false)}
        >
          <Text.Caption1
            color="white"
            pointer
            onClick={() => router.push(`/mypage/profileEdit`)}
          >
            등록
          </Text.Caption1>
        </Style.RegisterBtn>
        {isRegisterBtnHover && (
          <>
            <Style.DropBubbleHigh />
            <Style.DropBubbleLow>
              <Text.Body6>프로필을 등록해주세요!</Text.Body6>
            </Style.DropBubbleLow>
          </>
        )}
        </> */}
        <Style.EditBtn>
          <Text.Caption1
            color="gray700"
            pointer
            onClick={() => router.push(`/mypage/edit`)}
          >
            수정
          </Text.Caption1>
        </Style.EditBtn>
      </Style.UserBox>
    </>
  );
}
