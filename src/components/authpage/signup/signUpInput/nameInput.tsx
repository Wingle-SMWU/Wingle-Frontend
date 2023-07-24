import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { Margin } from "@/src/components/ui";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import TextInputUI from "@/src/components/ui/textInputUI";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import { useTranslation } from "next-i18next";

export default function NameInput(): JSX.Element {
  const { t } = useTranslation();

  const [nameInputData, setNameInputData] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorName, setErrorName] = useState(false);

  const [nameMent, setNameMent] = useState(`${t("auth:caption.name-1")}`);

  // useEffect로 이름 존재 시 회원가입 폼 데이터 저장
  useEffect((): void => {
    if (!isErrorName) {
      setSignUpFormData(
        (prev: SignUpFormData): SignUpFormData => ({
          ...prev,
          name: nameInputData,
        })
      );
    }
  }, [isErrorName, nameInputData]);

  const handleNameInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNameInputData(e.target.value);
    },
    []
  );

  // 이름 유효성 검사
  const handleErrorName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const nameRegax = /^[a-zA-Z가-힣\s]+$/;
      const value = e.target.value;

      if (
        !nameRegax.test(value) ||
        value.includes("  ") ||
        value.trim() === ""
      ) {
        // 초기화
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            name: "",
          })
        );
        setErrorName(true);
        setNameMent(`${t("auth:caption.name-1")}`);
      } else {
        setErrorName(false);
        setNameMent(`${t("auth:caption.name-2")}`);
      }
    },
    []
  );

  return (
    <>
      <TextInputUI
        label={t("auth:title.name")}
        name={t("auth:title.name")}
        value={nameInputData}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handleNameInputData(e);
          handleErrorName(e);
        }}
        placeholder={t("auth:caption.name-3")}
        error={isErrorName}
        errorMessage={t("auth:caption.name-1")}
        description={nameMent}
      />
      <Margin direction="column" size={24} />
    </>
  );
}
