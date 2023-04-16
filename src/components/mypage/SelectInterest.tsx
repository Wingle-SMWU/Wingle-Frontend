import { Margin, Text } from "../ui";
import styled from "styled-components";
import { useState } from "react";

const interestItems = [
    { id: 1, title: "KPOP" },
    { id: 2, title: "운동" },
    { id: 3, title: "언어교환" },
    { id: 4, title: "맛집" },
    { id: 5, title: "드라마" },
    { id: 6, title: "여행" },
];

export default function SelectInterest() {
    return (
        <S.ShowInterest>
            {interestItems.map(item => {
                return (
                    <>
                        <S.InterestBox>
                            <Text.Body6 color="gray900" pointer>
                                {item.title}
                            </Text.Body6>
                        </S.InterestBox>
                        <Margin direction="row" size={8} />
                    </>
                );
            })}
        </S.ShowInterest>
    );
}

const S = {
    ShowInterest: styled.div`
        display: flex;
    `,
    InterestBox: styled.div`
        cursor: pointer;
        border-radius: 40px;
        padding: 8px 15px;
        background-color: #eeeef2;
    `,
    // InterestBox: styled.div<{ isClicked: boolean }>`
    //     cursor: pointer;
    //     border-radius: 40px;
    //     padding: 8px 15px;
    //     background-color: ${({ isClicked }) => (isClicked ? "#FFF3EB" : "#eeeef2")};
    //     border: ${({ isClicked }) => (isClicked ? "1px solid #FFD7BD" : null)};
    // `,
};
