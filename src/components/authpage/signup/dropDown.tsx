import React, { useEffect, useState, useCallback } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import { List } from "./countryList";

interface StyledInputProps {
  isActive: boolean;
}

export default function DropDown() {
  const [isActive, setIsActive] = useState(false);
  const [item, setItem] = useState("Republic of Korea");

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((e: any) => {
    setItem(e.target.innerText);
    setIsActive((prev) => !prev);
  }, []);

  return (
    <S.Container>
      <Text.Body1 color="gray700">국적</Text.Body1>
      <S.DropdownContainer>
        <S.DropdownBody onClick={onActiveToggle}>
          <S.Img>
            <Text.Body3 color="gray900">{item}</Text.Body3>
          </S.Img>
          <S.Img>
            <img src="/auth/arrow_down.svg" alt="arrow"></img>
          </S.Img>
        </S.DropdownBody>
        <Margin direction="column" size={8} />

        <S.DropdownMenu isActive={isActive}>
          {List.map((item) => (
            <S.DropdownItemContainer id="item" key={item} onClick={onSelectItem}>
              <Text.Body3 color="gray900">{item}</Text.Body3>
            </S.DropdownItemContainer>
          ))}
        </S.DropdownMenu>
        <Margin direction="column" size={16} />
      </S.DropdownContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.div``,
  DropdownContainer: styled.div`
    margin-top: 8px;
    &:hover {
      cursor: pointer;
    }
  `,
  DropdownBody: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 452px;
    height: 50px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
  `,
  Img: styled.div`
    padding-left: 15px;
    padding-right: 15px;
  `,
  DropdownMenu: styled.ul<StyledInputProps>`
    overflow: auto;
    position: absolute;
    background-color: white;
    display: ${(props) => (props.isActive ? `block` : `none`)};
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
    padding-bottom: 26px;
    padding-left: 16px;
  `,
};
