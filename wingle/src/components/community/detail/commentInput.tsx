import { ChangeEvent, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { Margin } from "../../ui";

export default function CommentInput() {
  const [comment, setComment] = useState("");

  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = useCallback(() => {
    if (inputRef.current !== null) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef?.current?.scrollHeight + "px";
    }
  }, []);

  return (
    <Style.Wrapper>
      <Style.CommentInput
        placeholder="댓글을 입력해보세요."
        onChange={onChangeComment}
        maxLength={500}
        rows={1}
        ref={inputRef}
        onInput={handleResizeHeight}
      />
      <Margin direction="row" size={8}></Margin>
      <Style.PostIcon
        src={
          comment
            ? "/community/detail/send.svg"
            : "/community/detail/send-disable.svg"
        }
      />
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.div`
    padding: 16px 24px 17px 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eeeef2;
  `,

  CommentInput: styled.textarea`
    width: 100%;
    max-height: 66px;
    border: none;
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

  PostIcon: styled.img`
    width: 32px;
    height: 32px;
  `,
};
