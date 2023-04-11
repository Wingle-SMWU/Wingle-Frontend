import { getImageUrl } from "@/src/modules/utils";
import { useState } from "react";
import styled from "styled-components";
import Modal from "../../modal";
import { Text } from "../../ui";
import { useQuery } from "react-query";
import { getComments } from "@/src/api/community/get/comments";

export default function Comment(props: { currentTab: string, forumId: string, articleId: string }) {
  const [modalVisible, setModalVisible] = useState(false);

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: getComments,
    queryKey: ['getComment', props.forumId, props.articleId, 0, 10],
  });

  if (isLoading) return <div>로딩중</div>
  if (isError) return <div>에러</div>
  
  console.log(data);

  return (
    <Style.Wrapper>
      <Style.CommentCount>
        <Text.Body3 color="gray900">댓글 10</Text.Body3>
      </Style.CommentCount>
      <Style.Comment>
        <Style.CommentTop>
          <Style.CommentTopLeft>
            <Style.ProfileImg src={getImageUrl(props.currentTab)} />
            <Style.ProfileInfo>
              <Text.Body6 color="gray900">한국윙그리</Text.Body6>
              <Text.Caption3 color="gray500">10분 전</Text.Caption3>
            </Style.ProfileInfo>
          </Style.CommentTopLeft>
          <Style.CancelImg
            src="/community/detail/close-gray.svg"
            onClick={onClickModal}
          />
        </Style.CommentTop>
        <Style.CommentBottom>
          <Text.Body3 color="gray900">그건좀 그렇지않나요?</Text.Body3>
        </Style.CommentBottom>
      </Style.Comment>
      {modalVisible && (
        <Modal type="detail-delete-comment" onClickModal={onClickModal} />
      )}
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  `,

  CommentCount: styled.div`
    padding: 16px 24px;
  `,

  Comment: styled.div`
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #eeeef2;
  `,

  CommentTop: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

  CommentBottom: styled.div`
    padding-top: 4px;
  `,

  CommentTopLeft: styled.div`
    display: flex;
    flex-direction: row;
  `,

  ProfileImg: styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
  `,

  ProfileInfo: styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  `,

  CancelImg: styled.img`
    width: 24px;
    height: 24px;
  `,
};
