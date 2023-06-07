import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { Margin, Text } from "@/src/components/ui";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ErrorMent } from "../errorMent";
import TextInputUI from "@/src/components/ui/textInputUI";

interface StyledInputProps {
  small: boolean;
  error: boolean;
}

export default function PasswordVerify(): JSX.Element {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorPassword, setErrorPassword] = useState(true);
  const [isErrorPasswordCheck, setErrorPasswordCheck] = useState(false);

  const handlepasswordInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setPassword(e.target.value);
    },
    []
  );
  const handlepasswordCheckInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setPasswordCheck(e.target.value);
    },
    []
  );

  // useEffect로 비밀번호, 비밀번호 확인 존재 시 회원가입 폼 데이터 저장
  useEffect((): void => {
    if (!isErrorPassword && !isErrorPasswordCheck) {
      setSignUpFormData((prev) => ({
        ...prev,
        password,
      }));
    }
  }, [isErrorPassword, isErrorPasswordCheck, password, setSignUpFormData]);

  // 비밀번호 유효성 검사
  const handleErrorPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
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

  // 비밀번호와 맞는지 확인 기능
  const handleErrorPasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.target.value === password
        ? setErrorPasswordCheck(false)
        : setErrorPasswordCheck(true);
    },
    [password]
  );

  return (
    <>
      <TextInputUI
        label="비밀번호"
        name="비밀번호"
        placeholder="비밀번호"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handlepasswordInputData(e);
          handleErrorPassword(e);
        }}
        error={isErrorPassword}
        errorMessage="‘영문자+숫자+특수기호’ 포함 8자 이상 15자 미만"
        description="‘영문자+숫자+특수기호’ 포함 8자 이상 15자 미만"
      />
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
              onChange={(e: ChangeEvent<HTMLInputElement>): void => {
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
              onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                handleInputData(e);
                handleErrorPasswordCheck(e);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={false} error={false}></S.ButtonWrapper>
        </S.Content>
        <ErrorMent
          error={isErrorPasswordCheck}
          errorMent="정보를 정확히 입력해주세요."
          ment=" "
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
    height: 50px;
    border: ${(props): "1px solid #FF7070" | "1px solid #dcdce0;" =>
      props.error ? "1px solid #FF7070" : "1px solid #dcdce0;"};
    border-radius: 8px;
    margin-bottom: 8px;

    & > input {
      width: ${(props): "312px" | "392px" => (props.small ? "312px" : "392px")};
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
