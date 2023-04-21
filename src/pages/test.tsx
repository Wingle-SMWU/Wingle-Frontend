import { useState } from "react";
import TextInputUI from "../components/ui/textInputUI";
import { Margin } from "../components/ui";

export default function Test() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Margin size={50} direction="column" />
      <div>
        <TextInputUI
          name="test"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => console.log("onBlur")}
          placeholder="텍스트를 입력해주세요."
          validate={(value) => value.length >= 5}
          errorMessage="5글자 이상 입력해주세요."
          message="5글자 이상 하셨군요!"
        />
      </div>
    </>
  );
}
