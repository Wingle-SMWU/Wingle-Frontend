import { Margin } from "@/src/components/ui";
import EmailVerify from "./emailVerify";
import PasswordVerify from "./passwordVerify";
import NameInput from "./nameInput";
import NicknameVerify from "./nicknameVerify";
import InputUnivDropdown from "./inputUnivDropdown";

export default function InputBox(): JSX.Element {
  return (
    <>
      <Margin direction="column" size={24} />

      <EmailVerify />
      <PasswordVerify />
      <InputUnivDropdown />
      <NameInput />
      <NicknameVerify />
    </>
  );
}
