import styled from "styled-components";
import router from "next/router";
import { Text } from "@/src/components/ui";

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
    width: 500px;
    height: 56px;
  `,
  GoBackArrow: styled.img`
    margin-right: 12px;
    cursor: pointer;
  `,
};

export default function language() {
  return (
    <>
      <Style.Wapper>
        <Style.Content>
          <Style.Header>
            <Style.GoBackArrow
              src="/back-arrow.svg"
              alt="뒤로가기"
              onClick={() => router.push(`/mypage/edit`)}
            />

            {/* 뒤로가기 버튼 누르면 정말 나가시겠어요? 모달 띄우기 */}
            <Text.Title1 color="gray900">사용 가능 언어</Text.Title1>
          </Style.Header>
        </Style.Content>
      </Style.Wapper>
    </>
  );
}
