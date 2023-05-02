import styled from 'styled-components';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import { theme } from '@/src/styles/theme';

type ModalFactor = {
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
}

export default function Modal({ children, setIsOpen }: ModalFactor) {

  const handleCloseModal = () => setIsOpen('');

  return (
    <S.Modal>
      <S.Image onClick={handleCloseModal}>
        <Image src='/admin/modal_close.svg' alt='close' width={18} height={18} />
      </S.Image>
      <S.Container>
        {children && <p>{`정말 ${children}하시겠습니까?`}</p>}
        {children === '거절' && <p>확인을 누르면 거절메시지가 전송됩니다.</p>}
        <S.Button>
          <button type='button' onClick={handleCloseModal}>취소</button>
          <button type='submit' form='form'>확인</button>
        </S.Button>
      </S.Container>
    </S.Modal>
  )
}

const S = {
  Modal: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    isolation: isolate;
    position: absolute;
    width: 312px;
    height: 197px;
    left: 564px;
    top: 771px;
    background: ${theme.color.white};
    border-radius: 8px;
  `,
  Image: styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 264px;
    height: 125px;
    > p {
      width: 264px;
      font-family: 'Pretendard';
      font-style: normal;
      line-height: 140%;
      text-align: center;
      color: ${theme.color.gray900};
    }
    > p:nth-child(1) {
      height: 28px;
      font-weight: 700;
      font-size: 20px;
    }
    > p:nth-child(2) {
      height: 20px;
      font-weight: 400;
      font-size: 14px;
    }
  `,
  Button: styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    margin: 40px 0 0 0;
    gap: 8px;
    width: 264px;
    height: 37px;
    > button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 8px;
      gap: 8px;
      width: 128px;
      height: 37px;
      border-radius: 8px;
    }
    > button:nth-child(1) {
      background: ${theme.color.gray200};
    }
    > button:nth-child(2) {
      background: ${theme.color.orange500};
    }
  `
}