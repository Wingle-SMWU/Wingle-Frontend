import Footer from "@/src/components/layout/Footer";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";

const Style = {
  Wapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid red;
  `,
  Content: styled.div`
    padding: 24px;
  `,
  Header: styled.div`
    width: 500px;
    height: 56px;
  `,
  UserBox: styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeef2;
    gap: 14px;
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
    width: 320px;
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
};

export default function Mypage() {
  return (
    <>
      <Style.Wapper>
        <Style.Content>
          <Style.Header>
            <Text.Title1 color="gray900">마이페이지</Text.Title1>
          </Style.Header>
          <Style.UserBox>
            <Style.UserImgBox>
              <Style.UserProfileImg src="" alt="프로필" />
              {/* <Style.UserFlagImg src="" alt="국기" /> */}
            </Style.UserImgBox>
            <Style.UserInfoBox>
              <Style.UserNicknameAndSex>
                <Text.Body1 color="gray900">닉네임</Text.Body1>
                <Style.UserSexImg src="" alt="성별" />
              </Style.UserNicknameAndSex>
              <Text.Body6 color="gray800">국적</Text.Body6>
            </Style.UserInfoBox>

            {/* isFirst ? 등록 : 수정 */}

            <Style.RegisterBtn>
              <Text.Caption1 color="white" pointer>
                등록
              </Text.Caption1>
              {/* 등록버튼일때 isHover ?? 프로필을 등록해주세요! */}
            </Style.RegisterBtn>
            {/* <Style.EditBtn>
              <Text.Caption1 color="gray700" pointer>수정</Text.Caption1>
            </Style.EditBtn> */}
          </Style.UserBox>
          <Margin direction="column" size={34} />
          <Text.Body1 color="gray900" pointer>
            내가 쓴 게시글
          </Text.Body1>
          <Margin direction="column" size={34} />
          <Text.Body1 color="gray900" pointer>
            로그아웃
          </Text.Body1>
        </Style.Content>
        <Footer />
      </Style.Wapper>
    </>
  );
}
