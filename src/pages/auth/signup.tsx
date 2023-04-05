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

interface SdInputProps {
  complete: boolean;
}

export default function SignUp() {
  useEffect(() => {
    handleComplete();
  });
  const [error, setError] = useState(false);
  const [check, setCheck] = useState(false);
  const [complete, setComplete] = useState(false);
  const getError = (error: any) => {
    setError(error);
  };
  const getCheck = (check: any) => {
    setCheck(check);
  };
  const handleComplete = () => {
    if (error === false && check === true) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  };
  return (
    <>
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
      </S.Wrapper>
    </>
  );
}
