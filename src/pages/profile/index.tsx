import Modal from "@/src/components/modal";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "@/src/components/ui/loadingUI";
import instance from "@/src/api/axiosModule";
import { getImageUrl, countryImg } from "@/src/modules/utils";
import { ProfileStateType } from "@/src/types/mypage/profileType";
import { RoomNumberResponse } from "@/src/types/message/roomType";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";
import { useResetRecoilState } from "recoil";
import { recipientUserId } from "@/src/atoms/message/recipientUserId";

export default function Edit(): JSX.Element {
  const resetRecipientUserId = useResetRecoilState(recipientUserId);
  const [fromMessages, setFromMessages] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [profileData, setProfileData] = useState<ProfileStateType>();
  const { profileData: myProfileData } = useGetProfile();

  const router = useRouter();
  const userID = router.query["userID"];

  const getProfile = async (): Promise<void> => {
    try {
      const res = await instance.get(`/profile/${userID}`);
      setProfileData(res.data.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
      throw err;
    }
  };

  useEffect(() => {
    const { fromMessages } = router.query;
    if (fromMessages === "true") {
      setFromMessages(true);
    }

    return () => {
      resetRecipientUserId();
    };
  }, [router.query]);

  useEffect(() => {
    if (userID) getProfile();
  }, [userID]);
  const onClickModal = (): void => {
    setModalVisible((prev) => !prev);
  };

  const createNewRoom = async (): Promise<number> => {
    const response = await instance.post(`/messages/room`, {
      originId: userID,
      originType: "Profile",
    });
    const roomId = response.data.data as RoomNumberResponse;
    return roomId.roomId;
  };

  const sendNote = async () => {
    const setYourInfo = (): void => {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          "yourInfo",
          JSON.stringify({
            nickname: profileData?.nickname ?? "",
            image: profileData?.image ?? "",
            nation: profileData?.nation ?? "",
          })
        );
      }
    };
    setYourInfo();
    const roomId = await createNewRoom();
    router.push(`/messages/${roomId}`);
  };

  const isMe = myProfileData?.nickname === profileData?.nickname;

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
              onClick={(): void => router.back()}
            />
            <Margin direction="row" size={13} />
            <Text.Title1 color="gray900">프로필</Text.Title1>
          </S.Header>
          <>
            <S.UserBox>
              <S.UserImgBox>
                <S.UserProfileImg
                  src={
                    profileData &&
                    (profileData.image
                      ? profileData.image
                      : getImageUrl("기본"))
                  }
                  alt="프로필"
                />
                <S.UserFlagImg
                  src={profileData && countryImg(profileData.nation)}
                  alt="국기"
                />
              </S.UserImgBox>
              <S.UserInfoBox>
                <S.UserNicknameAndSex>
                  <Text.Body1 color="gray900">
                    {profileData && profileData.nickname}
                  </Text.Body1>
                  <S.UserSexImg
                    src={
                      profileData && profileData.gender
                        ? "/mypage/female.svg"
                        : "/mypage/male.svg"
                    }
                    alt="성별"
                  />
                </S.UserNicknameAndSex>
                <Text.Body6 color="gray800">
                  {profileData && profileData.nation}
                </Text.Body6>
              </S.UserInfoBox>
            </S.UserBox>
          </>

          <S.EditList>
            <Margin direction="column" size={32} />

            <S.Column>
              <S.Language>
                <Text.Body1 color="gray900">사용언어</Text.Body1>
              </S.Language>
              <S.LanguageContent>
                {profileData &&
                  profileData.languages.map((v) => (
                    <S.LanguageChartContent key={v.order}>
                      <S.LanguageChart src={`/mypage/language${v.order}.svg`} />
                      <S.LanguageText fontWeight={550} width={50}>
                        {v.language}
                      </S.LanguageText>
                    </S.LanguageChartContent>
                  ))}
              </S.LanguageContent>
            </S.Column>

            <Margin direction="column" size={32} />
            <S.Column>
              <S.Introduce>
                <Text.Body1 color="gray900">자기소개</Text.Body1>
              </S.Introduce>
              <S.IntroduceContent>
                {profileData && profileData.introduce}
              </S.IntroduceContent>
            </S.Column>

            <Margin direction="column" size={32} />
            <S.Column>
              <S.Interest>
                <Text.Body1 color="gray900">관심사</Text.Body1>
              </S.Interest>
              <S.InterestBoxContainer>
                <Margin size={8} direction={"column"} />
                {profileData &&
                  profileData.interests.map((item, index) => {
                    const isLastItemInRow = (index + 1) % 3 === 0;

                    return (
                      <S.ShowInterest key={item}>
                        <S.InterestBox>
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
          {!isMe && !fromMessages ? (
            <S.Note onClick={sendNote}>쪽지 보내기</S.Note>
          ) : null}
        </S.Content>
        {modalVisible && (
          <Modal type="profile-back" onClickModal={onClickModal} />
        )}
      </S.Wapper>
    </>
  );
}

interface LanguageText {
  fontWeight: number;
  width: number;
}
const S = {
  Wapper: styled.div`
    @media (min-width: 501px) {
      width: 500px;
      margin: 0 auto; /* Center align when width is 500px or more */
    }
    @media (max-width: 500px) {
      width: 100vw;
      background-color: white;
    }
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* border: 1px solid red; */
  `,
  Content: styled.div`
    padding: 0 24px;
    margin-top: 56px;
    background-color: white;
  `,
  Header: styled.div`
    display: flex;
    padding: 14px 0px;
    position: fixed;
    background-color: ${({ theme }) => theme.color.white};
    z-index: 1;
    @media (max-width: 500px) {
      width: 100vw;
      background-color: white;
    }
    top: 0px;
  `,
  GoBackArrow: styled.img`
    cursor: pointer;
  `,

  UserBox: styled.div`
    display: flex;
    align-items: center;
    /* border-bottom: 1px solid #eeeef2; */
    gap: 14px;
    position: relative;
  `,
  UserImgBox: styled.div`
    width: 56px;
    height: 56px;
    position: relative;
  `,
  UserProfileImg: styled.img`
    width: 56px;
    height: 56px;
    position: absolute;
    border-radius: 100px;
    border: 1px solid #eeeef2;
  `,
  UserFlagImg: styled.img`
    width: 22px;
    height: 22px;
    position: absolute;
    border: 1px solid white;
    background-color: white;
    border-radius: 100px;
    right: 0;
    bottom: 0;
    @media (max-width: 500px) {
      top: 32px;
      left: 33px;
    }
  `,
  UserInfoBox: styled.div`
    // width: 340px;
    margin-left: 14px;
    height: 86px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  UserNicknameAndSex: styled.div`
    display: flex;
  `,
  UserSexImg: styled.img`
    width: 16px;
    height: 16px;
    padding-left: 4px;
    margin: 3px 0px;
  `,

  DropBubbleHigh: styled.div`
    position: absolute;
    top: 63px;
    left: 435px;
    border-bottom: 8px solid #303033;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  `,

  DropBubbleLow: styled.div`
    width: 153px;
    height: 42px;
    background-color: #303033;
    border-radius: 8px;
    position: absolute;
    top: 70px;
    left: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
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

  EditList: styled.div`
    //width: 452px;
    display: flex;
    flex-direction: column;
  `,
  Language: styled.div`
    //width: 452px;
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
    font-family: "Pretendard Variable", Pretendard;
    font-weight: ${(props): number => props.fontWeight};
  `,
  Introduce: styled.div`
    //width: 452px;
    display: flex;
    justify-content: space-between;
  `,
  IntroduceContent: styled.div`
    padding-top: 16px;
    font-size: 16px;
    line-height: 140%;
    color: ${({ theme }) => theme.color.gray900};
  `,
  InterestBoxContainer: styled.div`
    width: 80%;
  `,
  Interest: styled.div`
    //width: 452px;
    display: flex;
    justify-content: space-between;
  `,
  ShowInterest: styled.div`
    display: inline-flex;
    flex-direction: column;
  `,
  InterestBox: styled.div`
    cursor: pointer;
    border-radius: 40px;
    padding: 8px 15px;
    display: inline-flex;
    background-color: ${({ theme }) => theme.color.orange100};
    border: 1px solid ${({ theme }) => theme.color.orange300};
    margin: 8px 8px 0px 0px;
  `,

  Column: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Note: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 17px 16px;
    gap: 6px;
    position: fixed;
    width: 404px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 32px;
    cursor: pointer;

    /* main_orange/orange500 */
    background: #ff812e;
    border-radius: 8px;
    font-family: "Pretendard Variable", Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
  `,
};
