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
    /* border: 1px solid red; */
  `,
  Content: styled.div`
    padding: 24px;
  `,
  Header: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  `,
  Left: styled.div``,

  GoBackArrow: styled.img`
    margin-right: 12px;
    cursor: pointer;
  `,
};

export default function Interest() {
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
              <Text.Title1 color="gray900">관심사</Text.Title1>
            </Style.Left>
            <Text.Body1
              color="gray900"
              onClick={() => router.push(`/mypage/edit`)}
              pointer
            >
              완료
            </Text.Body1>
          </Style.Header>
        </Style.Content>
      </Style.Wapper>
    </>
  );
}
