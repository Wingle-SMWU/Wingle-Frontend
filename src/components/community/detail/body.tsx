import styled from "styled-components";
import { Text } from "../../ui";
import { useRouter } from "next/router";
import { Content } from "./content";

export default function Body({ content }: { content: string }): JSX.Element {
  const router = useRouter();
  const tab = router.query.tab;
  const isNotice = tab === "공지";

  return (
    <S.Body>
      <S.Contents>
        <Text.Body3 color="gray900">
          {content.split("\n").map((text, i) => (
            <div key={i}>
              <Content text={text} isNotice={isNotice} isDetail={true} />
            </div>
          ))}
        </Text.Body3>
      </S.Contents>
    </S.Body>
  );
}

const S = {
  Body: styled.div`
    width: 100%;
    background-color: #fff;
  `,

  Contents: styled.div`
    padding: 16px 24px 20px 24px;
    border-bottom: 4px solid #eeeef2;
  `,
};
