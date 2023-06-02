import styled from "styled-components";
import { Text } from "../../ui";

export default function Body({ content }: { content: string }) {
  return (
    <S.Body>
      <S.Contents>
        <Text.Body3 color="gray900">
          {content.split("\n").map((text, i) => (
            <div key={i}>{text}</div>
          ))}
        </Text.Body3>
      </S.Contents>
    </S.Body>
  );
}

const S = {
  Body: styled.div`
    width: 100%;
  `,

  Contents: styled.div`
    padding: 16px 24px 20px 24px;
    border-bottom: 4px solid #eeeef2;
  `,
};
