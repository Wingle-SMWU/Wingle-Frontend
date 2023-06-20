import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Text, Margin } from "@/src/components/ui";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import { theme } from "@/src/styles/theme";

export default function StudentCard(): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // TODO: 이미지 업로드 시 MultipartFile로 변환해서 보내야 함
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const fileSizeInMB = imageFile.size / (1024 * 1024);
      if (fileSizeInMB > 20) {
        // 20MB 이하인 경우에만 처리
        setError(true);
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            idCardImage: null, // null 로 초기화
          })
        );
        return;
      }
      setError(false);
      const formData = new FormData();
      formData.append("idCardImage", imageFile);
      // MultipartFile 데이터를 formData 에 append
      setSignUpFormData(
        (prev: SignUpFormData): SignUpFormData => ({
          ...prev,
          idCardImage: formData,
        })
      );
      setUploadedFileName(imageFile.name);
    }
  };

  const handleUploadButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <S.CertifyWrapper>
      <Text.Title1 color="gray900">
        학생증 인증
        <S.QuestionLogo
          src="/auth/question.svg"
          alt="question"
          onClick={(): void => {
            setIsActive((prev: boolean): boolean => !prev);
          }}
        ></S.QuestionLogo>
      </Text.Title1>
      <Margin direction="column" size={16} />

      <S.DescriptionContent isActive={isActive}>
        <S.Description>
          <Text.Body5 color="gray100">학생증 인증 방법</Text.Body5>
          <Margin direction="column" size={8} />
          <Text.Body6 color="gray100">
            카드 학생증 앞면/모바일 학생증 캡처본/숙명포털-학적사항 중 한 가지를
            첨부해주세요. (이름, 학과, 학번이 정확히 나와야 합니다.)
          </Text.Body6>
        </S.Description>
      </S.DescriptionContent>

      <S.UploadButton onClick={handleUploadButtonClick}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <S.UploadLogo
          src="/auth/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />
        <Text.Body1 color="white">학생증 업로드</Text.Body1>
      </S.UploadButton>
      <Margin direction="column" size={8} />

      {error ? (
        <S.ErrorWrapper>
          <Image src="/auth/error.svg" alt="question" width={16} height={16} />
          <Margin direction="row" size={8} />
          <Text.Caption3 color="red500">
            파일 업로드를 실패했습니다
          </Text.Caption3>
        </S.ErrorWrapper>
      ) : uploadedFileName ? (
        <S.AttagementButton onClick={handleUploadButtonClick}>
          <S.AttagementLogo
            src="/auth/attachment.svg"
            alt="attachment"
            width={12}
            height={13}
          />
          <Text.Caption3 color="gray900">{uploadedFileName}</Text.Caption3>
        </S.AttagementButton>
      ) : (
        <Text.Caption3 color="gray500">
          20MB 이하 파일을 업로드해주세요.
        </Text.Caption3>
      )}
      <Margin direction="column" size={52} />
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

  DescriptionContent: styled.div<{ isActive: boolean }>`
    display: ${(props): "none" | "block" =>
      props.isActive ? `block` : `none`};
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
    height: 52px;
    background-color: ${theme.color.orange500};
    outline: none;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    padding: 15px;
    cursor: pointer;

    span {
      cursor: pointer;
    }
  `,
  UploadLogo: styled(Image)`
    padding-right: 10px;
  `,
  AttagementLogo: styled(Image)`
    padding-right: 6px;
  `,
  AttagementButton: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      cursor: pointer;
    }
  `,
};
