import React, { useState, useCallback, ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import DropDownCommon from "../../../ui/dropDownUI";
import { Margin } from "../../../ui";
import TextInputUI from "../../../ui/textInputUI";
import {
  UniversityListType,
  universityList,
} from "@/src/constants/universityList";
import { useTranslation } from "next-i18next";

export default function InputUnivDropdown(): JSX.Element {
  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const { t } = useTranslation();

  const [university, setUniversity] = useState("");

  const [department, setDepartment] = useState("");
  const [departmentMent, setDepartmentMent] = useState(
    `${t("auth:caption.name-1")}`
  );
  const [isErrorDepartment, setErrorDepartment] = useState(false);
  const [departmentrrorMent, setDepartmentErrorMent] = useState("");
  const [isDisabledDepartment, setDisabledDepartment] = useState(true);

  const [studentNumber, setStudentNumber] = useState("");
  const [studentNumberMent, setStudentNumberMent] = useState(
    `${t("auth:caption.studentId-1")}`
  );
  const [isErrorStudentNumber, setErrorStudentNumber] = useState(false);
  const [studentNumberErrorMent, setStudentNumberErrorMent] = useState("");
  const [isDisabledStudentNumber, setDisabledStudentNumber] = useState(true);

  const handleSelectItem = (selected: string): void => {
    const university = universityList.find(
      (item: UniversityListType) => item.university === selected
    );
    if (university) {
      setUniversity(selected);
      setSignUpFormData(
        (prev: SignUpFormData): SignUpFormData => ({
          ...prev,
          schoolCode: university.code,
        })
      );
      setDisabledDepartment(false);
    }
  };

  // 학과 인증번호 유효성 검사
  const handleErrorDepartment = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setErrorDepartment(false);
      setDepartmentMent("");

      const DepartmentRegex = /^[a-zA-Z가-힣]+$/;
      const value = e.target.value;

      if (
        !DepartmentRegex.test(value) ||
        !(value.length >= 2) ||
        value.includes("  ") ||
        value.trim() === ""
      ) {
        setErrorDepartment(true);
        setDepartmentMent(`${t("auth:caption.name-1")}`);
        setDepartmentErrorMent(`${t("auth:caption.name-1")}`);
        setDisabledStudentNumber(true);
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            department: "",
          })
        );
      } else {
        setErrorDepartment(false);
        setDepartmentMent("");
        setDepartmentErrorMent("");
        setDisabledStudentNumber(false);
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            department: value,
          })
        );
      }
    },
    []
  );

  // 학번 인증번호 유효성 검사
  const handleErrorStudentNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const studentNumberRegex = /^\d+$/;
      const value = e.target.value;

      if (
        !studentNumberRegex.test(value) ||
        !(value.length >= 5) ||
        value.includes(" ") ||
        value.trim() === ""
      ) {
        setErrorStudentNumber(true);
        setStudentNumberMent(`${t("auth:caption.studentId-1")}`);
        setStudentNumberErrorMent(`${t("auth:caption.studentId-2")}`);
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            studentNumber: "",
          })
        );
      } else {
        setErrorStudentNumber(false);
        setStudentNumberMent("");
        setStudentNumberErrorMent("");
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            studentNumber: value,
          })
        );
      }
    },
    []
  );

  return (
    <>
      <DropDownCommon
        label={t("auth:title.univ")}
        list={universityList.map(
          (item: UniversityListType): string => item.university
        )}
        selected={university}
        handleSelectedChange={handleSelectItem}
        dropDownPlaceHolder={t("auth:title.univName")}
      />
      <Margin direction="column" size={24} />

      <TextInputUI
        label={t("auth:title.department")}
        name={t("auth:title.department")}
        placeholder={t("auth:caption.department")}
        value={department}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          setDepartment(e.target.value);
          handleErrorDepartment(e);
        }}
        error={isErrorDepartment}
        errorMessage={departmentrrorMent}
        description={departmentMent}
        disabled={isDisabledDepartment}
      />
      <Margin direction="column" size={24} />

      <TextInputUI
        label={t("auth:title.studentId")}
        name={t("auth:title.studentId")}
        placeholder="EX.202300000"
        value={studentNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          setStudentNumber(e.target.value);
          handleErrorStudentNumber(e);
        }}
        error={isErrorStudentNumber}
        errorMessage={studentNumberErrorMent}
        description={studentNumberMent}
        disabled={isDisabledStudentNumber}
      />
      <Margin direction="column" size={24} />
    </>
  );
}
