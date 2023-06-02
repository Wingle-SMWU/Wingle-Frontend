export default function NicknameVerify() {
  return (
    <>
      <Text.Body1 color="gray700">닉네임</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={true} error={isErrorNickName}>
            <input
              name="nickname"
              value={nickname}
              type="string"
              placeholder="희망찬윙그리"
              onChange={(e) => {
                handleInputData(e);
                handleErrorNickName(e);
                setVerifiedNickname(false);
                setCheckedNickname(false);
              }}
            />
          </S.InputField>
          <S.ButtonWrapper small={true} error={false}>
            <S.Button onClick={() => handleCheckNickname()}>중복 확인</S.Button>
          </S.ButtonWrapper>
        </S.Content>
        <ErrorMent
          error={isErrorNickName}
          errorMent="한글/영어 두글자 이상 10글자 이하로 입력해주세요."
          ment="  "
        />
        {isCheckedNickname ? (
          <ErrorMent
            error={!isVerifiedNickname}
            errorMent="이미 사용중인 닉네임입니다."
            ment="사용가능한 닉네임입니다."
          />
        ) : null}
      </S.ContentWrapper>
    </>
  );
}
