import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { Margin, Text } from "@/src/components/ui";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ErrorMent } from "../errorMent";
import {
  sendEmailAuth,
  verifyEmailCertification,
} from "@/src/api/auth/emailAPI";
import { useMutation } from "react-query";
import TextInputWithButton from "@/src/components/ui/textInputWithButton";

interface StyledInputProps {
  small: boolean;
  error: boolean;
}

export default function EmailVerify() {
  const [buttonMessage, setButtonMessage] = useState("인증 전송");
  const [emailMent, setEmailMent] = useState("");

  const [email, setEmail] = useState("");
  const [emailCertification, setEmailCertification] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorEmail, setErrorEmail] = useState(false);
  const [isDisabledEmailButton, setDisabledEmailButton] = useState(true);

  const [isErrorEmailCertify, setErrorEmailCertify] = useState(true);

  const handleEmailInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );
  const handleEmailertificationInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setEmailCertification(e.target.value),
    []
  );

  // 이메일 유효성 검사
  const handleErrorEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const value = e.target.value;
      const hasValidFormat = emailRegex.test(value);
      const isLongEnough = value.length >= 5;

      if (!hasValidFormat || !isLongEnough) {
        setErrorEmail(true);
        setDisabledEmailButton(true);
        setEmailMent("입력 형식에 맞지 않습니다.");
      } else {
        setErrorEmail(false);
        setDisabledEmailButton(false);
        setEmailMent("");
      }
    },
    []
  );

  // 이메일 인증메일 보내기
  const { mutate: sendEmail } = useMutation(() => sendEmailAuth(email), {
    onMutate: () => {
      setButtonMessage("전송 중");
    },
    onSuccess: () => {
      setButtonMessage("재전송");
      setEmailMent("인증메일을 전송했습니다.");
    },
    onError: (error) => {
      setErrorEmailCertify(true);
      alert(error);
      throw error;
    },
  });

  const handleSendEmail = useCallback(() => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    sendEmail();
  }, [email, sendEmail]);

  // 이메일 인증번호 확인
  const { mutate: verifyEmail, isLoading: isLoadingVerifyEmail } = useMutation(
    () => verifyEmailCertification({ email, emailCertification }),
    {
      onSuccess: () => {
        setErrorEmailCertify(false);
        setSignUpFormData((prev) => ({
          ...prev,
          email,
        }));
      },
      onError: (error) => {
        setErrorEmailCertify(true);
        throw error;
      },
    }
  );

  const handleVerifyEmail = useCallback(() => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    verifyEmail();
  }, [email, verifyEmail]);

  return (
    <>
      <S.Content>
        <TextInputWithButton
          label="이메일"
          name="이메일"
          placeholder="abc@naver.com"
          value={email}
          onChange={(e) => {
            handleEmailInputData(e);
            handleErrorEmail(e);
          }}
          error={isErrorEmail}
          errorMessage={emailMent}
          buttonMessage={buttonMessage}
          buttonDisabled={isDisabledEmailButton}
        />
        <Margin direction="row" size={8} />
      </S.Content>

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
            <S.Button onClick={() => handleSendEmail()}>
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
            <S.Button onClick={() => handleVerifyEmail()}>인증 확인</S.Button>
          </S.ButtonWrapper>
        </S.Content>
        {isLoadingVerifyEmail ? (
          <ErrorMent error={false} errorMent="" ment="인증 확인 중 입니다." />
        ) : (
          <ErrorMent
            error={isErrorEmailCertify}
            errorMent="인증정보가 일치하지 않습니다."
            ment="인증이 완료되었습니다."
          />
        )}
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
    /* align-items: center; */
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
