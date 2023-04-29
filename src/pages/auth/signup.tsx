import React, { useState, useEffect } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import InputBox from "../../components/authpage/signup/signUpInput";
import DropDown from "../../components/authpage/signup/dropDown";
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

interface SdInputProps {
  disabled: boolean;
}

export default function SignUp() {
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const signUpFormData = useRecoilValue(signUpFormDataAtom);

  useEffect(() => {
    if (
      signUpFormData.idCardImage &&
      signUpFormData.email &&
      signUpFormData.password &&
      signUpFormData.name &&
      signUpFormData.nation &&
      signUpFormData.termsOfUse &&
      signUpFormData.termsOfPersonalInformation
    ) {
      console.log("완료");

      setButtonDisabled(false);
    }
    console.log(signUpFormData);
  }, [signUpFormData]);

  const { mutate: signUpMutation } = useMutation(
    (signUpData: SignUpFormData) => postSignUp(signUpData),
    { onSuccess: () => router.push("/auth/login") }
  );

  const handleSignUpSubmit = () => {
    if (!isButtonDisabled) {
      console.log("실행");

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
          onClick={() => router.push("/auth/login")}
        />
        <Margin direction="row" size={14} />
        <Text.Title2 color="gray900">회원가입</Text.Title2>
      </S.HeaderWrapper>

      <StudentCard />
      <InputBox />
      <DropDown />
      <GenderSelectBox />
      <AgreeBox />

      <S.CompleteButton disabled={isButtonDisabled} onClick={handleSignUpSubmit}>
        작성완료
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
  `,
  BackButton: styled(Image)`
    cursor: pointer;
  `,
  CompleteButton: styled.button<SdInputProps>`
    background-color: ${({ disabled }) => (disabled ? "#EEEEF2" : "#FF812E")};
    color: ${({ disabled }) => (disabled ? "#959599" : "#fff")};
    border-radius: 8px;
    width: 452px;
    height: 50px;
    margin-bottom: 144px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    border-radius: 8px;
    margin: 0 auto;
    font-weight: 700;
    font-size: 16px;
    line-height: 22.4px;
    margin-bottom: 144px;
  `,
};
