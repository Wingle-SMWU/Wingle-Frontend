import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { Margin, Text } from "@/src/components/ui";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ErrorMent } from "../errorMent";
import { checkNicknameAvailable } from "@/src/api/auth/emailAPI";
import { useMutation } from "react-query";

interface StyledInputProps {
  small: boolean;
  error: boolean;
}

export default function NicknameVerify() {
  const [inputNicknameData, setNicknameInputData] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorNickName, setErrorNickName] = useState(true);
  const [isCheckedNickname, setCheckedNickname] = useState(false);
  const [isVerifiedNickname, setVerifiedNickname] = useState(false);

  const handleInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNicknameInputData(e.target.value);
    },
    []
  );

  // 닉네임 유효성 검사
  const handleErrorNickName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pattern = /^[a-zA-Z0-9가-힣]{2,10}$/;
      if (
        !pattern.test(e.target.value) ||
        e.target.value.length < 2 ||
        e.target.value.length > 10
      ) {
        setErrorNickName(true);
      } else {
        setErrorNickName(false);
      }
    },
    []
  );

  // 닉네임 중복 확인 기능
  const { mutate: CheckNickname } = useMutation(
    () => checkNicknameAvailable(inputNicknameData),
    {
      onSuccess: () => {
        setCheckedNickname(true);
        setVerifiedNickname(true);
        setSignUpFormData((prev) => ({
          ...prev,
          inputNicknameData,
          isNicknameChecked: true,
        }));
      },
      onError: (error) => {
        setCheckedNickname(true);
        setVerifiedNickname(false);
        setSignUpFormData((prev) => ({
          ...prev,
          nickname: "",
          isNicknameChecked: false,
        }));
        throw error;
      },
    }
  );

  const handleCheckNickname = useCallback(() => {
    if (inputNicknameData === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    CheckNickname();
  }, [CheckNickname, inputNicknameData]);
  return (
    <>
      <Text.Body1 color="gray700">닉네임</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={true} error={isErrorNickName}>
            <input
              name="nickname"
              value={inputNicknameData}
              type="string"
              placeholder="희망찬윙그리"
              onChange={(e) => {
                handleInputData(e);
                handleErrorNickName(e);
                setVerifiedNickname(false);
                setCheckedNickname(false);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={false}>
            <S.Button onClick={() => handleCheckNickname()}>중복 확인</S.Button>
          </S.ButtonWrapper>
        </S.Content>
        <ErrorMent
          error={isErrorNickName}
          errorMent="한글/영어 두글자 이상 10글자 이하로 입력해주세요."
          ment="  "
        />
        {isCheckedNickname ? (
          <ErrorMent
            error={!isVerifiedNickname}
            errorMent="이미 사용중인 닉네임입니다."
            ment="사용가능한 닉네임입니다."
          />
        ) : null}
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
