import React, { useState } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import router from "next/router";
import Image from "next/image";

const Style = {
  Header: styled.div`
    width: 200px;
    margin: 0 auto;
    padding: 48px;
  `,

  AccountWrapper: styled.div`
    padding-bottom: 30px;
  `,
  InputField: styled.div`
    margin: 0 auto;
    width: 452px;
    height: 50px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
    margin-bottom:18px;

    & > input {
      border: none;
      padding-left: 16px;
      padding: 14px;
      border-radius: 8px;
      height: 22px;

      &::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 140%
        color: #959599;
      }
    }
  `,

  ButtonWrapper: styled.div`
    text-align: center;
  `,
  LoginButton: styled.button`
    width: 452px;
    height: 50px;
    background-color: #eeeef2;
    color: #959599;
    border-radius: 8px;
    padding-botton: 24px;
    font-weight: 700;
    font-size: 16px;
    line-height: 22.4px;
  `,
  RegisterButton: styled.button`
    width: 56px;
    margin: 20px;
    border-bottom: 1px solid #49494d;
    color: #49494d;
    font-weight: 800;
    font-size: 16px;
    line-height: 20px;
  `,
};

export default function Login() {
  const [email, setEmail] = useState("");
  return (
    <>
      <Style.Header>
        <Image src="auth/loginLogo.svg" alt="logo" />
        <Margin direction="column" size={8} />
        <Text.Body6 color="gray700">다함께 즐기는 국제교류 커뮤니티</Text.Body6>
      </Style.Header>

      <Style.AccountWrapper>
        <Style.InputField>
          <input type="email" placeholder="이메일"></input>
        </Style.InputField>
        <Style.InputField>
          <input type="password" placeholder="비밀번호"></input>
        </Style.InputField>
      </Style.AccountWrapper>

      <Style.ButtonWrapper>
        <Style.LoginButton>로그인</Style.LoginButton>
        <Style.RegisterButton onClick={() => router.push("auth/SignupPage")}>
          회원가입
        </Style.RegisterButton>
      </Style.ButtonWrapper>
    </>
  );
}
