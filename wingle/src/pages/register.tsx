import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { theme } from "../styles/theme";
import React, { FormEvent, useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  return (
    <>
      <Header>
        <Image>
          <img src="back.png" alt="back" />
        </Image>
        <Text>회원가입</Text>
      </Header>
      <Container>
        <Title>학생증 인증</Title>
        <Icon>
          <img src="question.png" alt="question" />
        </Icon>
      </Container>
    </>
  );
}

const Header = styled.div`
  text-align: left;
  display: flex;
  padding-bottom: 20px;
`;

const Image = styled.button`
  padding: 20px;
`;

const Text = styled.h1`
  padding-top: 23px;
  font-size: 20px;
  font-weight: 700;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 700;
`;

const Icon = styled.button`
  padding: 5px;
`;
