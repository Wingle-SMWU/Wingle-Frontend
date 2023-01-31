import styled from "styled-components";
import router from "next/router";
import { Margin, Text } from "@/src/components/ui";
import { useState } from "react";
import Modal from "@/src/components/modal";

const Style = {
    Wapper: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* border: 1px solid red; */
    `,
    Content: styled.div`
        padding: 24px;
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
        border: 1px solid red;
        background-color: red;
    `,
    CameraIcon: styled.img`
        width: 24px;
        height: 24px;
        border-radius: 100px;
        position: absolute;
        right: 0%;
        bottom: 0%;
        z-index: 0;
    `,
    NicknameChangeBox: styled.div``,
    InputNickname: styled.input`
        width: 100%;
        height: 52px;
        border: 1px solid #dcdce0;
        border-radius: 8px;
        padding-left: 16px;
        ::placeholder {
            color: #959599;
        }
    `,
    Header: styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    `,
    Left: styled.div``,
    GoBackArrow: styled.img`
        margin-right: 12px;
        cursor: pointer;
    `,
};

export default function Nickname() {
    const [modalVisible, setModalVisible] = useState(false);

    const onClickModal = () => {
        setModalVisible(prev => !prev);
    };
    return (
        <>
            <Style.Wapper>
                <Style.Content>
                    <Style.Header>
                        <Style.Left>
                            <Style.GoBackArrow src="/back-arrow.svg" alt="뒤로가기" onClick={onClickModal} />
                            <Text.Title1 color="gray900">프로필 수정</Text.Title1>
                        </Style.Left>
                        <Text.Body1
                            color="gray500" // 비활성화 상태
                            // 활성화 상태에서는 color="gray900"
                            onClick={() => router.push(`/mypage/edit`)}
                            pointer
                        >
                            완료
                        </Text.Body1>
                    </Style.Header>
                    <>
                        <Style.ImageChangeBox>
                            <Style.ProfileImage src="" alt="프로필 이미지" />
                            <Style.CameraIcon src="/mypage/camera.svg" alt="변경 아이콘" />
                        </Style.ImageChangeBox>

                        <Style.NicknameChangeBox>
                            <Text.Body5 color="gray700">닉네임</Text.Body5> <Margin direction="column" size={8} />
                            <Style.InputNickname placeholder="기존 닉네임" />
                            {/** 기존 닉네임 자리에 {nickname} */}
                            <Margin direction="column" size={8} />
                            <Text.Caption3 color="gray900">한글/영어 2글자 이상 10글자 이하</Text.Caption3>
                        </Style.NicknameChangeBox>
                    </>
                </Style.Content>
                {modalVisible && <Modal type="profile-back" onClickModal={onClickModal} />}
            </Style.Wapper>
        </>
    );
}
