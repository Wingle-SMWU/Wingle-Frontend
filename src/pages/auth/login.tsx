import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import router from "next/router";
import { Text, Margin } from "@/src/components/ui";

const S = {
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
    margin-bottom: 18px;
    display: flex;
    align-items: center;

    & > input {
      border: none;
      padding: 0 16px;
      border-radius: 8px;
      height: 100%;
      flex: 1;

      &::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
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
    padding-bottom: 24px;
    font-weight: 700;
    font-size: 16px;
    line-height: 22.4px;
    cursor: pointer;
  `,

  RegisterButton: styled.button`
    width: 56px;
    margin: 20px;
    border-bottom: 1px solid #49494d;
    color: #49494d;
    font-weight: 800;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
  `,
};

export default function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    // TODO: 로그인 처리
  };

  return (
    <>
      <S.Header>
        <Image src="/auth/loginLogo.svg" alt="logo" width={200} height={200} />
        <Margin direction="column" size={8} />
        <Text.Body6 color="gray700">다함께 즐기는 국제교류 커뮤니티</Text.Body6>
      </S.Header>

      <S.AccountWrapper>
        <S.InputField>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </S.InputField>
        <S.InputField>
          <input type="password" placeholder="비밀번호" />
        </S.InputField>
      </S.AccountWrapper>

      <S.ButtonWrapper>
        <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
        <S.RegisterButton onClick={() => router.push("auth/SignupPage")}>회원가입</S.RegisterButton>
      </S.ButtonWrapper>
    </>
  );
}
