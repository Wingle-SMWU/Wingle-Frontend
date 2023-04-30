import styled from "styled-components";
import router from "next/router";
import { Margin, Text } from "@/src/components/ui";
import Modal from "@/src/components/modal";
import { useState,useEffect } from "react";
import instance from "@/src/api/axiosModule";
import SelectLanguageBox from "@/src/components/mypage/selectLanguage";
import DropDown from "@/src/components/ui/dropDownUI";

export default function Language() {
  const [modalVisible, setModalVisible] = useState(false);
  const [language,setLanguage] = useState(Array<String>);

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  const postLanguage = async (): Promise<void> => {
      const response = await instance.post("/profile/languages", {
        "languages": language
      });
      
      router.push(`/mypage/edit`)
  };
  
  const getLanguage = (str:any) => {
    setLanguage([...language,str].filter(v=>v!==''));
  }
  useEffect(() => {
    language
  },[language])

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
              color="gray500" // 비활성화 상태
              // 활성화 상태에서는 color="gray900"
              onClick={postLanguage}
              pointer
            >
              완료
            </Text.Body1>
          </S.Header>
          <S.SelectBox>
            <Text.Body5 color="gray700">1순위</Text.Body5>
            <Margin direction="column" size={8} />
            <SelectLanguageBox getLanguage={getLanguage}/>

            <Margin direction="column" size={24} />
            <Text.Body5 color="gray700">2순위</Text.Body5>
            <Margin direction="column" size={8} />
            <SelectLanguageBox getLanguage={getLanguage}/>

            <Margin direction="column" size={24} />
            <Text.Body5 color="gray700">3순위</Text.Body5>
            <Margin direction="column" size={8} />
            <SelectLanguageBox getLanguage={getLanguage}/>

          </S.SelectBox>
          <Margin direction="column" size={24} />
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
  `,
  ResetBtn: styled.button`
    width: 79px;
    height: 33px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
  `,
};