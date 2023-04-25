import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Margin, Text } from "../ui";

// InputField Props만 따로 정의
interface InputFieldProps {
  width?: string; // width가 없을 경우 기본값 311px
  error?: boolean; // error가 true일 경우 border 색상 변경
}

// TextInputUI Props 정의
interface TextInputProps extends InputFieldProps {
  name: string; // input의 name
  value: string; // input의 value
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // input의 onChange
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; // input의 onBlur
  disabled?: boolean; // input의 disabled, 기본값 false, true일 경우 input 비활성화
  placeholder?: string;
  errorMessage?: string; // error가 true일 경우 보여줄 에러 메시지, error 필수
  message?: string; // error가 false일 경우 보여줄 메시지, description 겸용
}

export default function TextInputUI({
  width,
  name,
  value,
  onChange,
  error,
  onBlur,
  disabled,
  placeholder,
  errorMessage,
  message,
}: TextInputProps) {
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
      {error ? (
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

// EXAMPLE : 아래처럼 사용하세요!!
// export default function Test() {
//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (event: any) => {
//     setInputValue(event.target.value);
//   };

//   const handleError = () => {
//     if (inputValue.length < 5) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   return (
//     <>
//       <Margin size={50} direction="column" />
//       <div>
//         <TextInputUI
//           name="test"
//           value={inputValue}
//           onChange={handleInputChange}
//           onBlur={() => console.log("onBlur")}
//           error={handleError()}
//           placeholder="텍스트를 입력해주세요."
//           errorMessage="5글자 이상 입력해주세요."
//           message="5글자 이상 하셨군요!"
//         />
//       </div>
//     </>
//   );
// }
