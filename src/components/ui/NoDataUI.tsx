import Image from "next/image";
import styled from "styled-components";

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
      <S.Text>{data[type].text}</S.Text>
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
      margin-top: -107px;
      width: 500px;
      max-width: 500px;
      height: 100vh;
    `}
  `,
  Text: styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 22.4px;
    color: #959599;
  `,
  Comment: styled.div`
    padding: 50px 0;
  `,
};
