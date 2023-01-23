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
  Content: styled.div`
    padding: 24px;
  `,
  ImageChangeBox: styled.div`
    width: 88px;
    height: 88px;
    margin: 30px 0px;
  `,
  NicknameChangeBox: styled.div``,
  InputNickname: styled.input`
    width: 100%;
    height: 52px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
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

export default function Nickname() {
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
              <Text.Title1 color="gray900">프로필 수정</Text.Title1>
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
          <>
            <Style.ImageChangeBox>이미지</Style.ImageChangeBox>

            <Style.NicknameChangeBox>
              <Text.Body5 color="gray700">닉네임</Text.Body5>{" "}
              <Margin direction="column" size={8} />
              <Style.InputNickname />
              <Margin direction="column" size={8} />
              <Text.Caption3 color="gray900">
                한글/영어 2글자 이상 10글자 이하
              </Text.Caption3>
            </Style.NicknameChangeBox>
          </>
        </Style.Content>
      </Style.Wapper>
    </>
  );
}
