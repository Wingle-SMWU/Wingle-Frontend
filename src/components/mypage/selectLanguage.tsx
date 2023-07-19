import { useEffect, useState } from "react";
import DropDownCommon from "../ui/dropDownUI";
import { languageList } from "../../constants/languageList";
import Language from "../../pages/mypage/edit/language";

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
    // to do : 후 순위 비활성화
    //if (
    //   idx !== 0 &&
    //   // (preSelctArr[idx - 1] === undefined || preSelctArr[idx - 1] === "")
    //   (preSelected[idx - 1] === undefined || preSelected[idx - 1] === "")
    // ) {
    //   // setDisabled(true);
    // }
  }, [language, isdisable]);

  return (
    <DropDownCommon
      list={languageList
        .filter((language) => !preSelected.includes(language.languageList))
        .map((language) => language.languageList)}
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
