import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import { Margin, Text } from "../ui";
import Button from "./button";

// InputField Props만 따로 정의
interface InputFieldProps {
  width?: string; // width가 없을 경우 기본값 311px
  error?: boolean; // error가 true일 경우 border 색상 변경
}

// TextInputUI Props 정의
interface TextInputProps extends InputFieldProps {
  label?: string; // 제목
  name: string; // input의 name
  value: string; // input의 value
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // input의 onChange
  disabled?: boolean; // input의 disabled, 기본값 false, true일 경우 input 비활성화
  placeholder?: string;
  errorMessage?: string; // error가 true일 경우 보여줄 에러 메시지, error 필수
  description?: string; // error가 false일 경우 보여줄 메시지, description 겸용
  buttonMessage: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonDisabled?: boolean;
}

export default function TextInputWithButton({
  label,
  width,
  name,
  value,
  onChange,
  error,
  disabled = false,
  placeholder,
  errorMessage,
  description,
  buttonMessage,
  buttonDisabled,
  onClick,
}: TextInputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  // 포커스 이벤트 처리 함수
  const handleFocus = () => {
    setIsFocused(true);
  };

  // 블러 이벤트 처리 함수
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <S.Container>
      {label && <S.DropDownLabel disabled={disabled}>{label}</S.DropDownLabel>}
      <S.InputButtonContainer>
        <S.InputField width={width} error={error} isFocused={isFocused}>
          <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus} // 포커스 이벤트 처리
            onBlur={handleBlur} // 블러 이벤트 처리
            disabled={disabled}
            placeholder={placeholder}
          />
        </S.InputField>
        <Margin direction="row" size={8} />
        <Button
          size="md"
          type="fill"
          disabled={buttonDisabled}
          onClick={onClick}
        >
          {buttonMessage}
        </Button>
      </S.InputButtonContainer>
      {error ? (
        <S.ErrorWrapper>
          <Image src="/auth/error.svg" alt="error" width={16} height={16} />
          <Margin direction="row" size={8} />
          <Text.Caption3 color="red500">{errorMessage}</Text.Caption3>
        </S.ErrorWrapper>
      ) : (
        description && (
          <Text.Caption3 color="gray900">{description}</Text.Caption3>
        )
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  DropDownLabel: styled.label<{ disabled: boolean }>`
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme, disabled }): string =>
      disabled ? theme.color.gray500 : theme.color.gray700};
  `,

  InputButtonContainer: styled.div`
    display: flex;
    flex-direction: row;
  `,

  InputField: styled.div<InputFieldProps & { isFocused: boolean }>`
    width: 77%;
    height: 50px;
    border: 1px solid
      ${({ error, theme }): string =>
        error ? theme.color.red400 : theme.color.gray300};
    border-color: ${({ isFocused, theme }): string | false =>
      isFocused && `${theme.color.gray600}`};
    border-radius: 8px;
    margin-bottom: 8px;

    & > input {
      width: calc(100% - 32px);
      border: none;
      padding: 14px 16px;
      border-radius: 8px;
      height: 22px;
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: ${({ theme }): string => theme.color.gray900};

      &::placeholder {
        color: ${({ theme }): string => theme.color.gray300};
      }
    }
  `,
  ErrorWrapper: styled.div`
    display: flex;
  `,
};
