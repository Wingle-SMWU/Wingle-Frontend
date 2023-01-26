import React, { useState, useEffect } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import InputBox from "../../components/authpage/registerInput";
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
  CompleteButton: styled.button`
    height: 50px;
    background-color: #eeeef2;
    border-radius: 8px;
    width: 452px;
  `,
};
export default function SignUp() {
  return (
    <>
      <Style.Wrapper>
        <Style.HeaderWrapper>
          <img src="/auth/arrow_back.svg" alt="arrow"></img>
          <Margin direction="row" size={14} />
          <Text.Title2 color="gray900">회원가입</Text.Title2>
        </Style.HeaderWrapper>
        <StudentCard />
        <Text.Title1 color="gray900">학생 정보</Text.Title1>
        <Margin direction="column" size={16} />
        {InputInfo.map((info) => (
          <InputBox
            title={info.title}
            type={info.type}
            placeholder={info.placeholder}
            button={info.button}
            small={info.small}
          />
        ))}
        <DropDown />
        <GenderSelectBox />
        <AgreeBox />
        <Style.CompleteButton
          onClick={() => router.replace("SignupCompletePage")}
        >
          <Text.Body1 color="gray500">작성완료</Text.Body1>
        </Style.CompleteButton>
      </Style.Wrapper>
    </>
  );
}
