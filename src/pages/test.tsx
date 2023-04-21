import { useState } from "react";
import TextInputUI from "../components/ui/textInputUI";

export default function Test() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <TextInputUI
      name="example-input"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Type here..."
    />
  );
}
