import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import TextInputUI from "@/src/components/ui/textInputUI";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import { Margin } from "@/src/components/ui";
import { useTranslation } from "next-i18next";

export default function PasswordVerify(): JSX.Element {
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorPassword, setErrorPassword] = useState(false);
  const [isErrorPasswordCheck, setErrorPasswordCheck] = useState(false);

  const [passwordMent, setPasswordMent] = useState(
    `${t("auth:caption.pass-1")}`
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
        setPasswordMent(`${t("auth:caption.pass-1")}`);
      } else {
        setErrorPassword(false);
        setPasswordMent(`${t("auth:caption.pass-2")}`);
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
        setPasswordCheckMent(`${t("auth:caption.pass-3")}`);
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
        label={t("auth:title.password")}
        name={t("auth:title.password")}
        placeholder={t("auth:title.password")}
        value={password}
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handlepasswordInputData(e);
          handleErrorPassword(e);
        }}
        error={isErrorPassword}
        errorMessage={t("auth:caption.pass-1")}
        description={passwordMent}
      />
      <Margin direction="column" size={24} />

      <TextInputUI
        label={t("auth:title.verify-password")}
        name={t("auth:title.verify-password")}
        placeholder={t("auth:title.verify-password")}
        value={passwordCheck}
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handlepasswordCheckInputData(e);
          handleErrorPasswordCheck(e);
        }}
        error={isErrorPasswordCheck}
        errorMessage={t("auth:caption.pass-4")}
        description={passwordCheckMent}
      />
      <Margin direction="column" size={24} />
    </>
  );
}
