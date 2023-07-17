import Image from "next/image";
import styled from "styled-components";
import { Text } from "../ui";

export default function NoData({ type }: { type: noDataType }) {
  const data = {
    article: {
      type: "article",
      src: "/noData/article.svg",
      width: 83,
      height: 85,
      text: "작성한 게시글이 없어요.",
    },
    comment: {
      src: "/noData/comment.svg",
      width: 76,
      height: 85,
      text: "첫 댓글을 작성해 보세요!",
    },
    message: {
      src: "/noData/message.svg",
      width: 83,
      height: 85,
      text: "받은 쪽지가 없어요.",
    },
  };
  return (
    <S.ImageWrapper type={type}>
      <Image
        src={data[type].src}
        alt=""
        width={data[type].width}
        height={data[type].height}
      />
      <Text.Body2 color="gray500">{data[type].text}</Text.Body2>
      {type === "message" && (
        <Text.Body7 color="gray400">
          교류게시판에서 대화할 친구를 찾아보세요.
        </Text.Body7>
      )}
    </S.ImageWrapper>
  );
}

const S = {
  ImageWrapper: styled.div<{ type: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 6px;
    z-index: 0;
    padding: ${({ type }) => (type === "comment" ? "40px 0" : "0")};
    ${({ type }) =>
      (type === "article" || type === "message") &&
      `
      @media (min-width: 501px) {
        width: 500px;
      }
      @media (max-width: 500px) {
        width: 100vw;
      }
      margin-top: -60px;
      max-width: 500px;
      height: 100vh;
    `}
  `,
  Comment: styled.div`
    padding: 50px 0;
  `,
};
