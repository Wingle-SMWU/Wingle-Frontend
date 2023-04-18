import React, { useCallback, useEffect, useState } from "react";
import { ErrorMent } from "./errorMent";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import {
  sendEmailAuth,
  verifyEmailCertification,
  checkNicknameAvailable,
} from "@/src/api/auth/emailAPI";

interface StyledInputProps {
  small: boolean;
  error: boolean;
}

interface InputData {
  email: string;
  emailCertification: string;
  password: string;
  passwordCheck: string;
  name: string;
  nickname: string;
}

export default function InputBox() {
  const [buttonMessage, setButtonMessage] = useState("인증 전송");
  const [emailMent, setEmailMent] = useState("");
  const [inputData, setInputData] = useState<InputData>({
    email: "",
    emailCertification: "",
    password: "",
    passwordCheck: "",
    name: "",
    nickname: "",
  });
  const { email, emailCertification, password, passwordCheck, name, nickname } = inputData;
  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);
  const [isErrorEmailCertify, setErrorEmailCertify] = useState(true);
  const [isErrorPassword, setErrorPassword] = useState(true);
  const [isErrorPasswordCheck, setErrorPasswordCheck] = useState(true);
  const [isErrorName, setErrorName] = useState(true);
  const [isErrorNickName, setErrorNickName] = useState(true);

  const [isemailCertification, setVerifiedNickName] = useState(false);
  const [isCheckedNickname, setCheckedNickname] = useState(false);
  const [isVerifiedNickname, setVerifiedNickname] = useState(false);

  const handleInputData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }, []);

  useEffect(() => {
    if (
      !isErrorEmailCertify &&
      !isErrorPassword &&
      !isErrorPasswordCheck &&
      !isErrorName &&
      !isErrorNickName &&
      isVerifiedNickname &&
      isemailCertification &&
      isCheckedNickname
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
    isCheckedNickname,
    isErrorEmailCertify,
    isErrorName,
    isErrorNickName,
    isErrorPassword,
    isErrorPasswordCheck,
    isVerifiedNickname,
    isemailCertification,
    email,
    name,
    nickname,
    password,
    setSignUpFormData,
  ]);

  const { mutate: sendEmail } = useMutation(() => sendEmailAuth(email), {
    onSuccess: (res) => {
      console.log(res);

      setButtonMessage("재전송");
      setEmailMent("인증메일을 전송했습니다.");
    },
    onError: (error) => {
      setErrorEmailCertify(true);
      alert(error);
      throw error;
    },
  });

  const { mutate: verifyEmail } = useMutation(
    () => verifyEmailCertification({ email, emailCertification }),
    {
      onSuccess: () => {
        setErrorEmailCertify(false);
      },
      onError: (error) => {
        setErrorEmailCertify(true);
        throw error;
      },
    }
  );

  const handleErrorPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
      if (!passwordRegex.test(e.target.value)) {
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
      }
      if (e.target.value !== passwordCheck) {
        setErrorPasswordCheck(true);
      }
    },
    [passwordCheck]
  );

  const handleErrorPasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value === password ? setErrorPasswordCheck(false) : setErrorPasswordCheck(true);

      if (e.target.value !== password) {
        setErrorPasswordCheck(true);
      }
    },
    [password]
  );

  const handleErrorName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const special_pattern = /^[a-zA-Z가-힣\s]+$/;
    if (!special_pattern.test(e.target.value)) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  }, []);

  const handleErrorNickName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[a-zA-Z0-9가-힣]{2,10}$/;

    if (!pattern.test(e.target.value) || e.target.value.length < 2 || e.target.value.length > 10) {
      setErrorNickName(true);
    } else {
      setErrorNickName(false);
    }
  }, []);

  const { mutate: CheckNickname } = useMutation(() => checkNicknameAvailable(nickname), {
    onSuccess: (res) => {
      console.log(res);
      setCheckedNickname(true);
      setVerifiedNickname(true);
    },
    onError: (error) => {
      setCheckedNickname(true);
      setVerifiedNickname(false);
      throw error;
    },
  });

  return (
    <>
      <Text.Body1 color="gray700">이메일</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={true} error={false}>
            <input
              name="email"
              value={email}
              type="email"
              placeholder="abc@naver.com"
              onChange={(e) => {
                handleInputData(e);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={false}>
            <S.Button
              onClick={() => {
                sendEmail();
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
              name="emailCertification"
              value={emailCertification}
              type="string"
              placeholder="인증번호"
              onChange={(e) => {
                handleInputData(e);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={isErrorEmailCertify}>
            <S.Button
              onClick={() => {
                verifyEmail();
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
              name="password"
              value={password}
              type="password"
              placeholder="비밀번호"
              onChange={(e) => {
                handleInputData(e);
                handleErrorPassword(e);
              }}
            />
          </S.InputField>
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
          <S.InputField small={false} error={isErrorPasswordCheck}>
            <input
              name="passwordCheck"
              value={passwordCheck}
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => {
                handleInputData(e);
                handleErrorPasswordCheck(e);
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
          <S.InputField small={false} error={isErrorName}>
            <input
              name="name"
              value={name}
              type="string"
              placeholder="김윙글"
              onChange={(e) => {
                handleInputData(e);
                handleErrorName(e);
              }}
            />
          </S.InputField>
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
          <S.InputField small={true} error={isErrorNickName}>
            <input
              name="nickname"
              value={nickname}
              type="string"
              placeholder="희망찬윙그리"
              onChange={(e) => {
                handleInputData(e);
                handleErrorNickName(e);
                setVerifiedNickname(false);
                setCheckedNickname(false);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={false}>
            <S.Button
              onClick={() => {
                CheckNickname();
              }}
            >
              중복 확인
            </S.Button>
          </S.ButtonWrapper>
        </S.Content>
        <ErrorMent
          error={isErrorNickName}
          errorMent="한글/영어 두글자 이상 10글자 이하로 입력해주세요."
          ment="  "
        />
        {isCheckedNickname ? (
          <ErrorMent
            error={!isVerifiedNickname}
            errorMent="이미 사용중인 닉네임입니다."
            ment="사용가능한 닉네임입니다."
          />
        ) : null}
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
    height: 50px;
    border: ${(props) => (props.error ? "1px solid #FF7070" : "1px solid #dcdce0;")};
    border-radius: 8px;
    margin-bottom: 8px;

    & > input {
      width: ${(props) => (props.small ? "312px" : "392px")};
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
