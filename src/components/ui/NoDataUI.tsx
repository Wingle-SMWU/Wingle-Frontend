import Image from "next/image";
import styled from "styled-components";

export default function NoData({
  type
} : {
  type: string
}){
  // type: 게시물은 article, 댓글은 comment 넘겨주기
  return (
   <S.ImageWrapper type={type}>
      {
        type === 'article' ?
        <>
          <Image src="/community/list/comu-noData.svg" alt="" width={83} height={85}/>
          <S.Text>작성한 게시글이 없어요.</S.Text>
        </>
        :
        <>
          <Image src="/community/list/comu-noComment.svg" alt="" width={76} height={80} />
          <S.Text>첫 댓글을 작성해 보세요!</S.Text>
        </>
      }
    </S.ImageWrapper>
  )
}

const S = {
  ImageWrapper: styled.div<{ type: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 6px;
    z-index: 0;
    padding: ${({ type }) => (type === 'article' ? '0' : '40px 0')};
    ${({ type }) => 
    type === 'article' && `
      position: absolute;
      width: 500px;
      max-width: 500px;
      height: 100vh;
    `}
  `,
  Image: styled.img<{ type: string}>`
    src: ${({ type }) => type === 'list' ? "/community/list/comu-noData.svg" : "/community/list/comu-noComment.svg"};
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
}