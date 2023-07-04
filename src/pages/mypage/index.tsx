import Footer from "@/src/components/layout/Footer";
import Navigation from "@/src/components/layout/Navigation";
import Profile from "@/src/components/mypage/Profile";
import { Text, Margin } from "@/src/components/ui";
import router from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Loading from "@/src/components/ui/loadingUI";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";

export default function Mypage(): JSX.Element {
  const [editText, setEditText] = useState(true);
  const [isRegisterDropVisible, setIsRegisterDropVisible] = useState(false);

  const { profileData, isLoading, isError } = useGetProfile();

  useEffect(() => {
    if (
      profileData &&
      (profileData.interests.length ||
        profileData.introduce ||
        profileData.languages.length)
    ) {
      setEditText(false);
    }
  }, [profileData]);

  const handleLogout = (): void => {
    localStorage.clear();
    router.push("/auth/login");
  };

  if (isLoading) return <Loading />;
  if (isError) return <>에러</>;

  return (
    <>
      <S.Wrapper>
        <S.Content>
          <S.Header>
            <Text.Title1 color="gray900">마이페이지</Text.Title1>
          </S.Header>
          <S.Profile>
            <Profile />
            {editText ? (
              <S.EditBtn
                Color="#FF812E"
                onClick={(): Promise<boolean> => router.push(`/mypage/edit`)}
              >
                <Text.Caption1
                  color="white"
                  pointer
                  onMouseEnter={(): void => setIsRegisterDropVisible(true)}
                  onMouseLeave={(): void => setIsRegisterDropVisible(false)}
                >
                  프로필 등록
                </Text.Caption1>
                {isRegisterDropVisible && (
                  <S.RegisterDrop>
                    <Text.Body2 color="white">
                      프로필을 등록해주세요!
                    </Text.Body2>
                  </S.RegisterDrop>
                )}
              </S.EditBtn>
            ) : (
              <S.EditBtn
                onClick={(): Promise<boolean> => router.push(`/mypage/edit`)}
              >
                <Text.Caption1 color="gray700" pointer>
                  프로필 수정
                </Text.Caption1>
              </S.EditBtn>
            )}
          </S.Profile>
          <>
            <Margin direction="column" size={34} />
            <Text.Body1
              color="gray900"
              pointer
              onClick={(): Promise<boolean> => router.push(`/mypage/postList`)}
            >
              내가 쓴 게시글
            </Text.Body1>
            <Margin direction="column" size={34} />
            <Text.Body1 color="gray900" pointer onClick={handleLogout}>
              로그아웃
            </Text.Body1>
          </>
        </S.Content>
        <Footer />
        <Navigation tab={""} />
      </S.Wrapper>
    </>
  );
}

interface EditBtnProps {
  Color?: string;
}

const S = {
  Wrapper: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    @media (min-width: 501px) {
      width: 500px;
      margin: 0 auto; /* Center align when width is 500px or more */
    }
    @media (max-width: 500px) {
      width: 100vw;
      background-color: white;
    }
  `,
  Content: styled.div`
    overflow-y: scroll;
    height: calc(100% - 56px); /* Subtract the height of the header */
    padding: 0 24px;
    margin-top: 56px;
    @media (max-width: 500px) {
      // width: 100vw;
      background-color: white;
    }
  `,
  Header: styled.div`
    width: 100vw;
    height: 50px;
    padding: 14px 0;
    position: fixed;
    top: 0;
    z-index: 1;
  `,
  Profile: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #eeeef2;
    @media (max-width: 500px) {
      width: 100vw; /* Adjust to fit the screen size */
    }
  `,

  RegisterBtn: styled.button`
    width: 45px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff812e;
    border-radius: 8px;
  `,
  EditBtn: styled.button<EditBtnProps>`
    @media (min-width: 501px) {
      width: 79px;
      height: 33px;
      margin-top: 24px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props): string => props.Color || "#6c6c70"};
    background-color: ${(props): string => props.Color || "white"};
    border-radius: 8px;
    @media (max-width: 500px) {
      position: fixed;
      top: 78px;
      right: 24px;
      width: 79px;
      height: 33px;
    }
  `,

  RegisterDrop: styled.div`
    position: absolute;
    background-color: black;
    padding: 6px 12px;
    border-radius: 4px;
    top: 55%;
    left: 57%;
    font-size: 14px;
    white-space: nowrap;
    font-size: 12px;

    &:after {
      content: "";
      position: absolute;
      top: -8px;
      right: 10px;
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 8px solid black;
    }
  `,
};
