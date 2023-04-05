import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import router from "next/router";
import { Text, Margin } from "@/src/components/ui";
import axios from "axios";
import { useMutation } from "react-query";
import { SERVER_URL } from "@/src/hooks";

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  LoginButton: styled.button`
    width: 452px;
    height: 50px;
    background-color: ${({ disabled }) => (disabled ? "#eee" : "#ff812e")};
    color: ${({ disabled }) => (disabled ? "#959599" : "#fff")};
    border-radius: 8px;
    margin: 0 auto;
    font-weight: 700;
    font-size: 16px;
    line-height: 22.4px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  `,

  RegisterButton: styled.button`
    margin: 20px;
    width: 56px;
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
  const [password, setPassword] = useState("");

  const { mutate: loginMutation, isLoading } = useMutation(
    async () => {
      const response = await axios.post(`${SERVER_URL}/api/login`, {
        email,
        password,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(`로그인 성공! ${data}`);
      },
      onError: (error) => {
        console.log("로그인 실패!");
      },
    }
  );

  const handleLogin = () => {
    loginMutation();
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
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </S.InputField>
      </S.AccountWrapper>

      <S.ButtonWrapper>
        <S.LoginButton
          disabled={email.length < 8 || !email.includes("@") || !email.includes(".") || !password}
          onClick={handleLogin}
        >
          로그인
        </S.LoginButton>
        <S.RegisterButton onClick={() => router.push("auth/signup")}>회원가입</S.RegisterButton>
      </S.ButtonWrapper>
    </>
  );
}
