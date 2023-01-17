import styled from "styled-components";
import { Margin } from "../../ui";

const Style = {
  Wrapper: styled.div`
    width: 500px;
    height: 270px;
    background-color: #fcfcfc;
    border-top: 1px solid #eeeef2;
  `,
  Content: styled.div`
    padding: 32px 24px;
  `,
  WingleLogo: styled.img`
    width: 80px;
    height: 30px;
  `,
};

export default function Footer() {
  return (
    <>
      <Style.Wrapper>
        <Style.Content>
          <Style.WingleLogo />
          <Margin direction="column" size={32} />
        </Style.Content>
      </Style.Wrapper>
    </>
  );
}
