import instance from "../api/axiosModule";
import { getComments } from "../api/community/get/comments";
import { Margin, Text } from "./ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";

export default function Modal({
  type,
  deleteInform = { forumId: "", articleId: "", id: 0 },
  onClickModal,
}: {
  type: string;
  deleteInform?: Id;
  onClickModal: () => void;
}) {
  const { forumId, articleId, id } = deleteInform;
  const router = useRouter();
  const queryClient = useQueryClient();

  const onClickOk = () => {
    if (type === "create-back" || type === "profile-back") {
      router.back();
    } else if (type === "detail-delete-contents") {
      deleteComments.mutate();
      deleteArticle.mutate();
      onClickModal();
      router.back();
    } else if (type === "detail-delete-comment") {
      deleteComment.mutate();
      onClickModal();
    }
  };

  // detail-delete-contents
  // 1. 댓글 데이터 삭제
  const { data: comments } = useQuery({
    queryFn: getComments,
    queryKey: ["comments", String(forumId), String(articleId), 0, 10],
    enabled: forumId !== "" || articleId !== "",
    cacheTime: 5 * 60 * 1000,
    staleTime: 0,
  });

  const fetchComments = async () => {
    for (const comment of comments ?? []) {
      instance.delete(
        `/community/${forumId}/articles/${articleId}/comments/${comment.id}`
      );
    }
  };

  // 2. 게시물 삭제
  const fetchArticle = async () => {
    const { data: response } = await instance.delete(
      `/community/${forumId}/articles/${articleId}`
    );
    return response.data;
  };

  // detail-delete-comment
  const fetchCommment = async () => {
    const { data: response } = await instance.delete(
      `/community/${forumId}/articles/${articleId}/comments/${id}`
    );
    return response.data;
  };

  const deleteComment = useMutation(fetchCommment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });

  const deleteArticle = useMutation(fetchArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries("articles");
    },
  });

  const deleteComments = useMutation(fetchComments, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });

  const modalTitle = useMemo(() => {
    if (type === "create-back" || type === "profile-back") {
      return "정말 나가시겠어요?";
    } else if (type === "detail-delete-contents") {
      return "게시글을 삭제 하시겠어요?";
    } else if (type === "detail-delete-comment") {
      return "댓글을 삭제 하시겠어요?";
    }
    return "";
  }, [type]);

  const modalContents = useMemo(() => {
    if (type === "create-back") {
      return (
        <>
          글 작성을 완료하지 않고 페이지를 벗어나면
          <br></br>
          작성한 게시글이 사라져요.
        </>
      );
    }
    if (type === "detail-delete-contents") {
      return (
        <>
          삭제된 게시글은 복구할 수 없으니
          <br></br>
          신중하게 생각해주세요.
        </>
      );
    }
    if (type === "detail-delete-comment") {
      return (
        <>
          삭제된 댓글은 복구할 수 없으니
          <br></br>
          신중하게 생각해주세요.
        </>
      );
    }
    if (type === "profile-back") {
      return (
        <>
          지금 나가시면 변경 내용이
          <br></br>
          저장되지 않습니다.
        </>
      );
    }
    return "";
  }, [type]);

  return (
    <Style.Wrapper>
      <Style.Modal>
        <Style.AbsolutePoint>
          <Style.CloseIcon
            src="/community/modal/close-black.svg"
            onClick={onClickModal}
          />
        </Style.AbsolutePoint>
        <Style.Main>
          <Text.Title2 color="gray900">{modalTitle}</Text.Title2>
          <Margin direction="column" size={8} />
          <Text.Body7 color="gray900">{modalContents}</Text.Body7>
          <Margin direction="column" size={32} />
          <Style.ButtonBox>
            <Style.CancelButton onClick={onClickModal}>
              <Text.Caption1 color="gray600">취소</Text.Caption1>
            </Style.CancelButton>
            <Style.OkButton onClick={onClickOk}>
              <Text.Caption1 color="white">확인</Text.Caption1>
            </Style.OkButton>
          </Style.ButtonBox>
        </Style.Main>
      </Style.Modal>
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
  `,

  Modal: styled.div`
    width: 100%;
    max-width: 312px;
    height: 219px;
    border-radius: 8px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  `,

  AbsolutePoint: styled.div`
    position: absolute;
  `,

  CloseIcon: styled.img`
    position: relative;
    top: 10.83px;
    left: 282.49px;
  `,

  Main: styled.div`
    padding: 48px 24px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `,

  Title: styled.div`
    width: 100%;
    padding-top: 48px;
  `,

  ButtonBox: styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
  `,

  CancelButton: styled.button`
    width: 128px;
    height: 37px;
    border-radius: 8px;
    background-color: #eeeef2;
    font-weight: 700;
    font-size: 12px;
    color: #6c6c70;
  `,

  OkButton: styled.button`
    width: 128px;
    height: 37px;
    border-radius: 8px;
    background-color: #ff812e;
    font-weight: 700;
    font-size: 12px;
    color: #fff;
  `,
};
