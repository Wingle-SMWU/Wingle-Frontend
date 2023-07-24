import styled from "styled-components";
import router from "next/router";
import { Text } from "@/src/components/ui";
import SelectInterest from "@/src/components/mypage/SelectInterest";
import { useState, useEffect } from "react";
import Modal from "@/src/components/modal";
import { useMutation, useQueryClient } from "react-query";
import { postInterest } from "@/src/api/mypage/profileData";
import useGetProfile from "../../../hooks/mypage/useGetProfile";
import Loading from "@/src/components/ui/loadingUI";

export default function Interest(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [interest, setInterest] = useState<string[]>([]);
  const [isModified, setIsModified] = useState<boolean>(false);

  const { profileData, isLoading } = useGetProfile();
  const registeredInterest = profileData?.interests;

  const queryClient = useQueryClient();

  const onClickModal = (): void => {
    setModalVisible((prev) => !prev);
  };

  useEffect(() => {
    if (profileData?.interests) {
      setInterest(profileData.interests);
    }
  }, [profileData]);

  useEffect(() => {
    if (registeredInterest && !checkSameArray(registeredInterest, interest)) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [interest]);

  const checkSameArray = (arr1: string[], arr2: string[]): boolean => {
    const set = new Set(arr2);

    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((element) => set.has(element));
  };

  const parentFunction = (arr: any): void => {
    setInterest(arr);
  };

  const fetchInterest = useMutation(postInterest, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });

  const handleSubmit = async (): Promise<void> => {
    fetchInterest.mutate(interest);
    router.push(`/mypage/edit`);
  };

  if (isLoading) return <Loading />;

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
              color={isModified ? "gray900" : "gray500"}
              onClick={handleSubmit}
              pointer={isModified}
            >
              완료
            </Text.Body1>
          </S.Header>
          <SelectInterest parentFunction={parentFunction} />
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
