import React, { useState } from "react";
import styled from "styled-components";
import { Text, Margin } from "@/src/components/ui";
import Image from "next/image";

type SdInputProps = {
  isActive: boolean;
};
type UploadButtonProps = {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StudentCard() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size > 20000000) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <S.CertifyWrapper>
      <Text.Title1 color="gray900">
        학생증 인증
        <S.QuestionLogo
          src="/auth/question.svg"
          alt="question"
          onClick={() => setIsActive((prev) => !prev)}
        ></S.QuestionLogo>
      </Text.Title1>
      <Margin direction="column" size={16} />

      <S.DescriptionContent isActive={isActive}>
        <S.Description>
          <Text.Body5 color="gray100">학생증 인증 방법</Text.Body5>
          <Margin direction="column" size={8} />
          <Text.Body6 color="gray100">
            카드 학생증 앞면/모바일 학생증 캡처본/숙명포털-학적사항 중 한 가지를 첨부해주세요.
            (이름, 학과, 학번이 정확히 나와야 합니다.)
          </Text.Body6>
        </S.Description>
      </S.DescriptionContent>

      <S.UploadButton onClick={handleFileUpload}>
        <S.UploadLogo src="/auth/upload.svg" alt="upload" />
        <Text.Body1 color="gray700">학생증 업로드</Text.Body1>
      </S.UploadButton>
      <Margin direction="column" size={8} />

      {error ? (
        <S.ErrorWrapper>
          <Image src="/auth/error.svg" alt="question" />
          <Margin direction="row" size={8} />
          <Text.Caption3 color="red500">파일 업로드를 실패했습니다</Text.Caption3>
        </S.ErrorWrapper>
      ) : (
        <Text.Caption3 color="gray500">20MB 이하 파일을 업로드해주세요.</Text.Caption3>
      )}
      <Margin direction="column" size={25} />
    </S.CertifyWrapper>
  );
}

const S = {
  CertifyWrapper: styled.div`
    border-bottom: 1px solid #dcdce0;
    margin-top: 46px;
    margin-bottom: 24px;
  `,
  QuestionLogo: styled.img`
    padding-left: 5px;
  `,

  DescriptionContent: styled.div<SdInputProps>`
    display: ${(props) => (props.isActive ? `block` : `none`)};
    position: absolute;
    width: 452px;
    height: 100px;
    border-radius: 8px;
    background-color: #49494d;
  `,
  Description: styled.div`
    padding: 16px;
  `,
  ErrorWrapper: styled.div`
    display: flex;
  `,
  UploadButton: styled.button<UploadButtonProps>`
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
