export default function PasswordVerify() {
  return (
    <>
      <Text.Body1 color="gray700">비밀번호</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={false} error={isErrorPassword}>
            <input
              name="password"
              value={password}
              type="password"
              placeholder="비밀번호"
              onChange={(e) => {
                handleInputData(e);
                handleErrorPassword(e);
              }}
            />
          </S.InputField>
        </S.Content>
        <ErrorMent
          error={isErrorPassword}
          errorMent="영문자/숫자/특수기호 포함 최소 8자, 최대 15자 "
          ment="영문자/숫자/특수기호 포함 최소 8자, 최대 15자"
        />
      </S.ContentWrapper>

      <Text.Body1 color="gray700">비밀번호 확인</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={false} error={isErrorPasswordCheck}>
            <input
              name="passwordCheck"
              value={passwordCheck}
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => {
                handleInputData(e);
                handleErrorPasswordCheck(e);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={false} error={false}></S.ButtonWrapper>
        </S.Content>
        <ErrorMent
          error={isErrorPasswordCheck}
          errorMent="정보를 정확히 입력해주세요."
          ment=" "
        />
      </S.ContentWrapper>
    </>
  );
}
