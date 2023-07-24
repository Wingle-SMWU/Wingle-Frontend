import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Text, Margin } from "@/src/components/ui";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import { theme } from "@/src/styles/theme";
import { postIdCardImage } from "@/src/api/auth/signUpApi";
import { useMutation } from "react-query";
import { useTranslation } from "next-i18next";

export default function StudentCard(): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

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
            idCardImageUrl: "", // ""로 초기화
          })
        );
        return;
      }
      setError(false);

      // 파일명 가져오기
      const fileName = imageFile.name;
      setUploadedFileName(fileName);

      const formData = new FormData();
      formData.append("idCardImage", imageFile);
      uploadIdCardImage(formData);
    }
  };

  // React Query
  const { mutate: uploadIdCardImage } = useMutation(postIdCardImage, {
    onSuccess: (data) => {
      setSignUpFormData((prev) => ({
        ...prev,
        idCardImageUrl: data.data.idCardImageUrl,
      }));
    },
    onError: () => {
      // 요청이 실패한 경우 에러 처리
      setError(true);
      setSignUpFormData((prev) => ({
        ...prev,
        idCardImageUrl: "",
      }));
    },
  });

  const handleUploadButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <S.CertifyWrapper>
      <S.Header>
        <Text.Title1 color="gray900">
          {t("auth:title.ID-card")}
          <S.QuestionLogo
            src="/auth/question.svg"
            alt="question"
            onClick={(): void => {
              setIsActive((prev: boolean): boolean => !prev);
            }}
          ></S.QuestionLogo>
        </Text.Title1>
        <S.DescriptionContent isActive={isActive}>
          <Text.Body4 color="gray100">
            {t("auth:caption.studentCard-1")}
          </Text.Body4>
          <Margin direction="column" size={8} />
          <Text.Body5 color="gray100">
            {t("auth:caption.studentCard-2")}
          </Text.Body5>
          <Text.Body6 color="gray100">
            {t("auth:caption.studentCard-3")}
          </Text.Body6>
        </S.DescriptionContent>
      </S.Header>
      <Margin direction="column" size={16} />

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
        <Text.Body1 color="white">{t("auth:btn.ID-card")}</Text.Body1>
      </S.UploadButton>
      <Margin direction="column" size={8} />

      {error ? (
        <S.ErrorWrapper>
          <Image src="/auth/error.svg" alt="question" width={16} height={16} />
          <Margin direction="row" size={8} />
          <Text.Caption3 color="red500">
            {t("auth:caption.studentCard-error")}
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
          {t("auth:caption.ID-card")}
        </Text.Caption3>
      )}
      <Margin direction="column" size={52} />
    </S.CertifyWrapper>
  );
}

const S = {
  Header: styled.div`
    width: calc(100vw - 32px);
    max-width: 452px;
  `,
  CertifyWrapper: styled.div`
    position: relative;
    border-bottom: 1px solid #dcdce0;
    margin-top: 46px;
    margin-bottom: 24px;
  `,
  QuestionLogo: styled.img`
    padding-left: 5px;
    cursor: pointer;
  `,

  DescriptionContent: styled.div<{ isActive: boolean }>`
    display: ${(props): "none" | "block" =>
      props.isActive ? `block` : `none`};
    position: absolute;
    border-radius: 8px;
    background-color: #49494d;
    padding: 24px;
    top: 49px;
  `,
  ErrorWrapper: styled.div`
    display: flex;
  `,

  UploadButton: styled.button`
    width: 100%;
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
