import Footer from "@/src/components/layout/Footer";
import Profile from "@/src/components/mypage/Profile";
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
};

export default function Mypage() {
  return (
    <>
      <Style.Wapper>
        <Style.Content>
          <Style.Header>
            <Text.Title1 color="gray900">마이페이지</Text.Title1>
          </Style.Header>
          <Profile />

          <>
            <Margin direction="column" size={34} />
            <Text.Body1 color="gray900" pointer>
              내가 쓴 게시글
            </Text.Body1>
            <Margin direction="column" size={34} />
            <Text.Body1 color="gray900" pointer>
              로그아웃
            </Text.Body1>
          </>
        </Style.Content>
        <Footer />
      </Style.Wapper>
    </>
  );
}
