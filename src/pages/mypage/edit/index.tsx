import Modal from "@/src/components/modal";
import Profile from "@/src/components/mypage/Profile";
import { Text, Margin } from "@/src/components/ui";
import router from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { profileStateAtom } from "@/src/atoms/profileStateAtom";

export default function Edit() {
  const [modalVisible, setModalVisible] = useState(false);
  const profileData = useRecoilValue(profileStateAtom);
  
  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };
  return (
    <>
      <S.Wapper>
        <S.Content>
          <S.Header>
            <S.GoBackArrow
              src="/back-arrow.svg"
              alt="뒤로가기"
              onClick={() => router.push(`/mypage`)}
            />
            <Margin direction="row" size={13} />
            <Text.Title1 color="gray900">프로필 수정</Text.Title1>
          </S.Header>
          <>
            <S.UserBox>
              <Profile/>

              <S.EditBtn
                src="/modify.svg"
                alt="연필"
                onClick={() => router.push(`/mypage/edit/nickname`)}
              />
            </S.UserBox>
          </>

          <S.EditList>
            <Margin direction="column" size={32} />
            <S.Language>
              <Text.Body1 color="gray900">사용언어</Text.Body1>
              <S.EditBtn
                src="/modify.svg"
                alt="연필"
                onClick={() => router.push(`/mypage/edit/language`)}
              />
              {/* 두번째 연필 누르면 "사용 가능 언어" 페이지로 가서 1순위, 2순위, 3순위 언어선택 */}
            </S.Language>

            <Margin direction="column" size={32} />
            <S.Introduce>
              <Text.Body1 color="gray900">자기소개</Text.Body1>
              <S.EditBtn
                src="/modify.svg"
                alt="연필"
                onClick={() => router.push(`/mypage/edit/introduce`)}
              />
              {/* 세번째 연필 누르면 "자기소개" 페이지로 가서 자기소개 글쓰기 */}
            </S.Introduce>

            <Margin direction="column" size={32} />
            <S.Interest>
              <Text.Body1 color="gray900">관심사</Text.Body1>
              <S.EditBtn
                src="/modify.svg"
                alt="연필"
                onClick={() => router.push(`/mypage/edit/interest`)}
              />
              {/* 네번째 연필 누르면 "관심사" 페이지로 가서 관심사 선택하기 */}
            </S.Interest>
          </S.EditList>
        </S.Content>
        {modalVisible && (
          <Modal type="profile-back" onClickModal={onClickModal} />
        )}
      </S.Wapper>
    </>
  );
}

const S = {
  Wapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* border: 1px solid red; */
  `,
  Content: styled.div`
    padding: 0 24px;
  `,
  Header: styled.div`
    display: flex;
    padding: 14px 0;
  `,
  GoBackArrow: styled.img`
    cursor: pointer;
  `,

  UserBox: styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeef2;
    gap: 14px;
    position: relative;
  `,
  UserImgBox: styled.div`
    width: 56px;
    height: 56px;
    border: 1px solid green;
  `,
  UserProfileImg: styled.img`
    border: 1px solid #eeeef2;
  `,
  UserFlagImg: styled.img``,
  UserInfoBox: styled.div`
    width: 340px;
    height: 86px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  UserNicknameAndSex: styled.div`
    display: flex;
  `,
  UserSexImg: styled.img``,
  RegisterBtn: styled.button`
    width: 45px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff812e;
    border-radius: 8px;
  `,
  EditBtn: styled.img`
    width: 24px;
    height: 24px;
    border-radius: 18px;
    cursor: pointer;
  `,
  EditList: styled.div`
    width: 452px;
    display: flex;
    flex-direction: column;
  `,
  Language: styled.div`
    width: 452px;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid blue; */
  `,
  Introduce: styled.div`
    width: 452px;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid blue; */
  `,
  Interest: styled.div`
    width: 452px;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid blue; */
  `,
};
