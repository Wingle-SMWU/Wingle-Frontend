import styled from "styled-components";
import { Text } from "../../ui";

const Style = {
  Header: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 14px 24px;
  `,

  HeaderBar: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #eeeef2;
    padding: 8px 24px;
    gap: 24px;
  `,
};

export default function Header() {
  return (
    <>
      <Style.Header>
        <Text.Title2 color="gray900">커뮤니티</Text.Title2>
      </Style.Header>
      <Style.HeaderBar>
        <Text.Title3 color="gray900">자유</Text.Title3>
        <Text.Title3 color="gray500">교류</Text.Title3>
        <Text.Title3 color="gray500">공지</Text.Title3>
      </Style.HeaderBar>
    </>
  );
}
