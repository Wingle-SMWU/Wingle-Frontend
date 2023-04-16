import { Margin, Text } from "../ui";
import styled from "styled-components";
import { useState,useEffect } from "react";

const interestItems = [
    { id: 1, title: "🎤 KPOP" },
    { id: 2, title: "💪 운동" },
    { id: 3, title: "📚 언어교환" },
    { id: 4, title: "🍔 맛집" },
    { id: 5, title: "📺 드라마" },
    { id: 6, title: "✈️ 여행" },
];

//@ts-ignore
export default function SelectInterest({ parentFunction }) {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleClick = (item:string) => {
        //@ts-ignore
      if (selectedItems.includes(item)) {
        setSelectedItems(selectedItems.filter((title) => title !== item));
      } else {
        //@ts-ignore
        setSelectedItems([...selectedItems, item]);
      }
    };

    useEffect(() => {
        parentFunction(selectedItems);
      }, [selectedItems, parentFunction]);

    const isSelected = (item:string) => {
        //@ts-ignore
        if (selectedItems.includes(item)) return true;
        else false;
    }

    

    return (
        <S.ShowInterest>
            {interestItems.map(item => {
                return (
                    <div key={item.id}>
                        {/* @ts-ignore */}
                        <S.InterestBox selected={selectedItems.includes(item.title)}
                                     onClick={() => handleClick(item.title)} backgroundColor={isSelected(item.title)?"#FFF3EB":"#eeeef2"}>
                            <Text.Body6 color="gray900" pointer key={item.title}>
                                {item.title}
                            </Text.Body6>
                        </S.InterestBox>
                        <Margin direction="row" size={8} />
                    </div>
                );
            })}
        </S.ShowInterest>
    );
}

const S = {
    ShowInterest: styled.div`
        display: flex;
        flex-wrap : wrap;
        width : 80%
    `,
    InterestBox: styled.div`
        cursor: pointer;
        border-radius: 40px;
        padding: 8px 15px;
        background-color: ${(props) => props.backgroundColor};
        margin :8px;
    `,
    // InterestBox: styled.div<{ isClicked: boolean }>`
    //     cursor: pointer;
    //     border-radius: 40px;
    //     padding: 8px 15px;
    //     background-color: ${({ isClicked }) => (isClicked ? "#FFF3EB" : "#eeeef2")};
    //     border: ${({ isClicked }) => (isClicked ? "1px solid #FFD7BD" : null)};
    // `,
};

