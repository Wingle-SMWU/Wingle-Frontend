import { Margin, Text } from "../ui";
import styled from "styled-components";
import { useState, useEffect } from "react";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";

type InterestItem = {
  id: number;
  title: string;
};

const interestItems: InterestItem[] = [
  { id: 1, title: "🎤 KPOP" },
  { id: 2, title: "💪 운동" },
  { id: 3, title: "📚 언어교환" },
  { id: 4, title: "🍔 맛집" },
  { id: 5, title: "📺 드라마" },
  { id: 6, title: "✈️ 여행" },
];

type Props = {
  parentFunction: (arr: any) => void;
};

export default function SelectInterest({ parentFunction }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { profileData } = useGetProfile();

  useEffect(() => {
    parentFunction(selectedItems);
  }, [selectedItems, parentFunction]);

  const handleClick = (item: InterestItem) => {
    if (selectedItems.includes(item.title)) {
      setSelectedItems(selectedItems.filter((title) => title !== item.title));
    } else {
      setSelectedItems([...selectedItems, item.title]);
    }
  };

  const isSelected = (item: InterestItem) => {
    if (selectedItems.includes(item.title)) return true;
    else false;
  };

  useEffect(() => {
    if (profileData) {
    const initialSelectedItems = interestItems
      .filter((item) => profileData.interests.includes(item.title))
      .map((item) => item.title);
    setSelectedItems(initialSelectedItems);
    }
  }, [profileData]);

  return (
    <S.ShowInterest>
      {interestItems.map((item) => {
        return (
          <div key={item.id}>
            <S.InterestBox
              selected={selectedItems.includes(item.title)}
              onClick={() => handleClick(item)}
              backgroundColor={isSelected(item) ? "#FFF3EB" : "#eeeef2"}
            >
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
    flex-wrap: wrap;
    width: 80%;
  `,
  InterestBox: styled.div<{ selected: boolean; backgroundColor: string }>`
    cursor: pointer;
    border-radius: 40px;
    padding: 8px 15px;
    background-color: ${(props) => props.backgroundColor};
    margin: 8px;
    border: ${(props) => (props.selected ? "1px solid #FFD7BD" : null)};
  `,
};
