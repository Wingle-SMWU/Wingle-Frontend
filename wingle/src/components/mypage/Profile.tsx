import styled from "styled-components";
import { Text } from "@/src/components/ui";
import { useRouter } from "next/router";
import { useState } from "react";

const Style = {
    UserBox: styled.div`
        display: flex;
        align-items: center;
        /* border-bottom: 1px solid #eeeef2; */
        gap: 14px;
        position: relative;
    `,
    UserImgBox: styled.div`
        width: 56px;
        height: 56px;
        position: relative;
    `,
    UserProfileImg: styled.img`
        width: 56px;
        height: 56px;
        position: absolute;
        border-radius: 100px;
        border: 1px solid red;
    `,
    UserFlagImg: styled.img`
        width: 22px;
        height: 22px;
        position: absolute;
        border: 1px solid black;
        background-color: black;
        border-radius: 100px;
        right: 0%;
        bottom: 0%;
        z-index: 1;
    `,
    UserInfoBox: styled.div`
        width: 340px;
        height: 86px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    `,
    UserNicknameAndSex: styled.div`
        display: flex;
    `,
    UserSexImg: styled.img``,

    DropBubbleHigh: styled.div`
        position: absolute;
        top: 63px;
        left: 435px;
        border-bottom: 8px solid #303033;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
    `,

    DropBubbleLow: styled.div`
        width: 153px;
        height: 42px;
        background-color: #303033;
        border-radius: 8px;
        position: absolute;
        top: 70px;
        left: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
};

export default function Profile() {
    const router = useRouter();
    const [isRegisterBtnHover, setIsRegisterBtnHover] = useState(false);

    const handleRegisterBtnHover = () => {
        setIsRegisterBtnHover(true);
    };
    const handleRegisterBtnLeave = () => {
        setIsRegisterBtnHover(false);
    };
    return (
        <>
            <Style.UserBox>
                <Style.UserImgBox>
                    <Style.UserProfileImg src="" alt="프로필" />
                    <Style.UserFlagImg src="" alt="국기" />
                </Style.UserImgBox>
                <Style.UserInfoBox>
                    <Style.UserNicknameAndSex>
                        <Text.Body1 color="gray900">닉네임</Text.Body1>
                        {/* {gender ? 여자 이미지 : 남자 이미지} */}
                        <Style.UserSexImg src="" alt="성별" />
                    </Style.UserNicknameAndSex>
                    <Text.Body6 color="gray800">국적</Text.Body6>
                </Style.UserInfoBox>
            </Style.UserBox>
        </>
    );
}
