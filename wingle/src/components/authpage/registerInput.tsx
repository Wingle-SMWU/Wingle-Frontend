import React, { useEffect, useState } from "react";
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
  border: 1px solid #dcdce0;
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
  Button: styled.button<StyledInputProps>`
    display: ${(props) => (props.small ? "" : "none")};
    text-align: center;
    height: 50px;
    width: 99px;
    border: 1px solid #959599;
    border-radius: 8px;
    margin-left: 8px;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    color: #49494d;
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
}
interface StyledWrapperProps {
  padding: boolean;
}
export default function InputBox({
  title,
  type,
  placeholder,
  button,
  small,
}: propsType) {
  const [ment, setMent] = useState("");
  useEffect(message);
  function message() {
    if (title === "비밀번호") {
      setMent("영문자/숫자/특수기호 포함 최소 8자, 최대 15자");
    } else if (title === "이름") {
      setMent("실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) ");
    } else if (title === "닉네임") {
      setMent("한글/영어 두글자 이상 10글자 이하 ");
    }
  }
  return (
    <>
      <Text.Body1 color="gray700">{title}</Text.Body1>
      <Margin direction="column" size={8} />
      <Style.ContentWrapper>
        <Style.Content>
          <Style.InputField small={small === "true" ? true : false}>
            <input type={type} placeholder={placeholder}></input>
          </Style.InputField>
          <Style.Button small={small === "true" ? true : false}>
            {button}
          </Style.Button>
        </Style.Content>
        <Text.Caption3 color="gray900">{ment}</Text.Caption3>
      </Style.ContentWrapper>
    </>
  );
}
