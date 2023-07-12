import { Margin, Text } from "../ui";
import styled from "styled-components";
import { useState, useEffect } from "react";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";
import { theme } from "@/src/styles/theme";

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
              backgroundColor={isSelected(item) ? "#FFF3EB" : "#fffff"}
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
    max-width: 312px;
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    gap: 8px;
  `,
  InterestBox: styled.div<{ selected: boolean; backgroundColor: string }>`
    cursor: pointer;
    border-radius: 40px;
    display: flex;
    padding: 8px 16px 8px 12px;
    align-items: center;
    background-color: ${(props) => props.backgroundColor};
    border: ${(props) =>
      props.selected
        ? `1px solid ${theme.color.orange500}`
        : `1px solid ${theme.color.gray300}`};
  `,
};
