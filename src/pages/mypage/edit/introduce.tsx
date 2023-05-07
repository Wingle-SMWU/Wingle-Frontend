import styled from "styled-components";
import router from "next/router";
import { Text } from "@/src/components/ui";
import Modal from "@/src/components/modal";
import { useState,useCallback,useEffect } from "react";
import { useMutation,useQueryClient } from "react-query";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";
import { postIntroduce } from "@/src/api/mypage/profileData";

export default function Introduce() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isIntroduce,setIsIntroduce] = useState(false);
  const [introduce,setIntroduce] = useState('');

  const queryClient = useQueryClient();

  const onChangeIntroduce = useCallback((e: any) => {
    const nameCurrent = e.target.value;
    setIntroduce(nameCurrent);
  }, []);

   const { profileData } = useGetProfile();

  useEffect(() => {
    if (introduce.length < 2 || introduce.length > 400) {
      setIsIntroduce(false)
    } else {
      setIsIntroduce(true);
    }
  }, [introduce]);

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };


  const fetchIntroduce = useMutation(postIntroduce,{
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  })

  const handleSubmit= () => {
    fetchIntroduce.mutate(introduce);
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
              <Text.Title1 color="gray900">자기소개</Text.Title1>
            </S.Left>
            <Text.Body1
              color={isIntroduce ? "gray900":"gray500"} // 비활성화 상태
              onClick={handleSubmit} 
              pointer={isIntroduce}
            >
              완료
            </Text.Body1>
          </S.Header>

          <S.Description
            maxLength={400}
            placeholder="자기소개를 작성해주세요! (최대 400자)"
            onChange={onChangeIntroduce}
            defaultValue={profileData && profileData.introduce}
          />
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
    font-family: pretendard;
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
};