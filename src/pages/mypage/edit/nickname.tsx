import styled from "styled-components";
import router from "next/router";
import { Margin, Text } from "@/src/components/ui";
import { useState, useCallback, useEffect, useRef } from "react";
import Modal from "@/src/components/modal";
import instance from "@/src/api/axiosModule";
import { useRecoilValue }  from "recoil";
import { profileStateAtom } from "@/src/atoms/profileStateAtom";
import Loading from "@/src/components/ui/loadingUI";
import { countryImg } from "@/src/components/mypage/countryImg";

export default function Nickname() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState<string>("");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [isName, setIsName] = useState<boolean>(false);
  const [image,setImage] = useState<string>('');
  const [newImage,setNewImage] = useState<File>();
  const [loading,setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const profileData = useRecoilValue(profileStateAtom);

  useEffect(() => {
  if (profileData !== null && profileData !== undefined) {
    setName(profileData.nickname);
    setImage(profileData.image)
    setLoading(false);
  }
}, [profileData]);

  const onChangeName = useCallback((e: any) => {
    const nameRegex = /^[가-힣a-zA-Z]{2,10}$/;
    const nameCurrent = e.target.value;
    setName(nameCurrent);

    if (!nameRegex.test(nameCurrent)) {
      setNameMessage("한글/영어 2글자 이상 10글자 이하");
      setIsName(false);
    } else {
      setNameMessage("사용 가능한 형식입니다.");
      setIsName(true);
    }
  }, []);

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };
  
  // const onClickCamera = 
  const onClickComplete  = async (): Promise<void> => {
    if(isName) {
       try{
      const formData = new FormData();
      formData.append('nickname', name);
      if (newImage) formData.append('image',newImage);
      else {formData.append('image',image)}
      await instance.post("/profile",formData,{
        headers:
          {'Content-Type': 'multipart/form-data'}
      });
  
      } catch {
        console.log("변경 불가")
      }
      router.push(`/mypage/edit`)
  }
}
   
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const fileSizeInMB = imageFile.size / (1024 * 1024);
      if (fileSizeInMB > 20) {
        // 20MB 이하인 경우에만 처리
        setError(true);        
        return;
      }
      setError(false);
      setNewImage(imageFile);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <>
    <img src={countryImg("KR")}/>
    {loading ? <Loading /> : (
      <S.Wapper>
        <S.Content>
          <S.Header>
            <S.Left>
              <S.GoBackArrow
                src="/back-arrow.svg"
                alt="뒤로가기"
                onClick={onClickModal}
              />
              <Text.Title1 color="gray900">프로필 수정</Text.Title1>
            </S.Left>
            <Text.Body1
              color={isName ? "gray900":"gray500"} // 비활성화 상태
              onClick={onClickComplete}
              pointer={isName}
            >
              완료
            </Text.Body1>
          </S.Header>
          <>
            <S.ImageChangeBox onClick={handleUploadButtonClick}>
              <S.InputImage
          ref={fileInputRef}
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
              <S.ProfileImage src={image} alt="프로필 이미지" />
              <S.CameraIcon src="/mypage/camera.svg" alt="변경 아이콘"  />
              
            </S.ImageChangeBox>

            <S.NicknameChangeBox>
              <Text.Body5 color="gray700">닉네임</Text.Body5>{" "}
              <Margin direction="column" size={8} />
              <S.InputNickname
                placeholder={name}
                type="text"
                onChange={onChangeName}
              />
              {name.length > 0 && (
                <span className={`message ${isName ? "success" : "error"}`}>
                  {nameMessage}
                </span>
              )}
              <Margin direction="column" size={8} />
            </S.NicknameChangeBox>
          </>
        </S.Content>
        {modalVisible && (
          <Modal type="profile-back" onClickModal={onClickModal} />
        )}
      </S.Wapper>
      )}
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
  ImageChangeBox: styled.div`
    width: 88px;
    height: 88px;
    margin: 30px 0px;
    position: relative;
  `,
  ProfileImage: styled.img`
    width: 88px;
    height: 88px;
    position: absolute;
    border-radius: 100px;
    border: 1px solid #EEEEF2;
    cursor: pointer;
  `,
  CameraIcon: styled.img`
    width: 24px;
    height: 24px;
    border-radius: 100px;
    position: absolute;
    right: 0%;
    bottom: 0%;
    z-index: 0;
    cursor: pointer;
  `,
  NicknameChangeBox: styled.div`
    .message {
      font-weight: 400;
      font-size: 12px;
      line-height: 140%;
      &.success {
        color: #959599;
      }
      &.error {
        color: #ff2727;
      }
    }
  `,
  InputNickname: styled.input`
    width: 93%;
    height: 52px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
    padding: 0px 16px;
    margin-bottom: 8px;

    ::placeholder {
      color: #959599;
    }
    :focus {
      border: 1px solid #dcdce0;
    }
  `,
  InputImage : styled.input`
  display : none;

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
