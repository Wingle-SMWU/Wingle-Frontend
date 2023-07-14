import { useEffect, useState } from "react";
import { countryList } from "@/src/constants/countryList";
import DropDownCommon from "../ui/dropDownUI";

export default function SelectLanguageBox({
  getLanguageAtIndex,
  initialLanguage,
  idx,
  preSelctArr,
}: Props): JSX.Element {
  const [language, setLanguage] = useState(initialLanguage);
  const [preSelected, setIsPreSelected] = useState(preSelctArr);
  // const preSelected = preSelctArr;
  const [isdisable, setDisabled] = useState(false);
  const handleChange = (selectedLanguage: string): void => {
    setLanguage(selectedLanguage);
  };

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  useEffect(() => {
    setIsPreSelected(preSelctArr);
  }, [preSelctArr]);

  useEffect(() => {
    getLanguageAtIndex(language, idx);
    if (
      idx !== 0 &&
      // (preSelctArr[idx - 1] === undefined || preSelctArr[idx - 1] === "")
      (preSelected[idx - 1] === undefined || preSelected[idx - 1] === "")
    ) {
      // setDisabled(true);
    }
  }, [language, isdisable]);

  return (
    <DropDownCommon
      list={countryList
        .filter((country) => !preSelected.includes(country.enNation))
        .map((country) => country.enNation)}
      selected={language.length ? language : "언어선택"}
      handleSelectedChange={handleChange}
      dropDownPlaceHolder={language}
      disabled={isdisable}
    />
  );
}

type Props = {
  getLanguageAtIndex: (str: string, idx: number) => void;
  initialLanguage: string;
  idx: number;
  preSelctArr: string[];
};
