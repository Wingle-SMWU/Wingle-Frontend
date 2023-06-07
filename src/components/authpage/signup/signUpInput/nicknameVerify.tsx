import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { Margin, Text } from "@/src/components/ui";
import { ChangeEvent, useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ErrorMent } from "../errorMent";
import { checkNicknameAvailable } from "@/src/api/auth/emailAPI";
import { useMutation } from "react-query";
import { EmailAuthResponse } from "@/src/types/auth/emailApiType";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import TextInputWithButton from "@/src/components/ui/textInputWithButton";

interface StyledInputProps {
  small: boolean;
  error: boolean;
}

export default function NicknameVerify(): JSX.Element {
  const [nicknameInputData, setNicknameInputData] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorNickName, setErrorNickName] = useState(true);
  const [isCheckedNickname, setCheckedNickname] = useState(false);
  const [isVerifiedNickname, setVerifiedNickname] = useState(false);
  const [isDisabledDoubleCheckButton, setDisabledDoubleCheckButton] =
    useState(true);

  const [nicknameMent, setNicknameMent] = useState("");

  const handleNicknameInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNicknameInputData(e.target.value);
    },
    []
  );

  // 닉네임 유효성 검사
  const handleErrorNickName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const nicknameRegax = /^[a-zA-Z0-9가-힣]{2,10}$/;
      const value = e.target.value;

      if (
        !nicknameRegax.test(value) ||
        e.target.value.length < 2 ||
        e.target.value.length > 10
      ) {
        setErrorNickName(true);
        setDisabledDoubleCheckButton(false);
      } else {
        setErrorNickName(false);
        setDisabledDoubleCheckButton(true);
      }
    },
    []
  );

  // 닉네임 중복 확인 기능
  const { mutate: CheckNickname } = useMutation(
    (): Promise<EmailAuthResponse> => checkNicknameAvailable(nicknameInputData),
    {
      onSuccess: (): void => {
        setCheckedNickname(true);
        setVerifiedNickname(true);
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            nickname: nicknameInputData,
            isNicknameChecked: true,
          })
        );
      },
      onError: (error: unknown): never => {
        setCheckedNickname(true);
        setVerifiedNickname(false);
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            nickname: "",
            isNicknameChecked: false,
          })
        );
        throw error;
      },
    }
  );

  const handleCheckNickname = useCallback((): void => {
    if (nicknameInputData === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    CheckNickname();
  }, [CheckNickname, nicknameInputData]);

  return (
    <>
      <TextInputWithButton
        label="닉네임"
        name="닉네임"
        value={nicknameInputData}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handleNicknameInputData(e);
          handleErrorNickName(e);
          setVerifiedNickname(false);
          setCheckedNickname(false);
        }}
        placeholder="실명을 입력하세요"
        error={isErrorNickName}
        errorMessage="한글 또는 영문으로 입력해주세요."
        buttonMessage="중복 확인"
        buttonDisabled={isDisabledDoubleCheckButton}
        onClick={handleCheckNickname}
        description={nicknameMent}
      />
      <Margin direction="column" size={24} />

      <Text.Body1 color="gray700">닉네임</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={true} error={isErrorNickName}>
            <input
              name="nickname"
              value={inputNicknameData}
              type="string"
              placeholder="희망찬윙그리"
              onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                handleInputData(e);
                handleErrorNickName(e);
                setVerifiedNickname(false);
                setCheckedNickname(false);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={false}>
            <S.Button onClick={(): void => handleCheckNickname()}>
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
    border: ${(props) =>
      props.error ? "1px solid #FF7070" : "1px solid #dcdce0;"};
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
