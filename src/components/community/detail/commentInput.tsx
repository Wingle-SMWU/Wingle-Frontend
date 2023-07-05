import { Margin } from "../../ui";
import instance from "@/src/api/axiosModule";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

export default function CommentInput({
  forumId,
  articleId,
}: {
  forumId: number;
  articleId: number;
}): JSX.Element {
  const [comment, setComment] = useState<string>("");

  const fetchComments = async (): Promise<Comment> => {
    const { data: response } = await instance.post(
      `/community/articles/comments`,
      {
        forumId,
        articleId,
        originCommentId: 0,
        content: comment,
      }
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const updateComment = useMutation(fetchComments, {
    onMutate: async () => {
      await queryClient.cancelQueries("comments");
      const prevComments = queryClient.getQueryData(["comments"], {
        exact: false,
      });
      return { prevComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
    onError: (error, payload, context) => {
      console.log(`댓글 작성 실패! ${error}`);
      queryClient.setQueryData("comments", context?.prevComments);
    },
  });

  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(event.target.value);
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleResetHeight = () => {
    if (inputRef.current !== null) {
      inputRef.current.style.height = "auto";
    }
  };
  const handleResizeHeight = useCallback(() => {
    if (inputRef.current !== null) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef?.current?.scrollHeight + "px";
    }
  }, []);

  return (
    <S.Wrapper>
      <S.CommentInput
        placeholder="댓글을 입력해보세요."
        onChange={onChangeComment}
        maxLength={1000}
        rows={1}
        ref={inputRef}
        onInput={handleResizeHeight}
        value={comment}
      />
      <Margin direction="row" size={8}></Margin>
      <S.PostIcon
        comment={comment}
        src={
          comment
            ? "/community/detail/send.svg"
            : "/community/detail/send-disable.svg"
        }
        onClick={(): void => {
          comment && updateComment.mutate();
          setComment("");
          handleResetHeight();
        }}
      />
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    padding: 12px 24px 12px 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eeeef2;
    background-color: #fff;
  `,

  CommentInput: styled.textarea`
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

  PostIcon: styled.img<{ comment: string }>`
    width: 32px;
    height: 32px;
    cursor: ${({ comment }): string => (comment ? "pointer" : "auto")};
  `,
};
