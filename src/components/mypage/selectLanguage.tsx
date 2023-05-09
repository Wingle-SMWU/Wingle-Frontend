import styled from "styled-components";
import { useEffect, useState } from "react";
import { countryList } from "@/src/constants/countryList";
import DropDown from "@/src/components/mypage/countryDropDown";

export default function SelectLanguageBox({ getLanguageAtIndex, initialLanguage, idx }: Props) {
  const [language, setLanguage] = useState(initialLanguage);

  const handleChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  useEffect(() => {
    getLanguageAtIndex(language, idx);
  }, [language]);

  return (
    <S.SelectBox>
      <DropDown
        list={countryList.map((country) => country.add_code_nation)}
        selected={language}
        onSelectedChange={handleChange}
      />
    </S.SelectBox>
  );
}


type Props = {
  getLanguageAtIndex: (str: string, idx : number) => void;
  initialLanguage : string;
  idx : number;
};

const S = {
  SelectBox: styled.div`
    border: 1px solid #dcdce0;
    border-radius: 8px;
  `,
};
