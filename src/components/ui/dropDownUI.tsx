import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";

interface DropDownProps {
  label?: string; // 제목
  list: string[]; // 드롭다운 리스트
  selected: string; // 선택된 항목(selected state)
  dropDownPlaceHolder?: string; // 드롭다운 플레이스홀더
  handleSelectedChange: (selected: string) => void; // 선택된 항목 변경 함수(selected setState 변경 함수)
  description?: string; // 드롭다운 설명
  disabled?: boolean; // 드롭다운 비활성화
}

export default function DropDownCommon({
  label,
  list,
  selected,
  dropDownPlaceHolder,
  handleSelectedChange,
  description,
  disabled = false,
}: DropDownProps) {
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsActive(!isActive);
    }
  };

  const handleSelect = (item: string) => {
    handleSelectedChange(item);
    setIsActive(false);
  };

  return (
    <S.Container>
      {label && <S.DropDownLabel disabled={disabled}>{label}</S.DropDownLabel>}
      <S.DropdownContainer>
        <S.DropdownBody
          onClick={toggleDropdown}
          isActive={isActive}
          disabled={disabled}
        >
          <S.DropdownSelected disabled={disabled} selected={selected}>
            {selected || dropDownPlaceHolder || "Select an item"}
          </S.DropdownSelected>
          <S.DropdownSelected disabled={false} selected={selected}>
            <Image
              src="/auth/arrow_down.svg"
              alt="arrow"
              width={20}
              height={20}
            />
          </S.DropdownSelected>
        </S.DropdownBody>

        <S.DropdownMenuContainer isActive={isActive}>
          {list.map((item) => (
            <S.DropdownItemContainer
              key={item}
              isSelected={item === selected}
              onClick={() => {
                handleSelect(item);
              }}
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
  DropDownLabel: styled.label<{ disabled: boolean }>`
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme, disabled }) =>
      disabled ? theme.color.gray500 : theme.color.gray700};
  `,
  DropdownContainer: styled.div`
    position: relative;
    &:hover {
      cursor: pointer;
    }
  `,
  DropdownBody: styled.div<{ disabled: boolean; isActive: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 452px;
    height: 50px;
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.color.gray200 : theme.color.white};
    border: 1px solid
      ${({ theme, isActive }) =>
        isActive ? theme.color.gray600 : theme.color.gray200};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    border-radius: 8px;
  `,
  DropdownSelected: styled.div<{ disabled: boolean; selected: string }>`
    font-size: 16px;
    color: ${({ theme, disabled, selected }) =>
      disabled
        ? theme.color.gray500
        : selected
        ? theme.color.gray900
        : theme.color.gray500};
    padding: 14px 16px;
  `,
  DropdownMenuContainer: styled.ul<{ isActive: boolean }>`
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

// EXAMPLE : 아래처럼 사용하세요!!(src/pages/test.tsx)
// import { useState } from "react";
// import { Margin } from "../components/ui";
// import DropDown from "../components/ui/dropDownUI";
// import styled from "styled-components";

// export default function Test() {
//   const [selected, setSelected] = useState<string>("REPUBLIC OF KOREA");
//   const handleSelectedChange = (selected: string) => {
//     setSelected(selected);
//   };

//   const countryList = [
//     {
//       code: "KR",
//       nation: "대한민국",
//       add_code_nation: "KR 대한민국",
//       country: "REPUBLIC OF KOREA",
//     },
//     {
//       code: "CN",
//       nation: "중화인민공화국",
//       add_code_nation: "CN 중화인민공화국",
//       country: "CHINA",
//     },
//     {
//       code: "VN",
//       nation: "베트남",
//       add_code_nation: "VN 베트남",
//       country: "VIET NAM",
//     },
//   ];

//   return (
//     <S.Wrapper>
//       <Margin size={50} direction="column" />
//       <div>
//         <Margin size={8} direction="row" />
//         <DropDown
//           label="안녕"
//           list={countryList.map((item) => item.country)}
//           selected={selected}
//           handleSelectedChange={handleSelectedChange}
//           description="테스트"
//         />
//       </div>
//     </S.Wrapper>
//   );
// }

// const S = {
//   Wrapper: styled.div`
//     padding-left: 24px;
//     padding-right: 24px;
//   `,
// };
