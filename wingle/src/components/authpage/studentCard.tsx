import React from "react";
import styled from "styled-components";
import { Text, Margin } from "@/src/components/ui";
const Style = {
  CertifyWrapper: styled.div`
    border-bottom: 1px solid #dcdce0;
    margin-top: 46px;
    margin-bottom: 24px;
  `,
  QuestionLogo: styled.img`
    padding-left: 5px;
  `,
  UploadButton: styled.button`
    width: 452px;
    border: 1px solid #6c6c70;
    height: 52px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    padding: 15px;
  `,
  UploadLogo: styled.img`
    padding-right: 10px;
  `,
};
export default function StudentCard() {
  return (
    <Style.CertifyWrapper>
      <Text.Title1 color="gray900">
        학생증 인증
        <Style.QuestionLogo
          src="/auth/question.svg"
          alt="question"
        ></Style.QuestionLogo>
      </Text.Title1>
      <Margin direction="column" size={16} />
      <Style.UploadButton>
        <Style.UploadLogo src="/auth/upload.svg" alt="upload" />
        <Text.Body1 color="gray700">학생증 업로드</Text.Body1>
      </Style.UploadButton>
      <Margin direction="column" size={8} />
      <Text.Caption3 color="gray500">
        20MB 이하 파일을 업로드해주세요.
      </Text.Caption3>
      <Margin direction="column" size={25} />
    </Style.CertifyWrapper>
  );
}
