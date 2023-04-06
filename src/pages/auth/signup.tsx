import React, { useState, useEffect } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import InputBox from "../../components/authpage/signup/signUpInput";
import DropDown from "../../components/authpage/signup/dropDown";
import StudentCard from "../../components/authpage/signup/studentCard";
import { InputInfo } from "../../components/authpage/signup/inputInformation";
import GenderSelectBox from "../../components/authpage/signup/genderSelect";
import AgreeBox from "@/src/components/authpage/signup/agreeBox";
import router from "next/router";
import Image from "next/image";
import { useMutation } from "react-query";
import axios from "axios";

interface SdInputProps {
  complete: boolean;
}

interface SignUpData {
  idCardImage: string;
  email: string;
  password: string;
  name: string;
  isNicknameChecked: boolean;
  nickname: string;
  gender: boolean;
  nation: string;
  termsOfUse: boolean;
  termsOfPersonalInformation: boolean;
  termsOfPromotion: boolean;
}

export default function SignUp() {
  useEffect(() => {
    handleComplete();
  });

  const [error, setError] = useState<Boolean>(false);
  const [check, setCheck] = useState<Boolean>(false);
  const [complete, setComplete] = useState(false);

  const getError = (error: Boolean) => {
    setError(error);
  };

  const getCheck = (check: Boolean) => {
    setCheck(check);
  };

  const handleComplete = () => {
    if (error === false && check === true) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  };

  const signUpMutation = useMutation((signUpData: SignUpData) =>
    axios.post("/api/signup", signUpData)
  );

  const handleSignUpSubmit = () => {
    // TODO: 제출
    // if (complete) {
    //   signUpMutation.mutate({
    //     idCardImage: "image",
    //     email: "wingle@gmail.com",
    //     password: "1234!",
    //     name: "김윙글",
    //     isNicknameChecked: true,
    //     nickname: "윙그리",
    //     gender: true,
    //     nation: "kr",
    //     termsOfUse: true,
    //     termsOfPersonalInformation: true,
    //     termsOfPromotion: false,
    //   });
    // }
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
      <form onSubmit={handleSignUpSubmit}>
        <StudentCard />
        <Text.Title1 color="gray900">학생 정보</Text.Title1>
        <Margin direction="column" size={16} />
        <InputBox getError={getError} />
        <DropDown />
        <GenderSelectBox />
        <AgreeBox getCheck={getCheck} />
        <S.CompleteButton
          complete={complete}
          onClick={() => (complete ? router.replace("complete") : console.log("disabled"))}
        >
          <Text.Body1 color={complete ? "white" : "gray500"}>작성완료</Text.Body1>
        </S.CompleteButton>
      </form>
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
    margin-bottom: 333px;
  `,
};
