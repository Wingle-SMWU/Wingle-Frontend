import React, { useState, useCallback } from "react";
import styled from "styled-components";

interface StyledInputProps {
  isActive: boolean;
}

interface DropDownProps {
  label: string;
  list: string[];
  selected: string;
  onSelectedChange: (selected: string) => void;
}

export default function DropDown({ label, list, selected, onSelectedChange }: DropDownProps) {
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
      <S.Label>{label}</S.Label>
      <S.DropdownContainer>
        <S.DropdownBody onClick={onActiveToggle}>
          <S.Selected>{selected}</S.Selected>
          <S.Caret />
        </S.DropdownBody>
        <S.DropdownMenu isActive={isActive}>
          {list.map((item) => (
            <S.DropdownItemContainer key={item} onClick={handleSelectItem}>
              <S.Item>{item}</S.Item>
            </S.DropdownItemContainer>
          ))}
        </S.DropdownMenu>
      </S.DropdownContainer>
    </S.Container>
  );
}
const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Label: styled.label`
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #1f1f33;
  `,
  DropdownContainer: styled.div`
    position: relative;
    width: 100%;
    &:hover {
      cursor: pointer;
    }
  `,
  DropdownBody: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 12px 16px;
    background-color: #f8f8fa;
    border: 1px solid #dcdce0;
    border-radius: 8px;
  `,
  Selected: styled.div`
    font-size: 16px;
    color: #1f1f33;
  `,
  Caret: styled.div`
    width: 0;
    height: 0;
    margin-left: 8px;
    border-top: 6px solid #1f1f33;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
  `,
  DropdownMenu: styled.ul<StyledInputProps>`
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    width: 100%;
    max-height: 200px;
    padding: 8px 0;
    background-color: #ffffff;
    border: 1px solid #dcdce0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    overflow-y: auto;
    display: ${(props) => (props.isActive ? "block" : "none")};
    width: 452px;
    height: 208px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
    padding-top: 21px;
  `,
  DropdownItemContainer: styled.li`
    display: flex;
    align-items: center;
    padding-top: 0px;
    padding-bottom: 12px;
    padding-left: 16px;
    &:hover {
      background-color: #f8f8fa;
      cursor: pointer;
    }
  `,
  Item: styled.div`
    font-size: 16px;
    color: #1f1f33;
  `,
};
