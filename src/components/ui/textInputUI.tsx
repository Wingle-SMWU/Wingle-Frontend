import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Margin, Text } from "../ui";

interface InputFieldProps {
  error?: boolean;
  width?: string;
}

interface TextInputProps extends InputFieldProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  validate?: (value: string) => boolean;
  errorMessage?: string;
  message?: string;
}

export default function TextInputUI({
  width,
  error,
  name,
  value,
  onChange,
  onBlur,
  disabled,
  placeholder,
  validate,
  errorMessage,
  message,
}: TextInputProps) {
  const hasError = validate && !validate(value);

  return (
    <>
      <InputField width={width} error={error}>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
        />
      </InputField>
      {hasError ? (
        <ErrorWrapper>
          <Image src="/auth/error.svg" alt="error" width={16} height={16} />
          <Margin direction="row" size={8} />
          <Text.Caption3 color="red500">{errorMessage}</Text.Caption3>
        </ErrorWrapper>
      ) : (
        <Text.Caption3 color="gray900">{message}</Text.Caption3>
      )}
    </>
  );
}

const InputField = styled.div<InputFieldProps>`
  height: 50px;
  border: 1px solid ${({ error }) => (error ? "#FF7070" : "#dcdce0")};
  border-radius: 8px;
  margin-bottom: 8px;

  & > input {
    width: ${({ width }) => (width ? { width } : "311px")};
    border: none;
    padding: 14px;
    border-radius: 8px;
    height: 22px;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #4f4f4f;

    &::placeholder {
      color: #959599;
    }
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
`;
