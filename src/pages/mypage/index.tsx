import Footer from "@/src/components/layout/Footer";
import Navigation from "@/src/components/layout/Navigation";
import Profile from "@/src/components/mypage/Profile";
import { Text, Margin } from "@/src/components/ui";
import router from "next/router";
import styled from "styled-components";
import { useEffect,useState } from "react";
import { getProfile } from "@/src/api/mypage/profileData";
import { useSetRecoilState, useRecoilValue }  from "recoil";
import { profileStateAtom } from "@/src/atoms/profileStateAtom";
import Loading from "@/src/components/ui/loadingUI";

export default function Mypage() {

  const [loading,setLoading] = useState(true); 

  const setProfileState = useSetRecoilState(profileStateAtom);

  useEffect(() => {
    const fetchProfile = async () => {
    try {
      const data = await getProfile();
      console.log(data)
      setProfileState(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to get profile:', error);
    }
  };

  fetchProfile();
}, []);

  const profileState = useRecoilValue(profileStateAtom);
  console.log(profileState)
  return (
    <>
      <S.Wapper>
        <S.Content>
          <S.Header>
            <Text.Title1 color="gray900">마이페이지</Text.Title1>
          </S.Header>
          <S.Profile>
            {loading? <Loading /> : <Profile /> }
           
            {/* 자기소개, 언어선택, 관심사 중 하나라도 등록되지 않은 사용자 ? 등록 : 수정*/}

            {/* <>

        <S.RegisterBtn
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
        </S.RegisterBtn>
        {isRegisterBtnHover && (
          <>
            <S.DropBubbleHigh />
            <S.DropBubbleLow>
              <Text.Body6>프로필을 등록해주세요!</Text.Body6>
            </S.DropBubbleLow>
          </>
        )}
        </> */}
            <S.EditBtn onClick={() => router.push(`/mypage/edit`)}>
              <Text.Caption1 color="gray700" pointer>
                수정
              </Text.Caption1>
            </S.EditBtn>
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
            <Text.Body1 color="gray900" pointer>
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
