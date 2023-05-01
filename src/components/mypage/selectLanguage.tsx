import styled from "styled-components";
import { useEffect,useState } from "react";

type DropdownOptionProps = {
    value: string;
};

type Props = {
  getLanguage: (arr: any) => void;
};

//API - get으로 받아올 것
const options = ["KR 한국어","EN 영어","FR 프랑스어"]

export default function SelectLanguageBox({getLanguage}: Props) {
    const [language,setLanguage] = useState("");

    const handleChange= (event: any) => {
        setLanguage(event.target.value);
      };

    useEffect(() => {
        getLanguage(language);
    }, [language]);

    

    return (
        <S.SelectBox>
            <S.DropdownSelectBox defaultValue="default" onChange={handleChange} >
                <option value="default" disabled hidden>
                    언어선택
                </option>
                {options.map((option) => (
                <S.DropdownOption key={option} value={option}>
                    {option}
                </S.DropdownOption>
                ))}
            </S.DropdownSelectBox>
        </S.SelectBox>
    );
}


const S = {
    SelectBox:styled.div`
      border: 1px solid #dcdce0;
      border-radius: 8px;
    `,
    DropdownSelectBox: styled.select`
      width: 100%;
      height: 50px;
      border: 1px solid #dcdce0;
      border-radius: 8px;
    `,
    DropdownOption: styled.option<DropdownOptionProps>`
      padding : 10px;
      width: 100%;
      height: 50px;
      border: 1px solid #dcdce0;
      border-radius: 8px;
    `,
  };