import Modal from "@/src/components/modal";
import Profile from "@/src/components/mypage/Profile";
import { Text, Margin } from "@/src/components/ui";
import router from "next/router";
import { useState } from "react";
import styled from "styled-components";

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
    Header: styled.div`
        width: 100%;
        height: 56px;
    `,
    GoBackArrow: styled.img`
        margin-right: 12px;
        cursor: pointer;
    `,

    UserBox: styled.div`
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeef2;
        gap: 14px;
        position: relative;
    `,
    UserImgBox: styled.div`
        width: 56px;
        height: 56px;
        border: 1px solid green;
    `,
    UserProfileImg: styled.img`
        border: 1px solid #eeeef2;
    `,
    UserFlagImg: styled.img``,
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
    RegisterBtn: styled.button`
        width: 45px;
        height: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ff812e;
        border-radius: 8px;
    `,
    EditBtn: styled.img`
        width: 24px;
        height: 24px;
        border-radius: 18px;
        cursor: pointer;
    `,
    EditList: styled.div`
        width: 452px;
        display: flex;
        flex-direction: column;
    `,
    Language: styled.div`
        width: 452px;
        display: flex;
        justify-content: space-between;
        /* border: 1px solid blue; */
    `,
    Introduce: styled.div`
        width: 452px;
        display: flex;
        justify-content: space-between;
        /* border: 1px solid blue; */
    `,
    Interest: styled.div`
        width: 452px;
        display: flex;
        justify-content: space-between;
        /* border: 1px solid blue; */
    `,
};
export default function Edit() {
    const [modalVisible, setModalVisible] = useState(false);

    const onClickModal = () => {
        setModalVisible(prev => !prev);
    };
    return (
        <>
            <Style.Wapper>
                <Style.Content>
                    <Style.Header>
                        <Style.GoBackArrow
                            src="/back-arrow.svg"
                            alt="뒤로가기"
                            onClick={() => router.push(`/mypage`)}
                        />
                        <Text.Title1 color="gray900">프로필 수정</Text.Title1>
                    </Style.Header>
                    <>
                        <Style.UserBox>
                            <Profile />

                            <Style.EditBtn
                                src="/modify.svg"
                                alt="연필"
                                onClick={() => router.push(`/mypage/edit/nickname`)}
                            />
                        </Style.UserBox>
                    </>

                    <Style.EditList>
                        <Margin direction="column" size={32} />
                        <Style.Language>
                            <Text.Body1 color="gray900">사용 가능 언어</Text.Body1>
                            <Style.EditBtn
                                src="/modify.svg"
                                alt="연필"
                                onClick={() => router.push(`/mypage/edit/language`)}
                            />
                            {/* 두번째 연필 누르면 "사용 가능 언어" 페이지로 가서 1순위, 2순위, 3순위 언어선택 */}
                        </Style.Language>

                        <Margin direction="column" size={32} />
                        <Style.Introduce>
                            <Text.Body1 color="gray900">자기소개</Text.Body1>
                            <Style.EditBtn
                                src="/modify.svg"
                                alt="연필"
                                onClick={() => router.push(`/mypage/edit/introduce`)}
                            />
                            {/* 세번째 연필 누르면 "자기소개" 페이지로 가서 자기소개 글쓰기 */}
                        </Style.Introduce>

                        <Margin direction="column" size={32} />
                        <Style.Interest>
                            <Text.Body1 color="gray900">관심사</Text.Body1>
                            <Style.EditBtn
                                src="/modify.svg"
                                alt="연필"
                                onClick={() => router.push(`/mypage/edit/interest`)}
                            />
                            {/* 네번째 연필 누르면 "관심사" 페이지로 가서 관심사 선택하기 */}
                        </Style.Interest>
                    </Style.EditList>
                </Style.Content>
                {modalVisible && <Modal type="profile-back" onClickModal={onClickModal} />}
            </Style.Wapper>
        </>
    );
}
