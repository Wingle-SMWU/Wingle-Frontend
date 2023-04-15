import React, { useState } from "react";
import styled from "styled-components";
import { Text, Margin } from "@/src/components/ui";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { signUpFormDataAtom, SignUpFormData } from "@/src/atoms/auth/signUpAtoms";

type SdInputProps = {
  isActive: boolean;
};

export default function StudentCard() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [signUpFormData, setSignUpFormData] = useRecoilState(signUpFormDataAtom);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const fileSizeInMB = imageFile.size / (1024 * 1024);
      if (fileSizeInMB > 20) {
        // 20MB 이하인 경우에만 처리
        setError(true);
        return;
      }
      setError(false);
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        setSignUpFormData((prev: SignUpFormData) => ({
          ...prev,
          idCardImage: reader.result as string,
        }));
        setUploadedFileName(imageFile.name);
      };
    }
  };

  return (
    <S.CertifyWrapper>
      <Text.Title1 color="gray900">
        학생증 인증
        <S.QuestionLogo
          src="/auth/question.svg"
          alt="question"
          onClick={() => {
            setIsActive((prev) => !prev);
          }}
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

      <S.UploadButton>
        <label htmlFor="file-input">
          <input
            id="file-input"
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <S.UploadLogo src="/auth/upload.svg" alt="upload" />
          <Text.Body1 color="gray700">학생증 업로드</Text.Body1>
        </label>
      </S.UploadButton>
      <Margin direction="column" size={8} />

      {error ? (
        <S.ErrorWrapper>
          <Image src="/auth/error.svg" alt="question" width={16} height={16} />
          <Margin direction="row" size={8} />
          <Text.Caption3 color="red500">파일 업로드를 실패했습니다</Text.Caption3>
        </S.ErrorWrapper>
      ) : uploadedFileName ? (
        <>
          <Text.Caption3 color="gray500">{uploadedFileName}</Text.Caption3>
        </>
      ) : (
        <Text.Caption3 color="gray500">20MB 이하 파일을 업로드해주세요.</Text.Caption3>
      )}
      <Margin direction="column" size={24} />
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
