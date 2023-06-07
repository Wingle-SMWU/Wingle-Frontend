import { Margin, Text } from "@/src/components/ui";
import EmailVerify from "./emailVerify";
import PasswordVerify from "./passwordVerify";
import NameInput from "./nameInput";
import NicknameVerify from "./nicknameVerify";

export default function InputBox() {
  return (
    <>
      <Margin direction="column" size={24} />

      <EmailVerify />
      <PasswordVerify />
      <NameInput />
      <NicknameVerify />
    </>
  );
}
