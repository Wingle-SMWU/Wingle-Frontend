import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, Margin } from "@/src/components/ui";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { useTranslation } from "next-i18next";

export default function GenderSelectBox(): JSX.Element {
  const [gender, setGender] = useState(true);
  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);
  const { t } = useTranslation();

  useEffect(() => {
    setSignUpFormData((prev) => ({
      ...prev,
      gender,
    }));
  }, [gender]);

  return (
    <>
      <Text.Body1 color="gray700">{t("auth:title.gender")}</Text.Body1>
      <S.Wrapper>
        <Margin direction="column" size={9} />
        <S.GenderWrapper
          onClick={(): void => {
            setGender(true);
          }}
        >
          <Image
            alt="isSelect"
            src={gender ? "/auth/normal.svg" : "/auth/disable.svg"}
            width={20}
            height={20}
          />
          <Margin direction="row" size={8} />
          <Text.Body3 color="gray900">{t("auth:title.gender-f")}</Text.Body3>
        </S.GenderWrapper>
        <S.GenderWrapper
          onClick={(): void => {
            setGender(false);
          }}
        >
          <Image
            alt="isSelect"
            src={!gender ? "/auth/normal.svg" : "/auth/disable.svg"}
            width={20}
            height={20}
          />
          <Margin direction="row" size={8} />
          <Text.Body3 color="gray900">{t("auth:title.gender-m")}</Text.Body3>
        </S.GenderWrapper>
      </S.Wrapper>
    </>
  );
}

const S = {
  Wrapper: styled.div`
    display: flex;
    margin-top: 9px;
    margin-bottom: 24px;
  `,
  GenderWrapper: styled.div`
    display: flex;
    text-align: center;
    margin-right: 24px;
    cursor: pointer;
  `,
};
