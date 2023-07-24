import styled from "styled-components";
import { useRouter } from "next/router";
import { Text } from "@/src/components/ui";
import Modal from "@/src/components/modal";
import { useState, useCallback, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";
import { postIntroduce } from "@/src/api/mypage/profileData";
import Loading from "@/src/components/ui/loadingUI";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "react-i18next";

export const getStaticProps: GetStaticProps = async ({
  locale = "en" || "ko",
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["profile"])),
    },
  };
};

export default function Introduce(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [isIntroduce, setIsIntroduce] = useState(false);
  const [introduce, setIntroduce] = useState("");
  const [textCount, setTextCount] = useState(0);

  const { profileData, isLoading } = useGetProfile();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const onChangeIntroduce = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const nameCurrent = e.target.value;
      setIntroduce(nameCurrent);
    },
    []
  );

  useEffect(() => {
    if (profileData?.introduce && profileData?.introduce.length) {
      setTextCount(profileData.introduce.length);
      setIntroduce(profileData.introduce);
    }
  }, [isLoading]);

  useEffect(() => {
    setTextCount(introduce.length);
    if (introduce.length < 2 || introduce.length > 400) {
      setIsIntroduce(false);
    } else if (introduce !== profileData?.introduce) {
      setIsIntroduce(true);
    }
  }, [introduce]);

  const onClickModal = (): void => {
    setModalVisible((prev) => !prev);
  };

  const fetchIntroduce = useMutation(postIntroduce, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });

  const handleSubmit = (): void => {
    fetchIntroduce.mutate(introduce);
    router.push(`/mypage/edit`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <S.Wrapper>
        <S.Content>
          <S.Header>
            <S.Left>
              <S.GoBackArrow
                src="/back-arrow.svg"
                alt="뒤로가기"
                onClick={onClickModal}
              />
              <Text.Title1 color="gray900">
                {t("profile:edit.introduction.head")}
              </Text.Title1>
            </S.Left>
            <Text.Body1
              color={isIntroduce ? "gray900" : "gray500"} // 비활성화 상태
              onClick={handleSubmit}
              pointer={isIntroduce}
            >
              {t("profile:edit.done")}
            </Text.Body1>
          </S.Header>

          <S.Description
            maxLength={400}
            placeholder={t("profile:edit.introduction.helptext")}
            defaultValue={introduce}
            onChange={onChangeIntroduce}
          />
          <S.TextCount>{textCount}/400</S.TextCount>
        </S.Content>

        {modalVisible && (
          <Modal type="profile-back" onClickModal={onClickModal} />
        )}
      </S.Wrapper>
    </>
  );
}

const S = {
  Wrapper: styled.div`
    @media (min-width: 501px) {
      width: 500px;
    }
    @media (max-width: 500px) {
      width: 100vw;
    }
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  Content: styled.div`
    padding: 0 24px;
  `,
  Header: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 14px 0;
  `,
  Left: styled.div``,
  GoBackArrow: styled.img`
    margin-right: 12px;
    cursor: pointer;
  `,

  Description: styled.textarea`
    font-family: "Pretendard Variable", Pretendard;
    width: 100%;
    min-height: 250px;
    border: 1px solid white;
    font-size: 16px;
    color: #222223;
    outline: none;
    resize: none;
    display: flex;
    justify-content: center;

    ::placeholder {
      font-weight: 400;
      color: gray;
    }
  `,
  TextCount: styled.div`
    position: fixed;
    bottom: 40px;
    @media (min-width: 501px) {
      left: calc(50vw + 250px - 54.04px);
    }
    @media (max-width: 500px) {
      left: calc(100vw - 48px);
    }

    font-size: 12px;
    color: #959599;
  `,
};
