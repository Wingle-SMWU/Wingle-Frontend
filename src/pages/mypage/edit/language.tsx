import styled from "styled-components";
import router from "next/router";
import { Margin, Text } from "@/src/components/ui";
import Modal from "@/src/components/modal";
import { useState,useEffect } from "react";
import instance from "@/src/api/axiosModule";
import SelectLanguageBox from "@/src/components/mypage/selectLanguage";
import { useRecoilValue } from "recoil";
import { profileStateAtom } from "@/src/atoms/profileStateAtom";
import { LanguagesType } from "@/src/types/mypage/profileType";
import Loading from "@/src/components/ui/loadingUI";

export default function Language() {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [language,setLanguage] = useState(Array<String>);
  const [initialLanguage, setInitialLanguage] = useState<LanguagesType[]>([]);
  const [initialLanguageValue1,setInitialLanguageValue1] = useState('');
  const [initialLanguageValue2,setInitialLanguageValue2] = useState('');
  const [initialLanguageValue3,setInitialLanguageValue3] = useState('');

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  const postLanguage = async (): Promise<void> => {
      const response = await instance.post("/profile/languages", {
        "languages": language
      });
      
      router.push(`/mypage/edit`)
  };
  
  const getLanguageAtIndex = (str: string, index: number) => {
    setLanguage((prevLanguage) => {
      const updatedLanguage = [...prevLanguage];
      updatedLanguage[index] = str;
      return updatedLanguage;
    });
};

  useEffect(() => {
    language
    console.log(language)
   if (language.length>0) setBtnActive(true)
  },[language])


  
  const profileData = useRecoilValue(profileStateAtom);

  useEffect(() => {
    setInitialLanguage(profileData.languages);
  }, []);


useEffect(() => {
  for (let i = 0; i < 3; i++) {
    if (initialLanguage[i]) {
      const setInitialLanguageValue = eval(`setInitialLanguageValue${i + 1}`);
      setInitialLanguageValue(initialLanguage[i].interest);
    } else {
      const setInitialLanguageValue = eval(`setInitialLanguageValue${i + 1}`);
      setInitialLanguageValue('');
    }
  }
  setLoading(false)
}, [initialLanguage]);

if (loading) return <Loading />

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
              <Text.Title1 color="gray900">사용 가능 언어</Text.Title1>
            </S.Left>
            <Text.Body1
              color={btnActive ? "gray900" : "gray500"}
              onClick={btnActive ? postLanguage : () => console.log("언어를 선택해주세요")}
              pointer
            >
              완료
            </Text.Body1>
          </S.Header>
          <S.SelectBox>
            <Text.Body5 color="gray700">1순위</Text.Body5>
            <Margin direction="column" size={8} />
            <SelectLanguageBox getLanguageAtIndex={(str) => getLanguageAtIndex(str, 0)} initialLanguage={initialLanguageValue1} idx={0}/>

            <Margin direction="column" size={24} />
            <Text.Body5 color="gray700">2순위</Text.Body5>
            <Margin direction="column" size={8} />
            <SelectLanguageBox getLanguageAtIndex={(str) => getLanguageAtIndex(str, 1)} initialLanguage={initialLanguageValue2} idx={1}/>

            <Margin direction="column" size={24} />
            <Text.Body5 color="gray700">3순위</Text.Body5>
            <Margin direction="column" size={8} />
            <SelectLanguageBox getLanguageAtIndex={(str) => getLanguageAtIndex(str, 2)} initialLanguage={initialLanguageValue3} idx={2} />
          </S.SelectBox>

          <S.ResetBox>
            <S.ResetBtn>
              <Text.Caption3 color="gray700" pointer>
                선택 초기화
              </Text.Caption3>
            </S.ResetBtn>
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
    width: 500px;
    min-width: 360px;
    height: 100%;
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
    margin-top : 50px;
  `,
  ResetBtn: styled.button`
    width: 79px;
    height: 33px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
  `,
};