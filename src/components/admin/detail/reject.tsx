import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { adminTempAPI } from '../../../api/admin';
import usePostTemp from '@/src/hooks/admin/usePostTemp';

type RejectFactor = {
  children: ReactNode
  userId: number
  reason: string
  setReason: React.Dispatch<React.SetStateAction<string>>
  setIsOpen: React.Dispatch<React.SetStateAction<string>>
}

export default function Reject({ children, userId, setIsOpen, reason, setReason}: RejectFactor) {

  const handleChangeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value);

  const { mutate, isLoading, error } = usePostTemp(children, userId, reason);

  return (
    <S.Reject>
      <div>
        <p>{children}</p>
        <p><textarea onChange={handleChangeReason} /></p>
      </div>
      <S.Button>
        <button type='button' onClick={() => mutate()} >내용 저장</button>
        {children === '거절사유' && <button type='button' onClick={() => setIsOpen('거절')}>거절 사유 전송</button>}
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
        background: transparent;
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