import styled from "styled-components";
import { Text } from "../../ui";
import { useRouter } from "next/router";
import { Content } from "./content";
import { ChangeEvent, useState } from "react";
import instance from "@/src/api/axiosModule";
import { useMutation, useQueryClient } from "react-query";

export default function Body({
  content,
  articleId,
  forumId,
  isMine,
  images,
}: {
  content: string;
  articleId: string;
  forumId: string;
  isMine: boolean;
  images: string[];
}): JSX.Element {
  const router = useRouter();
  const tab = router.query.tab;
  const isNotice = tab === "공지";
  const [contents, setContents] = useState(content);
  const [originalContents, setOriginalContents] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const editArticle = async (): Promise<void | Article> => {
    if (!forumId) {
      return;
    }

    const formData = new FormData();
    formData.append("content", contents);
    // const blob = new Blob([]);
    const { data: response } = await instance.put(
      `/community/${forumId.toString()}/articles/${articleId} `,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  };

  const updateArticle = useMutation(editArticle, {
    onMutate: async () => {
      await queryClient.cancelQueries("articles");
      const prevArticles = queryClient.getQueryData(["articles"], {
        exact: false,
      });
      return { prevArticles };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["article", forumId, articleId]);
      queryClient.invalidateQueries(["articles"]);
      if (!data) return;
    },
    onError: (error, payload, context) => {
      console.log(`게시글 수정 실패! ${error}`);
      // TODO: 서버 에러 해결되면 주석 처리된 코드로 변경해야함
      queryClient.invalidateQueries(["article", forumId, articleId]);
      // queryClient.setQueryData("articles", context?.prevArticles);
    },
    onSettled: () => {
      queryClient.invalidateQueries("articles");
    },
  });

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(event.target.value);
  };

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onSaveClick = () => {
    setOriginalContents(contents);
    setIsEditing(false);
    updateArticle.mutate();
  };

  const onCancelClick = () => {
    setContents(originalContents);
    setIsEditing(false);
  };

  return (
    <S.Body>
      <S.Contents isNotice={isNotice}>
        {isMine && isEditing ? (
          <S.EditArea>
            <S.Content
              placeholder={content}
              onChange={onChangeContents}
              maxLength={3000}
              value={contents}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <S.SaveButton onClick={onSaveClick}>Save</S.SaveButton>
              <S.CancelButton onClick={onCancelClick}>Cancel</S.CancelButton>
            </div>
          </S.EditArea>
        ) : (
          <Text.Body3 color="gray900">
            {contents.split("\n").map((text, i) => (
              <div key={i}>
                <Content text={text} isNotice={isNotice} isDetail={true} />
              </div>
            ))}
            {isMine && <S.EditButton onClick={onEditClick}>Edit</S.EditButton>}
          </Text.Body3>
        )}
      </S.Contents>
    </S.Body>
  );
}
const S = {
  Body: styled.div`
    width: 100%;
    background-color: #fff;
  `,
  Contents: styled.div<{ isNotice: boolean }>`
    padding: 16px 24px 20px 24px;
    border-bottom: ${({ isNotice }) =>
      isNotice ? "none" : "4px solid #eeeef2"};
  `,

  Body2: styled.div`
    padding: 16px 24px 24px 24px;
  `,

  Content: styled.textarea`
    width: 100%;
    height: 400px;
    font-weight: 400;
    font-size: 16px;
    font-family: "Pretendard Variable", Pretendard;
    line-height: 140%;
    color: #222223;
    ::placeholder {
      color: black;
    }
    resize: none;
    border: none;
    padding: 0;
    background-color: inherit;
  `,

  EditArea: styled.div`
    display: flex;
    flex-direction: column;
  `,

  EditButton: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: blue;
    margin-top: 16px;
  `,

  SaveButton: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: green;
    margin-top: 16px;
  `,

  CancelButton: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: red;
    margin-top: 16px;
  `,
};
