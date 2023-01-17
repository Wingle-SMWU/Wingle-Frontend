import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

export default function Login() {
  const [email, setEmail] = useState("");
  return (
    <>
      <Header>
        <img src="wingle.png" alt="logo" />
        <Text>다 함께 즐기는 국제 교류 커퓨니티</Text>
      </Header>
      <Wrapper>
        <InputGroup placeholder="이메일" value={email} />
        <InputGroup placeholder="비밀번호" value={email} />
      </Wrapper>
      <Wrapper>
        <LoginButton>로그인</LoginButton>
        <RegisterButton>회원가입</RegisterButton>
      </Wrapper>
    </>
  );
}

const Header = styled.div`
  width: 200px;
  text-align: center;
  margin: 0 auto;
  padding-top: 48px;
`;

const Text = styled.div`
  padding-top: 15px;
`;

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  padding-top: 48px;
`;

const InputGroup = styled.input`
  width: 452px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #dcdce0;
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  width: 452px;
  height: 50px;
  background-color: #eeeef2;
`;
const RegisterButton = styled.button`
  width: 50px;
  margin: 20px;
  border-bottom: 1px solid black;
`;
