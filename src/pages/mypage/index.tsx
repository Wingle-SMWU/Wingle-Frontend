import Footer from "@/src/components/layout/Footer";
import Navigation from "@/src/components/layout/Navigation";
import Profile from "@/src/components/mypage/Profile";
import { Text, Margin } from "@/src/components/ui";
import router from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Loading from "@/src/components/ui/loadingUI";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";

export default function Mypage() {
  const [editText, setEditText] = useState(true);
  const [isRegisterDropVisible, setIsRegisterDropVisible] = useState(false);

  const { profileData, isLoading, isError } = useGetProfile();

  useEffect(() => {
    if (
      profileData &&
      (profileData.interests || profileData.introduce || profileData.languages)
    ) {
      setEditText(false);
    }
  }, [profileData]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/login");
  };

  if (isLoading) return <Loading />;
  if (isError) return <>에러</>;

  return (
    <>
      <S.Wapper>
        <S.Content>
          <S.Header>
            <Text.Title1 color="gray900">마이페이지</Text.Title1>
          </S.Header>
          <S.Profile>
            <Profile />
            {editText ? (
              <S.EditBtn
                Color="#FF812E"
                onClick={() => router.push(`/mypage/edit`)}
              >
                <Text.Caption1
                  color="white"
                  pointer
                  onMouseEnter={() => setIsRegisterDropVisible(true)}
                  onMouseLeave={() => setIsRegisterDropVisible(false)}
                >
                  등록
                </Text.Caption1>
                {isRegisterDropVisible && (
                  <S.RegisterDrop>
                    <Text.Body2 color="black">
                      프로필을 등록해주세요!
                    </Text.Body2>
                  </S.RegisterDrop>
                )}
              </S.EditBtn>
            ) : (
              <S.EditBtn onClick={() => router.push(`/mypage/edit`)}>
                <Text.Caption1 color="gray700" pointer>
                  수정
                </Text.Caption1>
              </S.EditBtn>
            )}
          </S.Profile>
          <>
            <Margin direction="column" size={34} />
            <Text.Body1
              color="gray900"
              pointer
              onClick={() => router.push(`/mypage/postList`)}
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
      </S.Wapper>
    </>
  );
}

interface EditBtnProps {
  Color?: string;
}

const S = {
  Wapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  `,
  Content: styled.div`
    padding: 0 24px;
  `,
  Header: styled.div`
    width: 100%;
    height: 50px;
    padding: 14px 0;
  `,
  Profile: styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeef2;
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
    width: 45px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.Color || "#6c6c70"};
    background-color: ${(props) => props.Color || "white"};
    border-radius: 8px;
  `,
  RegisterDrop: styled.div`
    position: absolute;
    background-color: black;
    color: white;
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
