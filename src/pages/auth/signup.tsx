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
import { SignUpData, postSignUp } from "@/src/api/auth/signUpApi";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { useRecoilValue } from "recoil";

interface SdInputProps {
  complete: boolean;
}

export default function SignUp() {
  const [complete, setComplete] = useState(false);

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
      setComplete(true);
    }
  }, [signUpFormData]);

  const { mutate: signUpMutation } = useMutation((signUpData: SignUpData) =>
    postSignUp(signUpData)
  );

  const handleSignUpSubmit = () => {
    if (complete) {
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
      <Text.Title1 color="gray900">학생 정보</Text.Title1>
      <Margin direction="column" size={16} />
      <InputBox />
      <DropDown />
      <GenderSelectBox />
      <AgreeBox />
      <S.CompleteButton complete={complete} onClick={handleSignUpSubmit}>
        <Text.Body1 color={complete ? "white" : "gray500"}>작성완료</Text.Body1>
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
    height: 50px;
    background-color: ${(props) => (props.complete ? "#FF812E" : "#EEEEF2")};
    border-radius: 8px;
    width: 452px;
    margin-bottom: 144px;
  `,
};
