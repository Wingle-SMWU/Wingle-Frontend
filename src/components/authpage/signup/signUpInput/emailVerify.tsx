import { Margin, Text } from "@/src/components/ui";

export default function EmailVerify() {
  const [buttonMessage, setButtonMessage] = useState("인증 전송");

  return (
    <>
      <Text.Body1 color="gray700">이메일</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={true} error={false}>
            <input
              name="email"
              value={email}
              type="email"
              placeholder="abc@naver.com"
              onChange={(e) => {
                handleInputData(e);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={false}>
            <S.Button onClick={() => handleSendEmail()}>
              {buttonMessage}
            </S.Button>
          </S.ButtonWrapper>
        </S.Content>
        <ErrorMent error={false} errorMent="" ment={emailMent} />
      </S.ContentWrapper>
      <Text.Body1 color="gray700">인증번호 입력</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={true} error={isErrorEmailCertify}>
            <input
              name="emailCertification"
              value={emailCertification}
              type="string"
              placeholder="인증번호"
              onChange={(e) => {
                handleInputData(e);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={isErrorEmailCertify}>
            <S.Button onClick={() => handleVerifyEmail()}>인증 확인</S.Button>
          </S.ButtonWrapper>
        </S.Content>
        {isLoadingVerifyEmail ? (
          <ErrorMent error={false} errorMent="" ment="인증 확인 중 입니다." />
        ) : (
          <ErrorMent
            error={isErrorEmailCertify}
            errorMent="인증정보가 일치하지 않습니다."
            ment="인증이 완료되었습니다."
          />
        )}
      </S.ContentWrapper>
      ;
    </>
  );
}
