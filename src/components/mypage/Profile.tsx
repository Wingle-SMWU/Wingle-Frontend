import styled from "styled-components";
import { Text } from "@/src/components/ui";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import instance from "@/src/api/axiosModul"

export default function Profile() {
    const router = useRouter();
    const [isRegisterBtnHover, setIsRegisterBtnHover] = useState(false);
    const [userData,setUserData] = useState({});

    const handleRegisterBtnHover = () => {
        setIsRegisterBtnHover(true);
    };
    const handleRegisterBtnLeave = () => {
        setIsRegisterBtnHover(false);
    };


    // async와 await를 이용한 useEffect()를 선언하기
    useEffect(()=>{
        async function getUserData() {
            const response = await instance.get("/profile");
        // 일단 response의 형태를 확인하고
            console.log(response.data);
            // fetch 함수 아래에 setUsers를 해주어야 한다.
            setUserData(response.data);
        };
        getUserData();

    }, [])


    const getProfile = async (): Promise<void> => {
    
        
        
            // const response = await  instance.get("/profile");
            // setUserData(response.data);

    };
    
    // const user = getProfile();
    // const getData = () => {
    //     user.then((data) => {
    //         setUserData(data);
    //     });
    // };
    
    // getData();
    // console.log(userData)


    
    
    return (
        <>
            <S.UserBox>
                <S.UserImgBox>
                    {/* @ts-ignore */}
                    <S.UserProfileImg src={userData.image} alt="프로필" />
                    <S.UserFlagImg src="" alt="국기" />
                </S.UserImgBox>
                <S.UserInfoBox>
                    <S.UserNicknameAndSex>
                        {/* @ts-ignore */}
                        <Text.Body1 color="gray900">{userData.nickname}</Text.Body1>
                        {/* @ts-ignore */}
                        <S.UserSexImg src={userData.gender?("/mypage/female.svg"):("/mypage/male.svg")} alt="성별" />
                    </S.UserNicknameAndSex>
                    {/* @ts-ignore */}
                    <Text.Body6 color="gray800">{userData.nation}</Text.Body6>
                </S.UserInfoBox>
            </S.UserBox>
        </>
    );
}

const S = {
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
        border: 1px solid #EEEEF2;
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