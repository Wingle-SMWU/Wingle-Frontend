import React from "react";
import styled from "styled-components";
import { Margin, Text } from "@/src/components/ui";
import Image from "next/image";

const Style = {
  Wrapper: styled.div`
    padding-left: 24px;
    padding-right: 38px;
    padding-top: 60px;
  `,
  TitleWrapper: styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 33.6px;
  `,
  ContentWrapper: styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 19.6px;
    color: #6c6c70;
  `,
  IMGWrapper: styled.div`
    margin-left: 216px;
  `,
};
export default function SignupComplete() {
  return (
    <>
      <Style.Wrapper>
        <Text.Body5 color="orange500">가입신청 완료</Text.Body5>
        <Margin direction="column" size={8} />
        <Style.TitleWrapper>가입이 승인되면</Style.TitleWrapper>
        <Style.TitleWrapper>메일을 보내드릴게요</Style.TitleWrapper>
        <Margin direction="column" size={8} />
        <Style.ContentWrapper>메일이 오지 않는다면 스펨함을 확인하거나</Style.ContentWrapper>
        <Style.ContentWrapper>wingle.kr@gmail.com으로 문의해주세요.</Style.ContentWrapper>
      </Style.Wrapper>
      <Margin direction="column" size={77} />
      <Style.IMGWrapper>
        <Image src="/auth/completed.svg" alt="완료 이미지" />
      </Style.IMGWrapper>
    </>
  );
}
