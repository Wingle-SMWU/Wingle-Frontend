import React, { useState, useEffect } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import InputBox from "../../components/authpage/SignUpInput";
import DropDown from "../../components/authpage/dropDown";
import StudentCard from "../../components/authpage/studentCard";
import { InputInfo } from "../../components/authpage/inputInformation";
import GenderSelectBox from "@/src/components/authpage/genderSelect";
import AgreeBox from "@/src/components/authpage/agreeBox";
import router from "next/router";
const Style = {
  Wrapper: styled.div`
    padding-left: 24px;
    padding-right: 24px;
  `,
  HeaderWrapper: styled.div`
    padding: 16px;
    display: flex;
  `,
  CompleteButton: styled.button<StyledInputProps>`
    height: 50px;
    background-color: ${(props) => (props.complete ? "#FF812E" : "#EEEEF2")};
    border-radius: 8px;
    width: 452px;
    margin-bottom: 333px;
  `,
};

interface StyledInputProps {
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
      <Style.Wrapper>
        <Style.HeaderWrapper>
          <img
            src="/auth/arrow_back.svg"
            alt="arrow"
            onClick={() => router.push("/")}
          ></img>
          <Margin direction="row" size={14} />
          <Text.Title2 color="gray900">회원가입</Text.Title2>
        </Style.HeaderWrapper>
        <StudentCard />
        <Text.Title1 color="gray900">학생 정보</Text.Title1>
        <Margin direction="column" size={16} />
        <InputBox getError={getError} />
        <DropDown />
        <GenderSelectBox />
        <AgreeBox getCheck={getCheck} />
        <Style.CompleteButton
          complete={complete}
          onClick={() =>
            complete
              ? router.replace("SignupCompletePage")
              : console.log("disabled")
          }
        >
          <Text.Body1 color={complete ? "white" : "gray500"}>
            작성완료
          </Text.Body1>
        </Style.CompleteButton>
      </Style.Wrapper>
    </>
  );
}
