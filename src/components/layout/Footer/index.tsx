import styled from "styled-components";
import { Margin, Text } from "../../ui";
import Link from "next/link";
import { theme } from "@/src/styles/theme";
import Image from "next/image";

export default function Footer() {
  return (
    <S.Wrapper>
      <S.NotionLinkWrapper>
        <Text.Caption2 color="gray500">공식 노션 바로가기</Text.Caption2>
        <Link
          href="https://www.notion.so/wingleeng/WINGLE-65d959f2494b4fc191fb8cbf3803eb08"
          style={{ textDecoration: "none", color: theme.color.gray500 }}
        >
          <Image src="/golink.svg" alt="golink" width={20} height={20} />
        </Link>
      </S.NotionLinkWrapper>
      <Margin direction="column" size={11} />
      <Text.Caption2 color="gray500">
        <Link
          href="https://wingleeng.notion.site/d75c38cfbedd47309a839b055d56e3d2?pvs=4"
          style={{ textDecoration: "none", color: theme.color.gray500 }}
        >
          이용약관
        </Link>
        &nbsp; | &nbsp;
        <Link
          href="https://wingleeng.notion.site/d9824ef9e1cb49f293137cea583ec087?pvs=4"
          style={{ textDecoration: "none", color: theme.color.gray500 }}
        >
          개인정보처리방침
        </Link>
      </Text.Caption2>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    max-width: 452px;
    width: calc(100vw - 48px);
    position: fixed;
    bottom: 70px;
    padding: 24px;
    background-color: #fcfcfc;
    border-top: 1px solid #eeeef2;
  `,
  NotionLinkWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  WingleLogo: styled.img`
    width: 80px;
    height: 30px;
  `,
};
