import React, { useCallback, useState } from "react";
import { ErrorMent } from "./errorMent";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { useSetRecoilState } from "recoil";

interface StyledInputProps {
  small: boolean;
  error: boolean;
}

interface InputData {
  email: string;
  emailCertificaion: string;
  password: string;
  name: string;
  nickname: string;
}

export default function InputBox() {
  const [buttonMessage, setButtonMessage] = useState("인증 전송");
  const [emailMent, setEmailMent] = useState("");
  const [inputData, setInputData] = useState<InputData>({
    email: "",
    emailCertificaion: "",
    password: "",
    name: "",
    nickname: "",
  });
  const { email, emailCertificaion, password, name, nickname } = inputData;
  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);
  const [isErrorEmailCertify, setErrorEmailCertify] = useState(false);
  const [isErrorPassword, setErrorPassword] = useState(false);
  const [isErrorPasswordCheck, setErrorPasswordCheck] = useState(false);
  const [isErrorName, setErrorName] = useState(false);
  const [isErrorNickName, setErrorNickName] = useState(false);

  const handleInputData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }, []);

  const handleInputError = useCallback(() => {
    if (
      !isErrorEmailCertify &&
      !isErrorPassword &&
      !isErrorPasswordCheck &&
      !isErrorName &&
      !isErrorNickName
    ) {
      setSignUpFormData((prev) => ({
        ...prev,
        email: email,
        password: password,
        name: name,
        nickname: nickname,
      }));
    }
  }, [
    isErrorEmailCertify,
    isErrorPassword,
    isErrorPasswordCheck,
    isErrorName,
    isErrorNickName,
    setSignUpFormData,
    email,
    password,
    name,
    nickname,
  ]);

  const handleEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,15}$/;
    if (!passwordRegex.test(e.target.value)) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  }, []);

  const handlePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,15}$/;
    if (!passwordRegex.test(e.target.value)) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  }, []);

  const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (special_pattern.test(e.target.value)) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  }, []);

  const handleNickName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /[`~!@#$%^&*|\\\'\";:\/?]/;
    const pattern2 = /[0-9]/;
    if (
      pattern.test(e.target.value) ||
      pattern2.test(e.target.value) ||
      e.target.value.length < 2 ||
      e.target.value.length > 10
    ) {
      setErrorNickName(true);
    } else {
      setErrorNickName(false);
    }
  }, []);

  return (
    <>
      <Text.Body1 color="gray700">이메일</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={true} error={false}>
            <input
              name="Email"
              value={email}
              type="email"
              placeholder="abc@naver.com"
              onChange={(e) => {
                handleInputData(e);
                handleEmail(e);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={false}>
            <S.Button
              onClick={() => {
                setButtonMessage("재전송");
                setEmailMent("인증메일을 전송했습니다.");
              }}
            >
              {buttonMessage}
            </S.Button>
          </S.ButtonWrapper>
        </S.Content>
        <ErrorMent error={false} errorMent="" ment={emailMent} />
      </S.ContentWrapper>

      <Text.Body1 color="gray700">인증번호 입력</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={true} error={isErrorEmailCertify}>
            <input
              name="EmailCertificaion"
              value={emailCertificaion}
              type="string"
              placeholder="인증번호"
              onChange={handleInputData}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={isErrorEmailCertify}>
            <S.Button
              onClick={() => {
                handleInputError;
              }}
            >
              인증 확인
            </S.Button>
          </S.ButtonWrapper>
        </S.Content>
        <ErrorMent error={isErrorEmailCertify} errorMent="인증정보가 일치하지 않습니다." ment=" " />
      </S.ContentWrapper>

      <Text.Body1 color="gray700">비밀번호</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={false} error={isErrorPassword}>
            <input
              name="Password"
              value={password}
              type="string"
              placeholder="비밀번호"
              onChange={(e) => {
                handleInputData(e);
                handlePassword(e);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={false} error={false}></S.ButtonWrapper>
        </S.Content>
        <ErrorMent
          error={isErrorPassword}
          errorMent="영문자/숫자/특수기호 포함 최소 8자, 최대 15자 "
          ment="영문자/숫자/특수기호 포함 최소 8자, 최대 15자"
        />
      </S.ContentWrapper>

      <Text.Body1 color="gray700">비밀번호 확인</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={false} error={false}>
            <input
              type="string"
              placeholder="비밀번호"
              onChange={(e) => {
                e.target.value === inputData.password
                  ? setErrorPasswordCheck(false)
                  : setErrorPasswordCheck(true);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={false} error={false}></S.ButtonWrapper>
        </S.Content>
        <ErrorMent error={isErrorPasswordCheck} errorMent="정보를 정확히 입력해주세요." ment=" " />
      </S.ContentWrapper>

      <Text.Body1 color="gray700">이름</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={false} error={false}>
            <input
              name="Name"
              value={name}
              type="string"
              placeholder="김윙글"
              onChange={(e) => {
                handleInputData(e);
                handleName(e);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={false} error={false}></S.ButtonWrapper>
        </S.Content>
        <ErrorMent
          error={isErrorName}
          errorMent="실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) "
          ment=" 실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) "
        />
      </S.ContentWrapper>

      <Text.Body1 color="gray700">닉네임</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={true} error={false}>
            <input
              name="NickName"
              value={nickname}
              type="string"
              placeholder="희망찬윙그리"
              onChange={(e) => {
                handleInputData(e);
                handleNickName(e);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={false}>
            <S.Button onClick={handleInputError}>중복 확인</S.Button>
          </S.ButtonWrapper>
        </S.Content>
        <ErrorMent
          error={isErrorNickName}
          errorMent="한글/영어 두글자 이상 10글자 이하 "
          ment="  "
        />
      </S.ContentWrapper>
    </>
  );
}

const S = {
  ContentWrapper: styled.div`
    padding-bottom: 24px;
  `,
  Content: styled.div`
    display: flex;
  `,
  InputField: styled.div<StyledInputProps>`
    width: ${(props) => (props.small ? "345px" : "452px")};
    height: 50px;
    border: ${(props) => (props.error ? "1px solid #FF7070" : "1px solid #dcdce0;")};
    border-radius: 8px;
    margin-bottom: 8px;

    & > input {
      width: 300px;
      border: none;

      padding: 14px;
      border-radius: 8px;
      height: 22px;

      &::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
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
};
