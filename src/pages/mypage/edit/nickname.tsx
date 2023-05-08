import styled from "styled-components";
import router from "next/router";
import { Margin, Text } from "@/src/components/ui";
import { useState, useEffect, useRef } from "react";
import Modal from "@/src/components/modal";
import Loading from "@/src/components/ui/loadingUI";
import { getImageUrl } from "@/src/modules/utils";
import { ProfileUpdateType } from "@/src/types/mypage/profileType";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { postUpdateProfile } from "@/src/api/mypage/updateProfile";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";

export default function Nickname() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState<string>("");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [isName, setIsName] = useState<boolean>(false);
  const [fileError, setFileError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any>(null);
  const [imageDelete, setImageDelete] = useState(false);
  const [imageFile, setImageFile] = useState<any>(null);

  const queryClient = useQueryClient();

  const { mutate: updateMutation, isLoading: updateLoading } = useMutation(
    (updateData: ProfileUpdateType) => postUpdateProfile(updateData),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("profileData");
        await queryClient.cancelQueries("articles");
        const prevProfileData = queryClient.getQueryData([
          "profileData",
          {
            exact: false,
          },
        ]);
        return { prevProfileData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries("profileData");
        queryClient.invalidateQueries("articles");
        router.push("/mypage/edit");
      },
    }
  );

  const {
    data: profileData,
    isLoading,
    isError,
    isIdle,
  } = useQuery({
    queryFn: getProfile,
    queryKey: ["profileData"],
  });

  const { profileData, isLoading, isError, isIdle } = useGetProfile();

  const queryClient = useQueryClient();

  const { mutate: updateMutation, isLoading: updateLoading } = useMutation(
    (updateData: ProfileUpdateType) => postUpdateProfile(updateData),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("profile");
        const prevProfileData = queryClient.getQueryData([
          "profileData",
          {
            exact: false,
          },
        ]);
        return { prevProfileData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
        router.push("/mypage/edit");
      },
    }
  );

 
  useEffect(() => {
    if (profileData) {
      setName(profileData.nickname);
      setIsName(true);
      setImage(profileData.image);
    }
  }, [profileData]);

  if (isLoading || updateLoading) return <Loading />;
  if (isError || isIdle) return <>에러</>;
  if (fileError) alert("업로드 가능한 이미지 크기 제한을 초과했습니다.");
  if (profileData === null && profileData === undefined) return <Loading />;

  const onChangeName = (e: any) => {
    const nameRegex = /^[가-힣a-zA-Z]{2,10}$/;
    const nameCurrent = e.target.value;
    if (nameCurrent === "" && profileData) {
      setName(profileData.nickname);
      setIsName(true);
      setNameMessage("");
    } else if (!nameRegex.test(nameCurrent)) {
      setNameMessage("한글/영어 2글자 이상 10글자 이하");
      setIsName(false);
    } else if (nameRegex) {
      setNameMessage("사용 가능한 형식입니다.");
      setName(nameCurrent);
      setIsName(true);
    }
  };

  const onClickModal = () => {
    setModalVisible((prev) => !prev);
  };

  const onLoadFile = (e: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(e);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(image);
    setImage(null);
    if (profileData) setImageDelete(profileData.image !== null);
    setImageFile(null);
  };

  const handleFileUpload = (event: any) => {
    const imageFile = event.target.files?.[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    setImageFile(formData);
    if (imageFile) {
      const fileSizeInMB = imageFile.size / (1024 * 1024);
      if (fileSizeInMB > 20) {
        // 20MB 이하인 경우에만 처리
        setFileError(true);
        return;
      }
      setFileError(false);
      setImage(imageFile);
      setImageDelete(false);
      onLoadFile(imageFile);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onClickComplete = async () => {
    if (!isName) return;
    if (name === "" && profileData ) {
      setName(profileData.nickname);
    }
    const formData = new FormData();
    formData.append("image", image);
    updateMutation({
      image: imageFile,
      nickname: name,
      imageDelete: imageDelete,
    });
  };

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
              <Text.Title1 color="gray900">프로필 수정</Text.Title1>
            </S.Left>
            <Text.Body1
              color={isName ? "gray900" : "gray500"} // 비활성화 상태
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
                onChange={(e) => {
                  handleFileUpload(e);
                }}
                style={{ display: "none" }}
              />
              <S.ProfileImage
                src={image ? image : getImageUrl("기본")}
                alt="프로필 이미지"
              />
              <S.CameraIcon src="/mypage/camera.svg" alt="변경 아이콘" />
              <S.CloseIcon
                cancel={image}
                src="/mypage/cancel.png"
                alt="변경 아이콘"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFileImage();
                }}
              />
            </S.ImageChangeBox>

            <S.NicknameChangeBox>
              <Text.Body5 color="gray700">닉네임</Text.Body5>{" "}
              <Margin direction="column" size={8} />
              <S.InputNickname
                placeholder={profileData.nickname}
                type="text"
                onChange={onChangeName}
              />
              {nameMessage && (
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
    border: 1px solid #eeeef2;
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
  CloseIcon: styled.img<{ cancel: boolean }>`
    display: ${({ cancel }) => (cancel ? "auto" : "none")};
    width: 24px;
    height: 24px;
    border-radius: 100px;
    position: absolute;
    right: 0%;
    top: 0%;
    z-index: 0;
    cursor: pointer;
    background-color: #eeeef2;
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
  InputImage: styled.input`
    display: none;
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
