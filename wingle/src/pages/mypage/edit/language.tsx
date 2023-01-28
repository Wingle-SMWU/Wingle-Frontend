import styled from "styled-components";
import router from "next/router";
import { Margin, Text } from "@/src/components/ui";

const Style = {
  Wapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* border: 1px solid red; */
  `,

  Header: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  `,
  Content: styled.div`
    padding: 24px;
  `,
  Left: styled.div``,
  GoBackArrow: styled.img`
    margin-right: 12px;
    cursor: pointer;
  `,
  SelectBox: styled.div`
    width: 100%;
    height: 282px;
  `,
  DropdownSelectBox: styled.div`
    width: 100%;
    height: 50px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
  `,
  ResetBox: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  ResetBtn: styled.button`
    width: 79px;
    height: 33px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
  `,
};

export default function Language() {
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
              <Text.Title1 color="gray900">사용 가능 언어</Text.Title1>
            </Style.Left>
            <Text.Body1
              color="gray500" // 비활성화 상태
              // 활성화 상태에서는 color="gray900"
              onClick={() => router.push(`/mypage/edit`)}
              pointer
            >
              완료
            </Text.Body1>
          </Style.Header>
          <Style.SelectBox>
            <Text.Body5 color="gray700">1순위</Text.Body5>
            <Margin direction="column" size={8} />
            <Style.DropdownSelectBox />

            <Margin direction="column" size={24} />
            <Text.Body5 color="gray700">2순위</Text.Body5>
            <Margin direction="column" size={8} />
            <Style.DropdownSelectBox />
            <Margin direction="column" size={24} />
            <Text.Body5 color="gray700">3순위</Text.Body5>
            <Margin direction="column" size={8} />
            <Style.DropdownSelectBox />
          </Style.SelectBox>
          <Margin direction="column" size={24} />
          <Style.ResetBox>
            <Style.ResetBtn>
              <Text.Caption3 color="gray700" pointer>
                선택 초기화
              </Text.Caption3>
            </Style.ResetBtn>
          </Style.ResetBox>
        </Style.Content>
      </Style.Wapper>
    </>
  );
}