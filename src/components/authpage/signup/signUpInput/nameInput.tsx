import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { Margin } from "@/src/components/ui";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import TextInputUI from "@/src/components/ui/textInputUI";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";

export default function NameInput(): JSX.Element {
  const [nameInputData, setNameInputData] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorName, setErrorName] = useState(false);

  const [nameMent, setNameMent] = useState("한글 또는 영문으로 입력해주세요.");

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
  }, [isErrorName, nameInputData, setSignUpFormData]);

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
        setErrorName(true);
        setNameMent("한글 또는 영문으로 입력해주세요.");
      } else {
        setErrorName(false);
        setNameMent("양식에 올바른 이름입니다.");
      }
    },
    []
  );

  return (
    <>
      <TextInputUI
        label="이름"
        name="이름"
        value={nameInputData}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handleNameInputData(e);
          handleErrorName(e);
        }}
        placeholder="실명을 입력하세요"
        error={isErrorName}
        errorMessage="한글 또는 영문으로 입력해주세요."
        description={nameMent}
      />
      <Margin direction="column" size={24} />
    </>
  );
}
