import React from "react";
import styled from "styled-components";
import { Margin, Text } from "@/src/components/ui";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({
  locale = "en" || "ko",
}) => {
  return { props: { ...(await serverSideTranslations(locale, ["complete"])) } };
};

export default function SignupComplete(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <S.Wrapper>
        <Text.Body5 color="orange500">{t("complete:notice")}</Text.Body5>
        <Margin direction="column" size={8} />
        <S.TitleWrapper>{t("complete:title-1")}</S.TitleWrapper>
        <S.TitleWrapper>{t("complete:title-2")}</S.TitleWrapper>
        <Margin direction="column" size={8} />
        <S.ContentWrapper>{t("complete:caption-1")}</S.ContentWrapper>
        <S.ContentWrapper>{t("complete:caption-2")}</S.ContentWrapper>
        <Margin direction="column" size={77} />

        <S.IMGWrapper href={"/auth/login"}>
          <Image
            src="/auth/completed.svg"
            width={274}
            height={274}
            alt="완료 이미지"
          />
        </S.IMGWrapper>
      </S.Wrapper>
    </>
  );
}

const S = {
  Wrapper: styled.div`
    padding-left: 24px;
    padding-right: 38px;
    padding-top: 60px;
  `,
  TitleWrapper: styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 33.6px;
  `,
  ContentWrapper: styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 19.6px;
    color: #6c6c70;
  `,
  IMGWrapper: styled(Link)`
    width: 100%;
    display: flex;
    justify-content: right;
  `,
};
