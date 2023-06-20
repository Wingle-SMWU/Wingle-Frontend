import Modal from "@/src/components/modal";
import Profile from "@/src/components/mypage/Profile";
import { Text, Margin } from "@/src/components/ui";
import router from "next/router";
import styled from "styled-components";
import { useState } from "react";
import Loading from "@/src/components/ui/loadingUI";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";

export default function Edit(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);

  const { profileData, isLoading, isError } = useGetProfile();

  const onClickModal = (): void => {
    setModalVisible((prev) => !prev);
  };

  if (isLoading) return <Loading />;
  if (isError) return <>에러</>;

  return (
    <>
      <S.Wapper>
        <S.Content>
          <S.Header>
            <S.GoBackArrow
              src="/back-arrow.svg"
              alt="뒤로가기"
              onClick={(): Promise<boolean> => router.push(`/mypage`)}
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
                onClick={(): Promise<boolean> =>
                  router.push(`/mypage/edit/nickname`)
                }
              />
            </S.UserBox>
          </>

          <S.EditList>
            <Margin direction="column" size={32} />

            <S.Column>
              <S.Language>
                <Text.Body1 color="gray900">사용언어</Text.Body1>
                <S.EditBtn
                  src="/modify.svg"
                  alt="연필"
                  onClick={(): Promise<boolean> =>
                    router.push(`/mypage/edit/language`)
                  }
                />
              </S.Language>
              <S.LanguageContent>
                {profileData &&
                  profileData.languages.map((v) => (
                    <S.LanguageChartContent key={v.order}>
                      <S.LanguageChart src={`/mypage/language${v.order}.svg`} />
                      <S.LanguageText fontWeight={550} width={28}>
                        {v.language.substring(0, 2)}{" "}
                      </S.LanguageText>
                      <S.LanguageText
                        fontWeight={400}
                        width={262}
                        color="orange500"
                      >
                        {v.language.substring(2)}
                      </S.LanguageText>
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
                  onClick={(): Promise<boolean> =>
                    router.push(`/mypage/edit/introduce`)
                  }
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
                  onClick={(): Promise<boolean> =>
                    router.push(`/mypage/edit/interest`)
                  }
                />
              </S.Interest>
              <S.InterestBoxContainer>
                {profileData &&
                  profileData.interests.map((item, index) => {
                    const isLastItemInRow = (index + 1) % 3 === 0;

                    return (
                      <S.ShowInterest key={item}>
                        <S.InterestBox backgroundColor="#FFF3EB">
                          <Text.Body6 color="gray900" pointer>
                            {item}
                          </Text.Body6>
                        </S.InterestBox>
                        {isLastItemInRow && (
                          <Margin direction="column" size={0} />
                        )}
                      </S.ShowInterest>
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

type IntesestBoxProps = {
  backgroundColor: string;
};

type LanguageText = {
  fontWeight: number;
  width: number;
};
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
  LanguageChartContent: styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 6px;
  `,
  LanguageChart: styled.img`
    width: 18px;
    height: 18px;
    padding-right: 6px;
  `,
  LanguageText: styled.div<LanguageText>`
    width: ${(props): number => props.width}px;
    color: #49494d;
    font-size: 14px;
    font-family: "Pretendard";
    font-weight: ${(props): number => props.fontWeight};
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
    width: 80%;
  `,
  Interest: styled.div`
    width: 452px;
    display: flex;
    justify-content: space-between;
  `,
  ShowInterest: styled.div`
    display: inline-flex;
    flex-direction: column;
  `,
  InterestBox: styled.div<IntesestBoxProps>`
    cursor: pointer;
    border-radius: 40px;
    padding: 8px 15px;
    display: inline-flex;
    background-color: ${(props): string => props.backgroundColor};
    margin: 8px;
  `,

  Column: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
