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
  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [email, setEmail] = useState("");
  const [emailMent, setEmailMent] = useState("");
  const [isErrorEmail, setErrorEmail] = useState(false);
  const [emailErrorMent, setEmailErrorMent] = useState("");
  const [isDisabledEmailButton, setDisabledEmailButton] = useState(true);
  const [buttonMessage, setButtonMessage] = useState("인증 전송");
  const [emailSendingLimitCount, setEmailSendingLimitCount] = useState(0);

  const [emailCertification, setEmailCertification] = useState("");
  const [isErrorEmailCertify, setErrorEmailCertify] = useState(false);
  const [isDisabledEmailCertifyButton, setDisabledEmailCertifyButton] =
    useState(true);

  const [emailCertificationMent, setEmailCertificationMent] = useState("");

  const [isVerificationTimerStart, setVerificationTimerStart] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(300);

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
      // 초기화
      setSignUpFormData(
        (prev: SignUpFormData): SignUpFormData => ({
          ...prev,
          email: "",
        })
      );
      setErrorEmailCertify(false);
      setEmailCertificationMent("");
      setEmailMent("");
      setVerificationTimerStart(false);

      const emailRegex = /^[A-Za-z0-9._]+@[^\s@]+\.[^\s@]+$/; // 영어, 숫자, '.', '_'만 사용 가능한 정규식
      const value = e.target.value;

      if (!emailRegex.test(value) || !(value.length >= 5)) {
        setErrorEmail(true);
        setDisabledEmailButton(true);
        setEmailErrorMent("입력 형식에 맞지 않습니다.");
      } else {
        setErrorEmail(false);
        setDisabledEmailButton(false);
        setEmailErrorMent("");
      }
    },
    []
  );

  // 이메일 인증번호 유효성 검사
  const handleErrorEmailCertify = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setErrorEmailCertify(false);
      setEmailCertificationMent("");

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
        setEmailCertificationMent("");
        setEmailCertification("");
        setDisabledEmailCertifyButton(true);
        setEmailSendingLimitCount(0);
      },
      onSuccess: (response): void => {
        setButtonMessage("재전송");
        setEmailSendingLimitCount(response.data.requestCount || 0);
        setVerificationTimerStart(true);
      },
      onError: (error: any): void => {
        setErrorEmail(true);
        setDisabledEmailButton(true);
        setButtonMessage("전송");
        setEmailErrorMent(
          error.response?.data?.message ||
            "메일 인증 요청은 하루에 5회까지 가능합니다."
        );
        setEmailSendingLimitCount(0);
        throw error;
      },
    }
  );

  // 이메일 전송 횟수가 변경될 때 메시지를 업데이트
  useEffect(() => {
    if (emailSendingLimitCount !== 0) {
      setEmailMent(`인증번호가 전송되었습니다. (${emailSendingLimitCount}/5)`);
    }
  }, [emailSendingLimitCount]);

  const handleSendEmail = useCallback((): void => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    sendEmail();
  }, [email, sendEmail]);

  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval>;

    if (isVerificationTimerStart) {
      setVerificationTimer(300); // 5분(300초)으로 초기화

      timerInterval = setInterval(() => {
        setVerificationTimer((prevTimer) => {
          // 1초씩 감소
          const nextTimer = prevTimer - 1;

          if (nextTimer <= 0) {
            // 타이머 종료
            clearInterval(timerInterval);
            setVerificationTimerStart(false);
            setEmail("");
            setEmailMent("");
            setEmailCertification("");
            setErrorEmailCertify(true);
            setEmailCertificationMent("유효시간이 초과되었습니다.");
            setDisabledEmailCertifyButton(true);

            return 0;
          }
          return nextTimer;
        });
      }, 1000);
    }

    return () => {
      // 컴포넌트 언마운트 시 타이머 정리
      clearInterval(timerInterval);
    };
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
        setVerificationTimerStart(false);
      },
      onError: (error: any): never => {
        setErrorEmailCertify(true);
        setEmailCertificationMent(error.response?.data?.message);
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

          // 보내기 횟수 0으로 만들어 초기화
          setEmailSendingLimitCount(0);
          setEmailMent("");
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
        errorMessage={emailCertificationMent}
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
