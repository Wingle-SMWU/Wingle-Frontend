import styled from "styled-components";
import { Text } from "../../ui";

const Style = {
  Footer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 71px;
    border-top: 1px solid #eeeef2;
  `,

  FooterMenu: styled.div`
    width: 104px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12.5px 24px;
  `,

  FooterMenuImg: styled.img``,
};

export default function Footer() {
  return (
    <Style.Footer>
      <Style.FooterMenu>
        <Style.FooterMenuImg src="community/list/comu_normal.svg" />
        <Text.Caption2 color="gray900">커뮤니티</Text.Caption2>
      </Style.FooterMenu>
      <Style.FooterMenu>
        <Style.FooterMenuImg src="community/list/message_disable.svg" />
        <Text.Caption2 color="gray500">쪽지</Text.Caption2>
      </Style.FooterMenu>
      <Style.FooterMenu>
        <Style.FooterMenuImg src="community/list/mypage_disabled.svg" />
        <Text.Caption2 color="gray500">마이페이지</Text.Caption2>
      </Style.FooterMenu>
    </Style.Footer>
  );
}
