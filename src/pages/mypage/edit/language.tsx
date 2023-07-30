import styled from "styled-components";
import router from "next/router";
import { Margin, Text } from "@/src/components/ui";
import Modal from "@/src/components/modal";
import { useState, useEffect } from "react";
import SelectLanguageBox from "@/src/components/mypage/selectLanguage";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";
import { LanguagesType } from "@/src/types/mypage/profileType";
import Loading from "@/src/components/ui/loadingUI";
import { postLanguage } from "@/src/api/mypage/profileData";
import { useMutation, useQueryClient } from "react-query";
import { theme } from "@/src/styles/theme";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "react-i18next";
import DropDownCommon from "@/src/components/ui/dropDownUI";
import { languageList } from "@/src/constants/languageList";

export const getStaticProps: GetStaticProps = async ({
  locale = "en" || "ko",
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["profile"])),
    },
  };
};

export default function Language(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [languageArr, setLanguageArr] = useState<string[]>([""]);
  const [initialLanguage, setInitialLanguage] = useState<LanguagesType[]>([]);
  const [initialLanguageValue1, setInitialLanguageValue1] = useState("");
  const [initialLanguageValue2, setInitialLanguageValue2] = useState("");
  const [initialLanguageValue3, setInitialLanguageValue3] = useState("");

  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { profileData } = useGetProfile();

  const onClickModal = (): void => {
    setModalVisible((prev) => !prev);
  };

  const handleSubmit = (): void => {
    fetchLanguage.mutate(languageArr);
    router.push(`/mypage/edit`);
  };

  const fetchLanguage = useMutation(postLanguage, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });

  const getLanguageAtIndex = (str: string, index: number): void => {
    setLanguageArr((prevLanguage) => {
      const updatedLanguage = [...prevLanguage];
      updatedLanguage[index] = str;
      return updatedLanguage;
    });
  };

  const resetBtn = (): void => {
    setLanguageArr([""]);
    setBtnActive(false);
    for (let i = 0; i < 3; i++) {
      const setInitialLanguageValue = eval(`setInitialLanguageValue${i + 1}`);
      if (profileData && profileData.languages[i]) {
        setInitialLanguageValue("");
      } else {
        break;
      }
    }
  };

  const handleChange1 = (selectedLanguage: string): void => {
    setInitialLanguageValue1(selectedLanguage);
    getLanguageAtIndex(selectedLanguage, 0);
  };
  const handleChange2 = (selectedLanguage: string): void => {
    setInitialLanguageValue2(selectedLanguage);
    getLanguageAtIndex(selectedLanguage, 1);
  };
  const handleChange3 = (selectedLanguage: string): void => {
    setInitialLanguageValue3(selectedLanguage);
    getLanguageAtIndex(selectedLanguage, 2);
  };

  const isSameArray = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.filter((v) => v !== "").length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2.filter((v) => v !== "")[i]) return false;
    }
    return true;
  };

  useEffect(() => {
    if (profileData) {
      if (
        !isSameArray(
          profileData.languages.map((v) => v.language),
          languageArr
        )
      ) {
        if (languageArr[0] != "") {
          setBtnActive(true);
        }
      } else {
        setBtnActive(false);
        setInitialLanguageFn(initialLanguage);
      }
    } else {
      if (languageArr && languageArr[0]) {
        setBtnActive(true);
      }
    }
  }, [languageArr]);

  useEffect(() => {
    if (profileData) {
      setInitialLanguage(profileData.languages);
      setLanguageArr(profileData.languages.map((v) => v.language));
    }
  }, [profileData]);

  const setInitialLanguageFn = (initialLanguage: LanguagesType[]) => {
    for (let i = 0; i < 3; i++) {
      const setInitialLanguageValue = eval(`setInitialLanguageValue${i + 1}`);
      if (initialLanguage[i]) {
        setInitialLanguageValue(initialLanguage[i].language);
      } else {
        setInitialLanguageValue("");
      }
    }
  };
  useEffect(() => {
    setInitialLanguageFn(initialLanguage);
    setLoading(false);
  }, [initialLanguage]);

  if (loading) return <Loading />;

  return (
    <>
      <S.Wapper>
        <S.Content>
          <S.Header>
            <S.Left>
              <S.GoBackArrow
                src="/back-arrow.svg"
                alt="뒤로가기"
                onClick={onClickModal}
              />
              <Text.Title1 color="gray900">
                {t("profile:edit.language.head")}
              </Text.Title1>
            </S.Left>
            <Text.Body1
              color={btnActive ? "gray900" : "gray500"}
              onClick={
                btnActive
                  ? handleSubmit
                  : (): void => alert(`${t("profile:edit.language.caption")}`)
              }
              pointer={btnActive}
            >
              {t("profile:edit.done")}
            </Text.Body1>
          </S.Header>
          <S.SelectBox>
            <Text.Body5 color="gray700">
              {t("profile:edit.language.first")}
            </Text.Body5>
            <Margin direction="column" size={8} />
            <DropDownCommon
              list={languageList
                .filter(
                  (language) => language.languageList != initialLanguageValue1
                )
                .map((language) => language.languageList)}
              selected={
                initialLanguageValue1 ? initialLanguageValue1 : "언어선택"
              }
              handleSelectedChange={handleChange1}
              dropDownPlaceHolder={initialLanguageValue1}
            />

            <Margin direction="column" size={24} />
            <Text.Body5 color={languageArr[0] !== "" ? "gray700" : "gray500"}>
              {t("profile:edit.language.second")}
            </Text.Body5>
            <Margin direction="column" size={8} />
            <DropDownCommon
              list={languageList
                .filter(
                  (language) =>
                    language.languageList !== initialLanguageValue1 &&
                    language.languageList !== initialLanguageValue2
                )
                .map((language) => language.languageList)}
              selected={
                initialLanguageValue2 ? initialLanguageValue2 : "언어선택"
              }
              handleSelectedChange={handleChange2}
              dropDownPlaceHolder={initialLanguageValue2}
              disabled={initialLanguageValue1 == ""}
            />

            <Margin direction="column" size={24} />
            <Text.Body5 color={languageArr[1] !== "" ? "gray700" : "gray500"}>
              {t("profile:edit.language.third")}
            </Text.Body5>
            <Margin direction="column" size={8} />
            <DropDownCommon
              list={languageList
                .filter(
                  (language) =>
                    language.languageList !== initialLanguageValue1 &&
                    language.languageList !== initialLanguageValue2 &&
                    language.languageList !== initialLanguageValue3
                )
                .map((language) => language.languageList)}
              selected={
                initialLanguageValue3 ? initialLanguageValue3 : "언어선택"
              }
              handleSelectedChange={handleChange3}
              dropDownPlaceHolder={initialLanguageValue3}
              disabled={initialLanguageValue2 == ""}
            />
          </S.SelectBox>
          <S.ResetBox>
            <S.ResetBtnBox>
              <S.ResetBtn onClick={resetBtn}>선택 초기화</S.ResetBtn>
            </S.ResetBtnBox>
          </S.ResetBox>
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

  Header: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 14px 0;
  `,
  Content: styled.div`
    padding: 0 24px;
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
    margin-top: 50px;
  `,
  ResetBtnBox: styled.div`
    border: 1px solid ${theme.color.gray300};
    border-radius: 8px;
  `,
  ResetBtn: styled.button`
    padding: 8px 12px;
    font-size: 12px;
    font-family: "Pretendard Variable", Pretendard;
    font-style: normal;
    font-weight: 700;
    color: ${theme.color.gray700};
  `,
};
