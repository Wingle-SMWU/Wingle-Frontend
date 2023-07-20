import styled from "styled-components";
import { Margin } from "../ui";
import { useCallback, useRef } from "react";
import { theme } from "@/src/styles/theme";

interface IconProps {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onClick: () => void;
}

const MsgInput = ({ text, onChange, onKeyDown, onClick }: IconProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = useCallback(() => {
    if (inputRef.current !== null) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef?.current?.scrollHeight + "px";
    }
  }, []);
  const handleResetHeight = () => {
    if (inputRef.current !== null) {
      inputRef.current.style.height = "auto";
    }
  };
  return (
    <S.Container>
      <S.TextInput
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="내용을 입력하세요."
        maxLength={500}
        rows={1}
        ref={inputRef}
        onInput={handleResizeHeight}
      />
      <Margin direction="row" size={8}></Margin>

      <S.SendIcon
        text={text}
        src={
          text
            ? "/community/detail/send.svg"
            : "/community/detail/send-disable.svg"
        }
        onClick={() => {
          handleResetHeight();
          onClick();
        }}
      />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    padding: 12px 24px 12px 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${theme.color.gray200};
    background-color: ${theme.color.white};
  `,

  TextInput: styled.textarea`
    width: 100%;
    max-height: 56px;
    border: none;
    font-family: "Pretendard Variable", Pretendard;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    ::placeholder {
      color: #959599;
    }
    resize: none;
    padding: 0;
    background-color: inherit;
  `,

  SendIcon: styled.img<{ text: string }>`
    width: 32px;
    height: 32px;
    cursor: ${({ text }) => (text ? "pointer" : "auto")};
  `,
};

export default MsgInput;
