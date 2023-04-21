import React from "react";
import styled from "styled-components";

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
}

export default function TextInputUI({
  width,
  name,
  value,
  onChange,
  onBlur,
  disabled,
  placeholder,
}: TextInputProps) {
  return (
    <InputField width={width}>
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
