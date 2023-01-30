import React, { useCallback, useEffect, useState } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";

const Style = {
  ContentWrapper: styled.div`
    padding-bottom: 24px;
  `,
  Content: styled.div`
    display: flex;
  `,
  InputField: styled.div<StyledInputProps>`
  width: ${(props) => (props.small ? "345px" : "452px")};
  height: 50px;
  border:${(props) =>
    props.error ? "1px solid #FF7070" : "1px solid #dcdce0;"}; 
  border-radius: 8px;
margin-bottom:8px;

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
  Button: styled.button`
    font-size: 16px;
    font-weight: 700;
    color: #49494d;
    width: 99px;
  `,
  ButtonWrapper: styled.div<StyledInputProps>`
    display: ${(props) => (props.small ? "flex" : "none")};
    height: 50px;
    width: 99px;
    border: 1px solid #959599;
    border-radius: 8px;
    margin-left: 8px;
  `,
  ErrorWrapper: styled.div`
    display: flex;
  `,
};

export interface propsType {
  title: string;
  type: string;
  placeholder: string;
  button: string;
  small: string;
}
interface StyledInputProps {
  small: boolean;
  error: boolean;
}

export default function InputBox({
  title,
  type,
  placeholder,
  button,
  small,
}: propsType) {
  const [ment, setMent] = useState("");
  const [buttonMessage, setButtonMessage] = useState(button);
  const [errorMent, setErrorMent] = useState("");
  const [count, setCount] = useState(1);
  const [error, setError] = useState(false);
  const [certificationNumber, setCertificationNumber] = useState();
  const [password, setPassWord] = useState("비밀번호");

  const handleData = (e: any) => {
    if (title === "비밀번호") {
      setPassWord(e.target.value);
    }
    return password;
    // const passwordRegex =
    //   /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    // setCertificationNumber(e.target.value);

    // if (title === "비밀번호") {
    //   setPassWord(e.target.value);
    //   if (!passwordRegex.test(e.target.value)) {
    //     setError(true);
    //   } else {
    //     setError(false);
    //   }
    //   console.log(certificationNumber);
    // }
  };
  useEffect(message);
  useEffect(() => {
    console.log(password);
  });
  function message() {
    if (title === "비밀번호") {
      setMent("영문자/숫자/특수기호 포함 최소 8자, 최대 15자");
      setErrorMent("영문자/숫자/특수기호 포함 최소 8자, 최대 15자");
    } else if (title === "이름") {
      setMent("실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) ");
      setErrorMent("실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) ");
    } else if (title === "닉네임") {
      setMent("한글/영어 두글자 이상 10글자 이하 ");
      setErrorMent("이미 사용중인 닉네임입니다.");
    } else if (title === "인증번호 입력") {
      setErrorMent("인증정보가 일치하지 않습니다.");
    } else if (title === "비밀번호 확인") {
      setErrorMent("정보를 정확히 입력해주세요.");
    }
  }
  function ButtonFunction() {
    if (button === "인증전송") {
      setButtonMessage("재전송");
      setMent("인증메일을 전송했습니다." + "(" + count + "회)");
    } else if (button === "인증 확인") {
      certificationNumber === "123" ? setError(false) : setError(true);
    }
  }

  return (
    <>
      <Text.Body1 color="gray700">{title}</Text.Body1>
      <Margin direction="column" size={8} />
      <Style.ContentWrapper>
        <Style.Content>
          <Style.InputField
            small={small === "true" ? true : false}
            error={error}
          >
            <input
              type={type}
              placeholder={placeholder}
              onChange={handleData}
            />
          </Style.InputField>
          <Style.ButtonWrapper
            small={small === "true" ? true : false}
            error={error}
          >
            <Style.Button
              onClick={() => {
                ButtonFunction();
                setCount(count + 1);
              }}
            >
              {buttonMessage}
            </Style.Button>
          </Style.ButtonWrapper>
        </Style.Content>
        <>
          {error === true ? (
            <>
              <Style.ErrorWrapper>
                <img src="/auth/error.svg" alt="error" />
                <Margin direction="row" size={8} />
                <Text.Caption3 color="red500">{errorMent}</Text.Caption3>
              </Style.ErrorWrapper>
            </>
          ) : (
            <Text.Caption3 color="gray900">{ment}</Text.Caption3>
          )}
        </>
      </Style.ContentWrapper>
    </>
  );
}
