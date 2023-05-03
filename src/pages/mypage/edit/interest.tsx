import styled from "styled-components";
import router from "next/router";
import { Text } from "@/src/components/ui";
import SelectInterest from "@/src/components/mypage/SelectInterest";
import { useState } from "react";
import Modal from "@/src/components/modal";
import instance from "@/src/api/axiosModule";
import { useRecoilValue }  from "recoil";
import { profileStateAtom } from "@/src/atoms/profileStateAtom";

export default function Interest() {
  const [modalVisible, setModalVisible] = useState(false);
  const [interest,setInterest] = useState(false);

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  const parentFunction = (arr:any) => {
    setInterest(arr);
  };

  const handleSubmit = async () => {
    try{
      await instance.post("/profile/interests", {
      "interests": interest
      });
    } catch {
      console.log("error")
    }

    router.push(`/mypage/edit`)
  }

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
              <Text.Title1 color="gray900">관심사</Text.Title1>
            </S.Left>
            <Text.Body1
              color="gray900" // 활성화 상태
              // 비활성화 상태에서는 color="gray500"
              onClick={handleSubmit}
              pointer
            >
              완료
            </Text.Body1>
          </S.Header>
          <SelectInterest parentFunction={parentFunction}/>
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
    width: 100%;
    height: 100%;
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
};

