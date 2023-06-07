import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { Margin } from "@/src/components/ui";
import { ChangeEvent, useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { checkNicknameAvailable } from "@/src/api/auth/emailAPI";
import { useMutation } from "react-query";
import { EmailAuthResponse } from "@/src/types/auth/emailApiType";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import TextInputWithButton from "@/src/components/ui/textInputWithButton";

export default function NicknameVerify(): JSX.Element {
  const [nicknameInputData, setNicknameInputData] = useState("");

  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const [isErrorNickName, setErrorNickName] = useState(false);
  const [isDisabledDoubleCheckButton, setDisabledDoubleCheckButton] =
    useState(true);

  const [nicknameMent, setNicknameMent] = useState(
    "한글/영문/숫자 2자 이상 10자 미만"
  );
  const [nicknameErrorMent, setNicknameErrorMent] = useState(
    "한글/영문/숫자 2자 이상 10자 미만"
  );

  const handleNicknameInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNicknameErrorMent("한글/영문/숫자 2자 이상 10자 미만");
      setNicknameInputData(e.target.value);
    },
    []
  );

  // 닉네임 유효성 검사
  const handleErrorNickName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const nicknameRegax = /^[a-zA-Z0-9가-힣]{2,10}$/;
      const value = e.target.value;

      if (
        !nicknameRegax.test(value) ||
        e.target.value.length < 2 ||
        e.target.value.length > 10
      ) {
        setErrorNickName(true);
        setDisabledDoubleCheckButton(true);
      } else {
        setErrorNickName(false);
        setDisabledDoubleCheckButton(false);
      }
    },
    []
  );

  // 닉네임 중복 확인 기능
  const { mutate: CheckNickname } = useMutation(
    (): Promise<EmailAuthResponse> => checkNicknameAvailable(nicknameInputData),
    {
      onSuccess: (): void => {
        setNicknameMent("사용 가능한 닉네임입니다.");
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            nickname: nicknameInputData,
            isNicknameChecked: true,
          })
        );
      },
      onError: (error: unknown): never => {
        setNicknameMent("한글/영문/숫자 2자 이상 10자 미만");
        setNicknameErrorMent("이미 사용중인 닉네임입니다.");
        setErrorNickName(true);
        setDisabledDoubleCheckButton(true);
        setSignUpFormData(
          (prev: SignUpFormData): SignUpFormData => ({
            ...prev,
            nickname: "",
            isNicknameChecked: false,
          })
        );
        throw error;
      },
    }
  );

  const handleCheckNickname = useCallback((): void => {
    if (nicknameInputData === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    CheckNickname();
  }, [CheckNickname, nicknameInputData]);

  return (
    <>
      <TextInputWithButton
        label="닉네임"
        name="닉네임"
        value={nicknameInputData}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          handleNicknameInputData(e);
          handleErrorNickName(e);
        }}
        placeholder="실명을 입력하세요"
        error={isErrorNickName}
        errorMessage={nicknameErrorMent}
        buttonMessage="중복 확인"
        buttonDisabled={isDisabledDoubleCheckButton}
        onClick={handleCheckNickname}
        description={nicknameMent}
      />
      <Margin direction="column" size={24} />
    </>
  );
}
