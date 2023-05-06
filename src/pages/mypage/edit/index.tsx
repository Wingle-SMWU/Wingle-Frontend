import Modal from "@/src/components/modal";
import Profile from "@/src/components/mypage/Profile";
import { Text, Margin } from "@/src/components/ui";
import router from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProfile } from "@/src/api/mypage/profileData";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { profileStateAtom } from "@/src/atoms/profileStateAtom";
import Loading from "@/src/components/ui/loadingUI";

export default function Edit() {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const setProfileState = useSetRecoilState(profileStateAtom);

  const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileState(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to get profile:", error);
      }
    };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  const profileData = useRecoilValue(profileStateAtom);

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  if (loading) return <Loading />;

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
              <Profile />

              <S.EditBtn
                src="/modify.svg"
                alt="연필"
                onClick={() => router.push(`/mypage/edit/nickname`)}
              />
            </S.UserBox>
          </>

          <S.EditList>
            <Margin direction="column" size={32} />

            <S.Column >
            <S.Language>
              <Text.Body1 color="gray900">사용언어</Text.Body1>
              <S.EditBtn
                src="/modify.svg"
                alt="연필"
                onClick={() => router.push(`/mypage/edit/language`)}
              />
            </S.Language>
            <S.LanguageContent>
              {(profileData.languages).map((v) => (
                  <S.LanguageChartContent key={v.order}>
                    <S.LanguageChart src={`/mypage/language${v.order}.svg`} />
                    <S.LanguageText fontWeight={550} width ={28}>{v.interest.substring(0,2)}  </S.LanguageText>
                    <S.LanguageText fontWeight={400} width = {262} color ="orange500">{v.interest.substring(2)}</S.LanguageText>
              </S.LanguageChartContent>
              ))}
            </S.LanguageContent>
            </S.Column>

            <Margin direction="column" size={32} />
            <S.Column>
              <S.Introduce>
                <Text.Body1 color="gray900">자기소개</Text.Body1>
                <S.EditBtn
                  src="/modify.svg"
                  alt="연필"
                  onClick={() => router.push(`/mypage/edit/introduce`)}
                />
              </S.Introduce>
              <S.IntroduceContent>
                {profileData && profileData.introduce}
              </S.IntroduceContent>
            </S.Column>

            <Margin direction="column" size={32} />
            <S.Column>
              <S.Interest>
                <Text.Body1 color="gray900">관심사</Text.Body1>
                <S.EditBtn
                  src="/modify.svg"
                  alt="연필"
                  onClick={() => router.push(`/mypage/edit/interest`)}
                />
              </S.Interest>
              <S.InterestBoxContainer>
                {profileData &&
                  profileData.interests.map((item) => {
                    return (
                      <div key={item}>
                        <S.InterestBox backgroundColor="#FFF3EB">
                          <Text.Body6 color="gray900" pointer key={item}>
                            {item}
                          </Text.Body6>
                        </S.InterestBox>
                        <Margin direction="row" size={8} />
                      </div>
                    );
                  })}
              </S.InterestBoxContainer>
            </S.Column>
          </S.EditList>
        </S.Content>
        {modalVisible && (
          <Modal type="profile-back" onClickModal={onClickModal} />
        )}
      </S.Wapper>
    </>
  );
}

interface IntesestBoxProps {
  backgroundColor : string;
}

interface LanguageText {
  fontWeight : number;
  width : number;
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
  UserInfoBox: styled.div`
    width: 340px;
    height: 86px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
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
  `,
  LanguageContent: styled.div`
    margin-top: 16px;
    padding: 16px, 24px, 24px, 24px;
  `,
  LanguageChartContent : styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom : 6px;
  `,
  LanguageChart : styled.img`
    width: 18px;
    height: 18px;
    padding-right: 6px;
  `,
  LanguageText : styled.div<LanguageText>`
    width : ${(props) => props.width}px;
    color : #49494D;
    font-size : 14px;
    font-family: 'Pretendard';
    font-weight: ${(props) => props.fontWeight};
  `,
  Introduce: styled.div`
    width: 452px;
    display: flex;
    justify-content: space-between;
  `,
  IntroduceContent: styled.div`
    padding-top: 16px;
    font-size: 16px;
    line-height: 140%;
    color: theme.color.gray900;
  `,
  InterestBoxContainer: styled.div`
    display: flex;
    flex-direction: row;
  `,
  Interest: styled.div`
    width: 452px;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid blue; */
  `,
  InterestBox: styled.div<IntesestBoxProps>`
    cursor: pointer;
    border-radius: 40px;
    padding: 8px 15px;
    background-color: ${(props) => props.backgroundColor};
    margin: 8px;
  `,
  Column: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
