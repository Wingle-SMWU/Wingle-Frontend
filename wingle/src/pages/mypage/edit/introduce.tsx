import styled from "styled-components";
import router from "next/router";
import { Text } from "@/src/components/ui";
import { useState } from "react";

const Style = {
  Wapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid red;
  `,
  Content: styled.div`
    padding: 24px;
  `,
  Header: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Left: styled.div``,
  GoBackArrow: styled.img`
    margin-right: 12px;
    cursor: pointer;
  `,

  Description: styled.textarea`
    width: 100%;
    min-height: 500px;
    padding: 30px 0px;
    border: 1px solid white;
    font-size: 16px;
    color: #222223;
    outline: none;
    resize: none;
    ::placeholder {
      font-weight: 400;
      color: gray;
    }
  `,
};

export default function Introduce() {
  return (
    <>
      <Style.Wapper>
        <Style.Content>
          <Style.Header>
            <Style.Left>
              <Style.GoBackArrow
                src="/back-arrow.svg"
                alt="뒤로가기"
                onClick={() => router.push(`/mypage/edit`)}
              />

              {/* 뒤로가기 버튼 누르면 정말 나가시겠어요? 모달 띄우기 */}
              <Text.Title1 color="gray900">자기소개</Text.Title1>
            </Style.Left>
            <Text.Body1
              color="gray900"
              onClick={() => router.push(`/mypage/edit`)}
              // onClick={handleSubmit} 얘도 추가해야함
              pointer
            >
              완료
            </Text.Body1>
          </Style.Header>

          <Style.Description
            maxLength={400}
            placeholder="자기소개를 작성해주세요! (최대 400자)"
          />
        </Style.Content>
      </Style.Wapper>
    </>
  );
}
