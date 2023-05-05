import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";

interface StyledInputProps {
  isActive: boolean;
}

interface DropDownProps {
  list: string[]; // 드롭다운 리스트
  selected: string; // 선택된 항목(selected state)
  onSelectedChange: (selected: string) => void; // 선택된 항목 변경 함수(selected setState 변경 함수)
  description?: string; // 드롭다운 설명
}

export default function DropDown({
  list,
  selected,
  onSelectedChange,
  description,
}: DropDownProps) {
  const [isActive, setIsActive] = useState(false);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const handleSelectItem: React.MouseEventHandler<HTMLLIElement> = useCallback(
    (e) => {
      const target = e.target as HTMLLIElement;
      const selectedNation = target.innerText;
      onSelectedChange(selectedNation);
      setIsActive(false);
    },
    [onSelectedChange]
  );

  return (
    <S.Container>
      <S.DropdownContainer>
        <S.DropdownBody onClick={onActiveToggle} isActive={isActive}>
          <S.DropdownSelected>{selected}</S.DropdownSelected>
          <S.DropdownSelected>
            <Image src="/auth/arrow_down.svg" alt="arrow" width={20} height={20} />
          </S.DropdownSelected>
        </S.DropdownBody>

        <S.DropdownMenuContainer isActive={isActive}>
          {list.map((item) => (
            <S.DropdownItemContainer
              key={item}
              isSelected={item === selected}
              onClick={handleSelectItem}
            >
              {item}
            </S.DropdownItemContainer>
          ))}
        </S.DropdownMenuContainer>
      </S.DropdownContainer>
      {description && <S.Description>{description}</S.Description>}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  DropdownContainer: styled.div`
    position: relative;
    &:hover {
      cursor: pointer;
    }
  `,
  DropdownBody: styled.div<{ isActive: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 452px;
    height: 50px;
    background-color: ${({ theme }) => theme.color.white};
    border: 1px solid
      ${({ theme, isActive }) => (isActive ? theme.color.gray600 : theme.color.gray300)};
    border-radius: 8px;
  `,
  DropdownSelected: styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray900};
    padding: 14px 16px;
  `,
  DropdownMenuContainer: styled.ul<StyledInputProps>`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 1;
    width: 452px;
    height: 312px;
    padding: 8px 0;
    background-color: ${({ theme }) => theme.color.white};
    border: 1px solid ${({ theme }) => theme.color.gray600};
    border-radius: 8px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    display: ${(props) => (props.isActive ? "block" : "none")};
  `,
  DropdownItemContainer: styled.li<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    padding: 16px;
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray900};
    &:hover {
      background-color: ${({ theme }) => theme.color.gray200};
      cursor: pointer;
    }
    ${({ isSelected, theme }) =>
      isSelected &&
      `
    background-color: ${theme.color.gray200};
  `}
  `,
  Description: styled.div`
    height: 17px;
    font-size: 12px;
    color: ${({ theme }) => theme.color.gray900};
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
    margin: 8px 0px;
  `,
};

