import styled from "styled-components";
import { Margin, Text } from "../../ui";
import Link from "next/link";
import { theme } from "@/src/styles/theme";

export default function Footer() {
  return (
    <>
      <S.Wrapper>
        <S.Content>
          <S.WingleLogo src="footer-logo.png" alt="wingle-logo" />
          <Margin direction="column" size={32} />
          <Text.Caption2 color="gray500">
            <Link
              href="https://www.notion.so/wingleeng/WINGLE-65d959f2494b4fc191fb8cbf3803eb08"
              style={{ textDecoration: "none", color: theme.color.gray500 }}
            >
              공식 노션 바로가기
            </Link>
            &nbsp;|&nbsp;
            <Link
              href="https://www.instagram.com/wingle_official"
              style={{ textDecoration: "none", color: theme.color.gray500 }}
            >
              윙글 SNS 바로가기
            </Link>
          </Text.Caption2>
          <Margin direction="column" size={11} />
          <Text.Caption2 color="gray500">
            문의 |&nbsp;
            <Link
              href="mailto:wingle.kr@gmail.com"
              style={{ textDecoration: "none", color: theme.color.gray500 }}
            >
              wingle.kr@gmail.com
            </Link>
          </Text.Caption2>
          <Margin direction="column" size={11} />
          <Text.Caption2 color="gray500">
            이용약관 | &nbsp;
            <Link
              href="https://wingleeng.notion.site/d9824ef9e1cb49f293137cea583ec087?pvs=4"
              style={{ textDecoration: "none", color: theme.color.gray500 }}
            >
              개인정보처리방침
            </Link>
          </Text.Caption2>
        </S.Content>
      </S.Wrapper>
    </>
  );
}

const S = {
  Wrapper: styled.div`
    width: 500px;
    height: 270px;
    position: fixed;
    bottom: 0;
    background-color: #fcfcfc;
    border-top: 1px solid #eeeef2;
  `,
  Content: styled.div`
    @media (max-width: 500px) {
      width: calc(100vw - 48px);
    }
    padding: 32px 24px;
  `,
  WingleLogo: styled.img`
    width: 80px;
    height: 30px;
  `,
};
