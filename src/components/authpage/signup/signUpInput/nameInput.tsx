import { Margin, Text } from "@/src/components/ui";

export default function NameInput() {
  return (
    <>
      <Text.Body1 color="gray700">이름</Text.Body1>
      <Margin direction="column" size={8} />
      <S.ContentWrapper>
        <S.Content>
          <S.InputField small={false} error={isErrorName}>
            <input
              name="name"
              value={name}
              type="string"
              placeholder="김윙글"
              onChange={(e) => {
                handleInputData(e);
                handleErrorName(e);
              }}
            />
          </S.InputField>
        </S.Content>
        <ErrorMent
          error={isErrorName}
          errorMent="실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) "
          ment=" 실명을 입력하세요 (한글, 영어 대/소문자 사용 가능) "
        />
      </S.ContentWrapper>
    </>
  );
}
