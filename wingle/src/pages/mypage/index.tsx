import Footer from "@/src/components/layout/Footer";
import Navigation from "@/src/components/layout/Navigation";
import Profile from "@/src/components/mypage/Profile";
import { Text, Margin } from "@/src/components/ui";
import router from "next/router";
import styled from "styled-components";

const Style = {
    Wapper: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* border: 1px solid red; */
        position: relative;
    `,
    Content: styled.div`
        padding: 24px;
    `,
    Header: styled.div`
        width: 100%;
        height: 56px;
    `,
    Profile: styled.div`
        display: flex;
        align-items: center;
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

export default function Mypage() {
    return (
        <>
            <Style.Wapper>
                <Style.Content>
                    <Style.Header>
                        <Text.Title1 color="gray900">마이페이지</Text.Title1>
                    </Style.Header>

                    <Style.Profile>
                        <Profile />
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
                            <Text.Caption1 color="gray700" pointer onClick={() => router.push(`/mypage/edit`)}>
                                수정
                            </Text.Caption1>
                        </Style.EditBtn>
                    </Style.Profile>
                    <>
                        <Margin direction="column" size={34} />
                        <Text.Body1 color="gray900" pointer onClick={() => router.push(`/mypage/postList`)}>
                            내가 쓴 게시글
                        </Text.Body1>
                        <Margin direction="column" size={34} />
                        <Text.Body1 color="gray900" pointer>
                            로그아웃
                        </Text.Body1>
                    </>
                </Style.Content>
                <Footer />
                <Navigation />
            </Style.Wapper>
        </>
    );
}
