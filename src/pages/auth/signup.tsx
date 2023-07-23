import React, { useState, useEffect } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import InputBox from "../../components/authpage/signup/signUpInput/index";
import DropDown from "../../components/authpage/signup/dropDownSignUpCountry";
import StudentCard from "../../components/authpage/signup/studentCard";
import GenderSelectBox from "../../components/authpage/signup/genderSelect";
import AgreeBox from "@/src/components/authpage/signup/agreeBox";
import router from "next/router";
import Image from "next/image";
import { useMutation } from "react-query";
import { postSignUp } from "@/src/api/auth/signUpApi";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { useRecoilValue } from "recoil";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";

export default function SignUp(): JSX.Element {
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [buttonMent, setButtonMent] = useState("작성완료");

  const signUpFormData = useRecoilValue(signUpFormDataAtom);

  useEffect(() => {
    if (
      signUpFormData.idCardImageUrl &&
      signUpFormData.email &&
      signUpFormData.password &&
      signUpFormData.schoolId &&
      signUpFormData.department &&
      signUpFormData.studentNumber &&
      signUpFormData.name &&
      signUpFormData.nation &&
      signUpFormData.termsOfUse &&
      signUpFormData.termsOfPersonalInformation
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [signUpFormData]);

  const { mutate: signUpMutation } = useMutation(
    (signUpData: SignUpFormData) => postSignUp(signUpData),
    {
      onMutate: () => {
        setButtonDisabled(true);
        setButtonMent("제출 중");
      },
      onSuccess: () => router.push("/auth/complete"),
      onError: () => {
        alert("제출 중 오류가 생겼습니다. 다시 시도해주세요.");
        setButtonDisabled(false);
        setButtonMent("작성완료");
      },
    }
  );

  const handleSignUpSubmit = (): void => {
    if (!isButtonDisabled) {
      signUpMutation(signUpFormData);
    }
  };

  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <S.BackButton
          src="/auth/arrow_back.svg"
          alt="arrow"
          width={24}
          height={24}
          onClick={(): Promise<boolean> => router.push("/auth/login")}
        />
        <Margin direction="row" size={14} />
        <Text.Title2 color="gray900">회원가입</Text.Title2>
      </S.HeaderWrapper>

      <StudentCard />
      <InputBox />
      <DropDown />
      <GenderSelectBox />
      <AgreeBox />

      <S.CompleteButton
        disabled={isButtonDisabled}
        onClick={handleSignUpSubmit}
      >
        {buttonMent}
      </S.CompleteButton>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    padding-left: 24px;
    padding-right: 24px;
  `,
  HeaderWrapper: styled.div`
    padding: 16px 0;
    display: flex;
    align-items: center;
  `,
  BackButton: styled(Image)`
    cursor: pointer;
  `,
  CompleteButton: styled.button<{ disabled: boolean }>`
    background-color: ${({ disabled }): string =>
      disabled ? "#EEEEF2" : "#FF812E"};
    color: ${({ disabled }): string => (disabled ? "#959599" : "#fff")};
    border-radius: 8px;
    width: 100%;
    height: 50px;
    margin-bottom: 144px;
    cursor: ${({ disabled }): string => (disabled ? "not-allowed" : "pointer")};
    border-radius: 8px;
    margin: 0 auto;
    font-weight: 700;
    font-size: 16px;
    line-height: 22.4px;
    margin-bottom: 144px;
  `,
};
