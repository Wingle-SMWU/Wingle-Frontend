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

  console.log(preSelctArr, "~~");
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
      setDisabled(true);
    }
    console.log(
      "idx 이전 선택 : ",
      idx,
      preSelctArr,
      preSelctArr[idx - 1],
      "~~"
    );
  }, [language, isdisable]);

  return (
    <DropDownCommon
      list={countryList.map((country) => country.enNation)}
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
