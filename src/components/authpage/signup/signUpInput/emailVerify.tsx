import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { Margin } from "@/src/components/ui";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  sendEmailAuth,
  verifyEmailCertification,
} from "@/src/api/auth/emailAPI";
import { useMutation } from "react-query";
import TextInputWithButton from "@/src/components/ui/textInputWithButton";
import { EmailAuthResponse } from "@/src/types/auth/emailApiType";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import styled from "styled-components";

export default function EmailVerify(): JSX.Element {
  const [email, setEmail] = useState("");
  const [emailCertification, setEmailCertification] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorEmail, setErrorEmail] = useState(false);
  const [isDisabledEmailButton, setDisabledEmailButton] = useState(true);

  const [isErrorEmailCertify, setErrorEmailCertify] = useState(false);
  const [isDisabledEmailCertifyButton, setDisabledEmailCertifyButton] =
    useState(true);

  const [buttonMessage, setButtonMessage] = useState("인증 전송");
  const [emailMent, setEmailMent] = useState("");
  const [emailErrorMent, setEmailErrorMent] =
    useState("입력 형식에 맞지 않습니다.");
  const [emailCertificationMent, setEmailCertificationMent] = useState("");
  const [emailSendingLimitCount, setEmailSendingLimitCount] = useState(1);
  const [isVerificationTimerStart, setVerificationTimerStart] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(180);

  const handleEmailInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value),
    []
  );
  const handleEmailertificationInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void =>
      setEmailCertification(e.target.value),
    []
  );

  // 이메일 유효성 검사
  const handleErrorEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const emailRegex = /^[A-Za-z0-9]+@[^\s@]+\.[^\s@]+$/; // 영어와 숫자만 사용 가능한 정규식
      const value = e.target.value;

      if (!emailRegex.test(value) || !(value.length >= 5)) {
        setErrorEmail(true);
        setDisabledEmailButton(true);
        setEmailErrorMent("입력 형식에 맞지 않습니다.");
      } else {
        setErrorEmail(false);
        setDisabledEmailButton(false);
      }
    },
    []
  );

  // 이메일 인증번호 유효성 검사
  const handleErrorEmailCertify = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const emailRegex = /^\d+$/;
      const value = e.target.value;

      if (!emailRegex.test(value) || !(value.length >= 4)) {
        setDisabledEmailCertifyButton(true);
      } else {
        setDisabledEmailCertifyButton(false);
      }
    },
    []
  );

  // 이메일 인증메일 보내기
  const { mutate: sendEmail } = useMutation(
    (): Promise<EmailAuthResponse> => sendEmailAuth(email),
    {
      onMutate: (): void => {
        setButtonMessage("전송 중");
        setVerificationTimerStart(false);
      },
      onSuccess: (): void => {
        setButtonMessage("재전송");
        setEmailMent(`인증메일을 전송했습니다. (${emailSendingLimitCount}/5)`);
        setVerificationTimerStart(true);
      },
      onError: (error: unknown): never => {
        setErrorEmail(true);
        setDisabledEmailButton(true);
        setButtonMessage("전송");
        setEmailErrorMent("이미 가입된 이메일입니다.");
        setEmailSendingLimitCount((prevCount) => (prevCount = 0));
        throw error;
      },
    }
  );

  const handleSendEmail = useCallback((): void => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (emailSendingLimitCount === 5) {
      setErrorEmail(true);
      setEmailErrorMent(
        "인증 메일 보내기 횟수를 모두 차감했습니다. 나중에 다시 시도해주세요."
      );
      setDisabledEmailButton(true);
      return;
    }

    setEmailSendingLimitCount((prevCount) => prevCount + 1);
    sendEmail();
  }, [email, emailSendingLimitCount, sendEmail]);

  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval>;

    if (isVerificationTimerStart) {
      setVerificationTimer(180); // 3분(180초)으로 초기화

      timerInterval = setInterval(() => {
        setVerificationTimer((prevTimer) => prevTimer - 1); // 1초씩 감소

        if (verificationTimer <= 0) {
          // 타이머 종료
          clearInterval(timerInterval);
        }
      }, 1000);
    }

    return () => {
      // 컴포넌트 언마운트 시 타이머 정리
      clearInterval(timerInterval);
    };
    // 일부터 불린 데이터를 담당하는 상태만 의존성 배열에 추가했음
  }, [isVerificationTimerStart]);

  // 이메일 인증번호 확인
  const { mutate: verifyEmail } = useMutation(
    (): Promise<boolean> =>
      verifyEmailCertification({ email, emailCertification }),
    {
      onSuccess: (): void => {
        setErrorEmailCertify(false);
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            email,
          })
        );
        setEmailCertificationMent("인증번호가 일치합니다.");
      },
      onError: (error: unknown): never => {
        setErrorEmailCertify(true);
        throw error;
      },
    }
  );

  const handleVerifyEmail = useCallback((): void => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    verifyEmail();
  }, [email, verifyEmail]);

  return (
    <>
      <TextInputWithButton
        label="이메일"
        name="이메일"
        placeholder="abc@naver.com"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handleEmailInputData(e);
          handleErrorEmail(e);
        }}
        error={isErrorEmail}
        errorMessage={emailErrorMent}
        buttonMessage={buttonMessage}
        buttonDisabled={isDisabledEmailButton}
        onClick={handleSendEmail}
        description={emailMent}
      />
      <Margin direction="column" size={24} />

      <S.DropDownLabel>
        이메일 인증{" "}
        {isVerificationTimerStart && (
          <S.Timer>
            ({Math.floor(verificationTimer / 60)}:
            {verificationTimer % 60 < 10 ? "0" : ""}
            {verificationTimer % 60})
          </S.Timer>
        )}
      </S.DropDownLabel>
      <Margin direction="column" size={8} />
      <TextInputWithButton
        name="이메일 인증"
        placeholder="인증번호"
        value={emailCertification}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handleEmailertificationInputData(e);
          handleErrorEmailCertify(e);
        }}
        error={isErrorEmailCertify}
        errorMessage="인증번호가 일치하지 않습니다."
        buttonMessage="인증 확인"
        buttonDisabled={isDisabledEmailCertifyButton}
        onClick={handleVerifyEmail}
        description={emailCertificationMent}
      />
      <Margin direction="column" size={24} />
    </>
  );
}
const S = {
  DropDownLabel: styled.label`
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.gray700};
  `,
  Timer: styled.span`
    font-weight: 400;
    color: ${({ theme }) => theme.color.red500};
  `,
};
