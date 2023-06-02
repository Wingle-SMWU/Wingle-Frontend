import { Margin, Text } from "@/src/components/ui";
import EmailVerify from "./emailVerify";
import PasswordVerify from "./passwordVerify";
import NameInput from "./nameInput";
import NicknameVerify from "./nicknameVerify";

export default function InputBox() {
  return (
    <>
      <Text.Title1 color="gray900">학생 정보</Text.Title1>
      <Margin direction="column" size={16} />

      <EmailVerify />
      <PasswordVerify />
      <NameInput />
      <NicknameVerify />
    </>
  );
}
