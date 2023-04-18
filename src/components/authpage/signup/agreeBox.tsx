import React, { useState, useCallback, useEffect } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";

interface SdInputProps {
  Condition: boolean;
}

interface WrapperComponentProps {
  title: string;
  content: string;
  icon: boolean;
  must: string;
  handleCheck: (check: boolean) => void;
}

function WrapperComponent({ title, content, icon, must, handleCheck }: WrapperComponentProps) {
  const [isAgreed, setAgreed] = useState(false);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    handleCheck(isAgreed);
  }, [handleCheck, isAgreed]);

  return (
    <>
      <S.ContentWrapper>
        <Image
          alt="selectedCheck"
          width={20}
          height={20}
          src={isAgreed ? "/auth/selectedCheck.svg" : "/auth/unselectedCheck.svg"}
          onClick={() => {
            setAgreed((prev) => !prev);
          }}
        />
        <Margin direction="row" size={8} />
        <Text.Body2 color="gray900">{title}</Text.Body2>
        <Margin direction="row" size={3} />
        <Text.Body2 color={icon ? "orange500" : "gray500"}>{must}</Text.Body2>

        <S.Img Condition={icon}>
          <Image
            alt="selectedCheck"
            width={20}
            height={20}
            src="/auth/arrow_down.svg"
            onClick={() => {
              setActive((prev) => !prev);
            }}
          />
        </S.Img>
      </S.ContentWrapper>

      <S.Content Condition={isActive}>
        <Text.Body6 color="gray700">{content}</Text.Body6>
      </S.Content>
    </>
  );
}

export default function AgreeBox() {
  const [termsOfUse, checkTermsOfUse] = useState(false);
  const [termsOfPersonalInformation, checkTermsOfPersonalInformation] = useState(false);
  const [termsOfPromotion, checkTermsOfPromotion] = useState(false);

  const handleUseCheck = useCallback((check: boolean) => {
    checkTermsOfUse(check);
  }, []);

  const handlePersonalInformationCheck = useCallback((check: boolean) => {
    checkTermsOfPersonalInformation(check);
  }, []);

  const handlePromotionCheck = useCallback((check: boolean) => {
    checkTermsOfPromotion(check);
  }, []);

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  useEffect(() => {
    if (termsOfUse && termsOfPersonalInformation) {
      setSignUpFormData((prev) => ({
        ...prev,
        termsOfUse: termsOfUse,
        termsOfPersonalInformation: termsOfPersonalInformation,
        termsOfPromotion: termsOfPromotion,
      }));
    }
  }, [setSignUpFormData, termsOfPersonalInformation, termsOfPromotion, termsOfUse]);

  return (
    <>
      <Text.Body1 color="gray700">이용약관 동의</Text.Body1>
      <S.Wrapper>
        <WrapperComponent
          title="서비스 이용약관"
          icon={true}
          must={"(필수)"}
          handleCheck={handleUseCheck}
          content={""}
        />
        <Margin direction="column" size={18} />
        <WrapperComponent
          title="개인정보 수집 및 이용동의"
          icon={true}
          must={"(필수)"}
          handleCheck={handlePersonalInformationCheck}
          content={""}
        />
        <Margin direction="column" size={18} />
        <WrapperComponent
          title="이벤트, 프로모션알림 메일 수신"
          icon={false}
          must={"(선택)"}
          handleCheck={handlePromotionCheck}
          content={""}
        />
      </S.Wrapper>
    </>
  );
}

const S = {
  Wrapper: styled.div`
    margin-top: 8px;
    margin-bottom: 48px;
  `,
  ContentWrapper: styled.div`
    display: flex;
  `,
  Content: styled.div<SdInputProps>`
    display: ${(props) => (props.Condition ? `block` : `none`)};
    overflow: auto;
    margin-top: 8px;
    padding: 16px;
    background-color: #fff3eb;
    border: 1px solid #ffb07e;
    border-radius: 8px;
    height: 140px;
  `,
  Img: styled.div<SdInputProps>`
    margin-left: auto;
    display: ${(props) => (props.Condition ? `block` : `none`)};
  `,
};
