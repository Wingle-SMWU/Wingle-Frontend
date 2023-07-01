import { useEffect, useState } from "react";
import { countryList } from "@/src/constants/countryList";
import DropDownCommon from "../ui/dropDownUI";

export default function SelectLanguageBox({
  getLanguageAtIndex,
  initialLanguage,
  idx,
}: Props): JSX.Element {
  const [language, setLanguage] = useState(initialLanguage);

  const handleChange = (selectedLanguage: string): void => {
    setLanguage(selectedLanguage);
  };

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  useEffect(() => {
    getLanguageAtIndex(language, idx);
  }, [language]);

  return (
    <DropDownCommon
      list={countryList.map((country) => country.add_code_nation)}
      selected={language}
      handleSelectedChange={handleChange}
      dropDownPlaceHolder={language}
    />
  );
}

type Props = {
  getLanguageAtIndex: (str: string, idx: number) => void;
  initialLanguage: string;
  idx: number;
};
