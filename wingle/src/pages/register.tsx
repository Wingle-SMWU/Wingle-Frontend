import React, { useState } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";

const Style = {
  Wrapper: styled.div`
    padding-left: 24px;
    padding-right: 24px;
  `,
  HeaderWrapper: styled.div`
    padding: 16px;
    display: flex;
  `,

  QuestionLogo: styled.img`
    padding-left: 5px;
  `,
  UploadButton: styled.button`
    width: 452px;
    border: 1px solid #6c6c70;
    height: 52px;
    border-radius: 8px;
  `,
  UploadLogo: styled.img`
    padding-right: 10px;
    padding-top: 15px;
  `,
};
export default function Register() {
  return (
    <>
      <Style.Wrapper>
        <Style.HeaderWrapper>
          <img src="login/arrow_back.svg" alt="arrow"></img>
          <Margin direction="row" size={14} />
          <Text.Title2 color="gray900">회원가입</Text.Title2>
        </Style.HeaderWrapper>
        <Margin direction="column" size={48} />

        <Text.Title1 color="gray900">
          학생증 인증
          <Style.QuestionLogo
            src="login/question.svg"
            alt="question"
          ></Style.QuestionLogo>
        </Text.Title1>

        <Margin direction="column" size={16} />

        <Style.UploadButton>
          <Style.UploadLogo src="login/upload.svg" alt="upload" />
          <Text.Body1 color="gray700">학생증 업로드</Text.Body1>
        </Style.UploadButton>
      </Style.Wrapper>
    </>
  );
}
