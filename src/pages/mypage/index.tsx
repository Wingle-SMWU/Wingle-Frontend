import Footer from "@/src/components/layout/Footer";
import Navigation from "@/src/components/layout/Navigation";
import Profile from "@/src/components/mypage/Profile";
import { Text, Margin } from "@/src/components/ui";
import router from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Loading from "@/src/components/ui/loadingUI";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";
import Link from "next/link";
import { theme } from "@/src/styles/theme";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({
  locale = "en" || "ko",
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["myPage", "footer", "navbar"])),
    },
  };
};

export default function Mypage(): JSX.Element {
  const { t } = useTranslation();

  const [editText, setEditText] = useState(true);
  const [isRegisterDropVisible, setIsRegisterDropVisible] = useState(false);

  const { profileData, isLoading, isError } = useGetProfile();

  useEffect(() => {
    if (
      profileData &&
      (profileData.interests.length ||
        profileData.introduce ||
        profileData.languages.length)
    ) {
      setEditText(false);
    }
  }, [profileData]);

  const handleLogout = (): void => {
    localStorage.clear();
    router.push("/auth/login");
  };

  if (isLoading) return <Loading />;
  if (isError) return <>에러</>;

  return (
    <>
      <S.Wrapper>
        <S.Header>
          <Text.Title1 color="gray900">{t("myPage:head")}</Text.Title1>
        </S.Header>
        <S.Content>
          <S.Profile>
            <Profile />
            {editText ? (
              <S.EditBtn
                Color="#FF812E"
                onClick={(): Promise<boolean> => router.push(`/mypage/edit`)}
              >
                <Text.Caption1
                  color="white"
                  pointer
                  onMouseEnter={(): void => setIsRegisterDropVisible(true)}
                  onMouseLeave={(): void => setIsRegisterDropVisible(false)}
                >
                  {t("myPage:register")}
                </Text.Caption1>
                {isRegisterDropVisible && (
                  <S.RegisterDrop>
                    <Text.Body2 color="white">
                      {t("myPage:profileNotice")}
                    </Text.Body2>
                  </S.RegisterDrop>
                )}
              </S.EditBtn>
            ) : (
              <S.EditBtn
                onClick={(): Promise<boolean> => router.push(`/mypage/edit`)}
              >
                <Text.Caption1 color="gray700" pointer>
                  {t("myPage:edit")}
                </Text.Caption1>
              </S.EditBtn>
            )}
          </S.Profile>
          <>
            <Margin direction="column" size={34} />

            <Text.Body1
              color="gray900"
              pointer
              onClick={(): Promise<boolean> => router.push(`/mypage/postList`)}
            >
              {t("myPage:mypost")}
            </Text.Body1>
            <Margin direction="column" size={34} />
            <Text.Body1 color="gray900" pointer>
              <Link
                href="https://answer.moaform.com/answers/EAP2m0"
                style={{ textDecoration: "none", color: theme.color.gray900 }}
              >
                {t("myPage:feedback")}
              </Link>
            </Text.Body1>
            <Margin direction="column" size={34} />
            <Text.Body1 color="gray900" pointer>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSea_bxSSn0xd6gex-z61NaQhx7En29ZIuia3OTjqwz_MwgcfA/viewform?pli=1"
                style={{ textDecoration: "none", color: theme.color.gray900 }}
              >
                {t("myPage:report")}
              </Link>
            </Text.Body1>
            <Margin direction="column" size={34} />
            <Text.Body1 color="gray900" pointer onClick={handleLogout}>
              {t("myPage:logout")}
            </Text.Body1>
          </>
        </S.Content>
        <Footer />
        <Navigation tab={"mypage"} />
      </S.Wrapper>
    </>
  );
}

interface EditBtnProps {
  Color?: string;
}

const S = {
  Wrapper: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    @media (min-width: 501px) {
      width: 500px;
      margin: 0 auto; /* Center align when width is 500px or more */
    }
    @media (max-width: 500px) {
      width: 100vw;
      background-color: white;
    }
  `,
  Content: styled.div`
    overflow-y: scroll;
    height: calc(100% - 56px); /* Subtract the height of the header */
    padding: 0 24px;
    margin-top: 56px;
    @media (max-width: 500px) {
      background-color: white;
    }
  `,
  Header: styled.div`
    background-color: white;
    max-width: 452px;
    height: 28px;
    position: fixed;
    z-index: 1;
    @media (min-width: 501px) {
      width: 100%;
    }
    @media (max-width: 500px) {
      width: calc(100vw - 48px);
    }
    padding: 14px 24px;
  `,
  Profile: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #eeeef2;
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
  EditBtn: styled.button<EditBtnProps>`
    @media (min-width: 501px) {
      margin-top: 24px;
    }
    width: 79px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props): string => props.Color || "#6c6c70"};
    background-color: ${(props): string => props.Color || "white"};
    border-radius: 8px;
    @media (max-width: 500px) {
      margin-top: 27px;
    }
  `,

  RegisterDrop: styled.div`
    position: absolute;
    background-color: black;
    padding: 6px 12px;
    border-radius: 4px;
    @media (max-width: 500px) {
      top: 14%;
      left: 52%;
    }
    @media (min-width: 501px) {
      top: 14%;
      left: 58%;
    }
    top: 14%;
    left: 50%;
    font-size: 14px;
    white-space: nowrap;
    font-size: 12px;

    &:after {
      content: "";
      position: absolute;
      top: -8px;
      right: 10px;
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 8px solid black;
    }
  `,
};
