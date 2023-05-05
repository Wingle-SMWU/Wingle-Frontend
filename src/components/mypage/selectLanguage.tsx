import styled from "styled-components";
import { useEffect, useState } from "react";
import { countryList } from "@/src/constants/countryList";
import DropDown from "../ui/dropDownUI";

export default function SelectLanguageBox({ getLanguage,initialLanguage }: Props) {
  const [language, setLanguage] = useState(initialLanguage);

  const handleChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  useEffect(() => {
    getLanguage(language);
  }, [language]);

  useEffect(() => {
  setLanguage(initialLanguage);
}, [initialLanguage]);

  return (
    <S.SelectBox>
      <DropDown
        label=""
        list={countryList.map((country) => country.add_code_nation)}
        selected={language}
        onSelectedChange={handleChange}
      />
    </S.SelectBox>
  );
}

type Props = {
  getLanguage: (arr: any) => void;
  initialLanguage : string;
};

const S = {
  SelectBox: styled.div`
    border: 1px solid #dcdce0;
    border-radius: 8px;
  `,
};
