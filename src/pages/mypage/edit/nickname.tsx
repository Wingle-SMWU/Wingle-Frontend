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
import { getProfile } from "@/src/api/mypage/profileData";
import { checkNicknameAvailable } from "../../../api/auth/emailAPI";
import { theme } from "@/src/styles/theme";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "react-i18next";

export const getStaticProps: GetStaticProps = async ({
  locale = "en" || "ko",
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["profile"])),
    },
  };
};

export default function Nickname(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState<string>("");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [isName, setIsName] = useState<boolean>(false);
  const [fileError, setFileError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any>(null);
  const [imageDelete, setImageDelete] = useState(false);
  const [imageFile, setImageFile] = useState<any>(null);
  const [isImage, setIsImage] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const { mutate: updateMutation, isLoading: updateLoading } = useMutation(
    (updateData: ProfileUpdateType) => postUpdateProfile(updateData),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("profile");
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
        queryClient.invalidateQueries("profile");
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
    queryKey: ["profile"],
  });

  useEffect(() => {
    if (profileData) {
      setName(profileData.nickname);
      setIsName(false);
      setImage(profileData.image);
    }
  }, [profileData]);

  if (isLoading || updateLoading) return <Loading />;
  if (isError || isIdle) return <>에러</>;
  if (fileError) alert(`${t("profile:edit.profile.imgAlert")}`);

  const onChangeName = (e: any): void => {
    const nameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    const nameCurrent = e.target.value;

    if (nameCurrent === "") {
      setName(profileData.nickname);
      setIsName(false);
      setNameMessage("");
    } else if (!nameRegex.test(nameCurrent)) {
      setNameMessage(`${t("profile:edit.profile.caption-1")}`);
      setIsName(false);
    } else {
      setName(nameCurrent);
      checkNickname(nameCurrent);
    }
  };

  const onClickModal = (): void => {
    setModalVisible((prev) => !prev);
  };

  const onLoadFile = (e: any): Promise<void> => {
    const reader = new FileReader();
    reader.readAsDataURL(e);
    setIsImage(true);
    return new Promise<void>((resolve) => {
      reader.onload = (): void => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  const deleteFileImage = (): void => {
    URL.revokeObjectURL(image);
    setImage(null);
    setImageDelete(profileData.image !== null);
    setImageFile(null);
    setIsImage(false);
  };

  const handleFileUpload = (event: any): void => {
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

  const handleUploadButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  // 닉네임 중복 확인 기능
  const checkNickname = async (name: string): Promise<void> => {
    try {
      await checkNicknameAvailable(name);
      setNameMessage(`${t("profile:edit.profile.caption-2")}`);
      setIsName(true);
    } catch {
      setNameMessage(`${t("profile:edit.profile.caption-3")}`);
      setIsName(false);
    }
  };

  const onClickComplete = async (): Promise<void> => {
    if (name === "") {
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
              <Text.Title1 color="gray900">
                {t("profile:edit.profile.head")}
              </Text.Title1>
            </S.Left>
            <Text.Body1
              color={isName || isImage ? "gray900" : "gray500"} // 비활성화 상태
              onClick={onClickComplete}
              pointer={isName || isImage}
            >
              {t("profile:edit.done")}
            </Text.Body1>
          </S.Header>

          <>
            <S.ImageChangeBox onClick={handleUploadButtonClick}>
              <S.InputImage
                ref={fileInputRef}
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={(e): void => {
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
                onClick={(e): void => {
                  e.stopPropagation();
                  deleteFileImage();
                }}
              />
            </S.ImageChangeBox>

            <S.NicknameChangeBox>
              <Text.Body5 color="gray700">
                {t("profile:edit.profile.nickname")}
              </Text.Body5>{" "}
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
    @media (min-width: 501px) {
      width: 500px;
    }
    @media (max-width: 500px) {
      width: 100vw;
    }
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
    object-fit: cover;
    width: 88px;
    height: 88px;
    position: absolute;
    border-radius: 100px;
    border: 1px solid ${theme.color.gray200};
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
    display: ${({ cancel }): string => (cancel ? "auto" : "none")};
    width: 24px;
    height: 24px;
    border-radius: 100px;
    position: absolute;
    right: 0%;
    top: 0%;
    z-index: 0;
    cursor: pointer;
    background-color: ${theme.color.gray200};
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
    border: 1px solid ${theme.color.gray300};
    border-radius: 8px;
    padding: 0px 16px;
    margin-bottom: 8px;

    font-weight: 400;
    font-size: 16px;
    line-height: 140%;

    ::placeholder {
      color: ${theme.color.gray500};
    }
    :focus {
      border: 1px solid ${theme.color.gray300};
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
