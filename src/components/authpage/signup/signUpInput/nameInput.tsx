import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { Margin, Text } from "@/src/components/ui";
import { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ErrorMent } from "../errorMent";

interface StyledInputProps {
  small: boolean;
  error: boolean;
}

export default function NameInput() {
  const [nameInputData, setNameInputData] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorName, setErrorName] = useState(true);

  // useEffect로 이름 존재 시 회원가입 폼 데이터 저장
  useEffect(() => {
    if (!isErrorName) {
      setSignUpFormData((prev) => ({
        ...prev,
        name: nameInputData,
      }));
    }
  }, [isErrorName, nameInputData, setSignUpFormData]);

  const handleInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNameInputData(e.target.value);
    },
    []
  );

  // 이름 유효성 검사
  const handleErrorName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const special_pattern = /^[a-zA-Z가-힣\s]+$/;
      if (!special_pattern.test(e.target.value)) {
        setErrorName(true);
      } else {
        setErrorName(false);
      }
    },
    []
  );

  return (
    <>
      <Text.Body1 color="gray700">이름</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={false} error={isErrorName}>
            <input
              name="name"
              value={nameInputData}
              type="string"
              placeholder="김윙글"
              onChange={(e) => {
                handleInputData(e);
                handleErrorName(e);
              }}
            />
          </S.InputField>
        </S.Content>
        <ErrorMent
          error={isErrorName}
          errorMent="실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) "
          ment=" 실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) "
        />
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
