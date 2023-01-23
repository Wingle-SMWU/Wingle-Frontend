import Modal from "@/src/components/community/modal";
import { Text } from "@/src/components/ui";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

export default function Create() {
  const router = useRouter();
  const currentTab = router.query.tab;
  const [contents, setContents] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <Style.Wrapper>
      <Style.Header>
        <Style.HeaderLeft>
          <Style.BackArrow
            src="/community/arrow_back.svg"
            onClick={onClickModal}
          />
          <Text.Title2 color="gray900">{currentTab}게시판 글 작성</Text.Title2>
        </Style.HeaderLeft>
        <Style.CreateButton>
          <Text.Body1 color={contents ? "gray900" : "gray500"}>등록</Text.Body1>
        </Style.CreateButton>
      </Style.Header>
      <Style.Body>
        <Style.Contents
          placeholder="자유롭게 글을 작성해보세요!"
          onChange={onChangeContents}
        />
      </Style.Body>
      {modalVisible && <Modal type="create" onClickModal={onClickModal} />}
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.div`
    position: relative;
  `,

  Header: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 14px 24px;
  `,

  HeaderLeft: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,

  BackArrow: styled.img`
    margin-right: 14.5px;
  `,

  CreateButton: styled.button`
    border: none;
  `,

  Body: styled.div`
    padding: 16px 24px 24px 24px;
  `,

  Contents: styled.textarea`
    width: 100%;
    height: 100%;
    max-height: 850px;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #222223;
    ::placeholder {
      color: #959599;
    }
    resize: none;
    border: none;
    padding: 0;
    background-color: inherit;
  `,
};
