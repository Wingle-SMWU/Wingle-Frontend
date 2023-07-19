import React, { useState, useCallback } from "react";
import { countryList, CountryListType } from "../../../constants/countryList";
import { useSetRecoilState } from "recoil";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import DropDownCommon from "../../ui/dropDownUI";
import { Margin } from "../../ui";

export default function DropDownSignUpCountry(): JSX.Element {
  const [nation, setNation] = useState("대한민국");
  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const handleSelectItem = useCallback((selected: string): void => {
    const country = countryList.find(
      (item: CountryListType) => item.krNation === selected
    );
    if (country) {
      setNation(selected);
      setSignUpFormData(
        (prev: SignUpFormData): SignUpFormData => ({
          ...prev,
          nation: country.code,
        })
      );
    }
  }, []);

  return (
    <>
      <DropDownCommon
        label="국적"
        list={countryList.map((item: CountryListType): string => item.krNation)}
        selected={nation}
        handleSelectedChange={handleSelectItem}
      />
      <Margin direction="column" size={24} />
    </>
  );
}
