import React, { useState } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import InputBox from "../components/registerInput";

const Style = {
  Wrapper: styled.div`
    padding-left: 24px;
    padding-right: 24px;
  `,
  HeaderWrapper: styled.div`
    padding: 16px;
    display: flex;
  `,

  CertifyWrapper: styled.div`
    border-bottom: 1px solid #dcdce0;
  `,
  QuestionLogo: styled.img`
    padding-left: 5px;
  `,
  UploadButton: styled.button`
    width: 452px;
    border: 1px solid #6c6c70;
    height: 52px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    padding: 15px;
  `,
  UploadLogo: styled.img`
    padding-right: 10px;
  `,
  InputWrapper: styled.div``,
};
export default function Register() {
  return (
    <>
      <Style.Wrapper>
        <Style.HeaderWrapper>
          <img src="login/arrow_back.svg" alt="arrow"></img>
          <Margin direction="row" size={14} />
          <Text.Title2 color="gray900">회원가입</Text.Title2>
        </Style.HeaderWrapper>

        <Margin direction="column" size={48} />

        <Style.CertifyWrapper>
          <Text.Title1 color="gray900">
            학생증 인증
            <Style.QuestionLogo
              src="login/question.svg"
              alt="question"
            ></Style.QuestionLogo>
          </Text.Title1>
          <Margin direction="column" size={16} />
          <Style.UploadButton>
            <Style.UploadLogo src="login/upload.svg" alt="upload" />
            <Text.Body1 color="gray700">학생증 업로드</Text.Body1>
          </Style.UploadButton>
          <Margin direction="column" size={8} />
          <Text.Caption3 color="gray500">
            20MB 이하 파일을 업로드해주세요.
          </Text.Caption3>
          <Margin direction="column" size={25} />
        </Style.CertifyWrapper>

        <Margin direction="column" size={24} />
        <Text.Title1 color="gray900">학생 정보</Text.Title1>
        <Margin direction="column" size={16} />
        <InputBox
          title="이메일"
          type="email"
          placeholder="abc@naver.com"
          button="인증전송"
          small="true"
        />
        <InputBox
          title="인증번호 입력"
          type="string"
          placeholder="인증번호"
          button="인증 확인"
          small="true"
        />
        <InputBox
          title="비밀번호"
          type=""
          placeholder="비밀번호"
          button=""
          small="false"
        />
        <InputBox
          title="비밀번호 확인"
          type=""
          placeholder="비밀번호"
          button=""
          small="false"
        />
        <InputBox
          title="이름"
          type="string"
          placeholder="김윙글"
          button=""
          small="false"
        />
        <InputBox
          title="닉네임"
          type="string"
          placeholder="희망찬윙그리"
          button="중복확인"
          small="true"
        />

        <Text.Body1 color="gray700">국적</Text.Body1>
        <Margin direction="column" size={8} />
      </Style.Wrapper>
    </>
  );
}
