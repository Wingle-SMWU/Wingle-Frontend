import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import TextInputUI from "@/src/components/ui/textInputUI";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import { Margin } from "@/src/components/ui";

export default function PasswordVerify(): JSX.Element {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorPassword, setErrorPassword] = useState(false);
  const [isErrorPasswordCheck, setErrorPasswordCheck] = useState(false);

  const [passwordMent, setPasswordMent] = useState(
    "‘영문자+숫자+특수기호’ 포함 8-15자"
  );
  const [passwordCheckMent, setPasswordCheckMent] = useState("");

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
    if (
      !isErrorPassword &&
      !isErrorPasswordCheck &&
      passwordCheck === password
    ) {
      setSignUpFormData(
        (prev: SignUpFormData): SignUpFormData => ({
          ...prev,
          password,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorPassword, isErrorPasswordCheck, password]);

  // 비밀번호 유효성 검사
  const handleErrorPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      // 초기화
      setSignUpFormData(
        (prev: SignUpFormData): SignUpFormData => ({
          ...prev,
          password: "",
        })
      );
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
      const value = e.target.value;

      if (!passwordRegex.test(value)) {
        setErrorPassword(true);
        setPasswordMent("‘영문자+숫자+특수기호’ 포함 8-15자");
      } else {
        setErrorPassword(false);
        setPasswordMent("사용 가능한 비밀번호입니다.");
      }
      if (e.target.value !== passwordCheck && password !== "") {
        setErrorPasswordCheck(true);
      }
    },
    [passwordCheck]
  );

  // 비밀번호와 맞는지 확인 유효성 검사
  const handleErrorPasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;

      if (value === "") {
        setErrorPasswordCheck(true);
        setPasswordCheckMent("");
        return;
      }
      if (value === password) {
        setErrorPasswordCheck(false);
        setPasswordCheckMent("비밀번호가 일치합니다.");
      } else {
        // 초기화
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            password: "",
          })
        );
        setErrorPasswordCheck(true);
        setPasswordCheckMent("");
      }
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
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handlepasswordInputData(e);
          handleErrorPassword(e);
        }}
        error={isErrorPassword}
        errorMessage="‘영문자+숫자+특수기호’ 포함 8-15자"
        description={passwordMent}
      />
      <Margin direction="column" size={24} />

      <TextInputUI
        label="비밀번호 확인"
        name="비밀번호 확인"
        placeholder="비밀번호 확인"
        value={passwordCheck}
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handlepasswordCheckInputData(e);
          handleErrorPasswordCheck(e);
        }}
        error={isErrorPasswordCheck}
        errorMessage="비밀번호가 일치하지 않습니다."
        description={passwordCheckMent}
      />
      <Margin direction="column" size={24} />
    </>
  );
}
