import React, { useState } from "react";
import { countryList, CountryListType } from "../../../constants/countryList";
import { useSetRecoilState } from "recoil";
import { signUpFormDataAtom } from "@/src/atoms/auth/signUpAtoms";
import { SignUpFormData } from "@/src/types/auth/signupFormDataType";
import DropDownCommon from "../../ui/dropDownUI";
import { Margin } from "../../ui";

export default function DropDownSignUpCountry(): JSX.Element {
  const [nation, setNation] = useState("Republic of Korea");
  const setSignUpFormData = useSetRecoilState(signUpFormDataAtom);

  const handleSelectItem = (selected: string): void => {
    const country = countryList.find(
      (item: CountryListType) => item.enNation === selected
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
  };

  return (
    <>
      <DropDownCommon
        label="국적"
        list={countryList.map((item: CountryListType): string => item.enNation)}
        selected={nation}
        handleSelectedChange={handleSelectItem}
      />
      <Margin direction="column" size={24} />
    </>
  );
}
