import styled from "styled-components";
import { Text } from "../../ui";

export default function Body(props: { content: string }) {
  
  return (
    <Style.Body>
      <Style.Contents>
        <Text.Body3 color="gray900">
          {props.content}
        </Text.Body3>
      </Style.Contents>
    </Style.Body>
  );
}

const Style = {
  Body: styled.div`
    width: 100%;
  `,

  Contents: styled.div`
    padding: 16px 24px 20px 24px;
    border-bottom: 4px solid #eeeef2;
  `,
};
