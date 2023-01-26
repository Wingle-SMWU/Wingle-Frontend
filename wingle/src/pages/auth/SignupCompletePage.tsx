import React from "react";
import styled from "styled-components";
import { Margin, Text } from "@/src/components/ui";
const Style = {
  Wrapper: styled.div`
    padding-left: 24px;
    padding-right: 38px;
    padding-top: 60px;
  `,
  TitleWrapper: styled.div`
    width: 193px;
    height: 68px;
    word-break: break-word;
    line-height: 33.6px;
  `,
};
export default function SignupComplete() {
  return (
    <Style.Wrapper>
      <Text.Body5 color="orange500">가입신청 완료</Text.Body5>
      <Margin direction="column" size={8} />
      <Style.TitleWrapper>
        <Text.Title1 color="gray900">
          가입이 승인되면 메일을 보내드릴게요
        </Text.Title1>
      </Style.TitleWrapper>
    </Style.Wrapper>
  );
}
