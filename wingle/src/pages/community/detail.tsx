import Body from "@/src/components/community/detail/body";
import Comment from "@/src/components/community/detail/comment";
import CommentInput from "@/src/components/community/detail/commentInput";
import Header from "@/src/components/community/detail/header";
import Profile from "@/src/components/community/detail/profile";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Detail() {
  const router = useRouter();
  const currentTab = `${router.query.tab}`;

  return (
    <Style.Wrapper>
      <Style.DetailTop>
        <Header currentTab={currentTab} />
        <Profile currentTab={currentTab} />
        <Body />
        <Comment currentTab={currentTab} />
      </Style.DetailTop>
      <CommentInput />
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  DetailTop: styled.div``,
};
