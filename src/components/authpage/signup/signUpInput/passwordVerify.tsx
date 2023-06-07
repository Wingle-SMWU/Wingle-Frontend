import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import TextInputUI from "@/src/components/ui/textInputUI";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import { Margin, Text } from "@/src/components/ui";

export default function PasswordVerify(): JSX.Element {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorPassword, setErrorPassword] = useState(true);
  const [isErrorPasswordCheck, setErrorPasswordCheck] = useState(true);

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
      setSignUpFormData(
        (prev: SignUpFormData): SignUpFormData => ({
          ...prev,
          password,
        })
      );
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
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handlepasswordInputData(e);
          handleErrorPassword(e);
        }}
        error={isErrorPassword}
        errorMessage="‘영문자+숫자+특수기호’ 포함 8자 이상 15자 미만"
      />
      {!isErrorPassword && (
        <Text.Caption3 color="gray900">
          사용 가능한 비밀번호입니다.
        </Text.Caption3>
      )}
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
      />
      {!isErrorPasswordCheck && (
        <Text.Caption3 color="gray900">비밀번호가 일치합니다.</Text.Caption3>
      )}
      <Margin direction="column" size={24} />
    </>
  );
}
