import React, { useState, useCallback } from "react";
import { Text, Margin } from "@/src/components/ui";
import styled from "styled-components";
import { countryList } from "../../../constants/countryList";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";

interface StyledInputProps {
  isActive: boolean;
}

export default function DropDown() {
  const [isActive, setIsActive] = useState(false);
  const [nation, setNation] = useState("REPUBLIC OF KOREA");
  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const handleSelectItem: React.MouseEventHandler<HTMLLIElement> = useCallback(
    (e) => {
      const target = e.target as HTMLLIElement;
      const selectedNation = target.innerText;

      const selectedCountry = countryList.find(
        (item) => item.country === selectedNation
      );

      if (selectedCountry) {
        const selectedCode = selectedCountry.code;
        setNation(selectedNation);
        setIsActive(false);
        setSignUpFormData((prev) => ({
          ...prev,
          nation: selectedCode,
        }));
      }
    },
    [setSignUpFormData]
  );

  return (
    <S.Container>
      <Text.Body1 color="gray700">국적</Text.Body1>
      <S.DropdownContainer>
        <S.DropdownBody onClick={onActiveToggle}>
          <S.Selected>
            <S.CountryItem color="gray900">{nation}</S.CountryItem>
          </S.Selected>
          <S.Selected>
            <Image
              src="/auth/arrow_down.svg"
              alt="arrow"
              width={20}
              height={20}
            />
          </S.Selected>
        </S.DropdownBody>
        <Margin direction="column" size={8} />

        <S.DropdownMenu isActive={isActive}>
          {countryList.map((item) => (
            <S.DropdownItemContainer
              id="item"
              key={item.code}
              onClick={handleSelectItem}
            >
              <S.CountryItem color="gray900">{item.country}</S.CountryItem>
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
    cursor: pointer;
  `,
  Selected: styled.div`
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
  CountryItem: styled(Text.Body3)`
    cursor: pointer;
  `,
};
