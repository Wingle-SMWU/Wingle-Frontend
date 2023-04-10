import { ReactNode } from 'react';
import styled from 'styled-components';

type Layout = {
  children: ReactNode;
}
export default function Reject({ children }: Layout) {
  return (
    <S.Reject>
      <div>
        <p>{children}</p>
        <p><textarea /></p>
      </div>
      <S.Button>
        <button type='button'>내용 저장</button>
        {children === '거절사유' && <button type='button'>거절 사유 전송</button>}
      </S.Button>
    </S.Reject>
  )
}

const S = {
  Reject: styled.div`
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      > p {
        font-family: 'Pretendard';
        font-style: normal;
        font-size: 14px;
        line-height: 140%;
        padding: 20px 0 10px 0;
        color: #222223;
      }
      > p:nth-child(1) {
        width: 144px;
        font-weight: 700;
      }
      > p:nth-child(2) {
        width: 788px;
        font-weight: 400;
      }
      textarea {
        resize: none;
        width: 98%;
        height: 120px;
        border: 1px solid #EEEEF2;
        border-radius: 8px;
        padding: 8px;
        color: #222223;
      }
    }
  `,
  Button: styled.div`
    justify-content: flex-end;
    gap: 8px;
    padding: 0;
    > button {
      border-radius: 8px;
      padding: 8px 6px;
      font-size: 12px;
      :nth-child(1) {
        color: #49494D;
        border: 1px solid #6C6C70;
      }
      :nth-child(2) {
        color: #6C6C70;
        background: #EEEEF2;
        border: none;
      }
    }
  `
}