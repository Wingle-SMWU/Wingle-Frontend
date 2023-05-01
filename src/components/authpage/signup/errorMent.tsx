import Image from "next/image";
import { Margin, Text } from "../../ui";
import styled from "styled-components";

export function ErrorMent({ error, errorMent, ment }: any) {
  return (
    <>
      {error ? (
        <>
          <S.ErrorWrapper>
            <Image src="/auth/error.svg" alt="error" width={16} height={16} />
            <Margin direction="row" size={8} />
            <Text.Caption3 color="red500">{errorMent}</Text.Caption3>
          </S.ErrorWrapper>
        </>
      ) : (
        <Text.Caption3 color="gray900">{ment}</Text.Caption3>
      )}
    </>
  );
}
const S = {
  ErrorWrapper: styled.div`
    display: flex;
  `,
};
