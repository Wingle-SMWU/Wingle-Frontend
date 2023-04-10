import Image from 'next/image';
import styled from 'styled-components';

export default function Header() {
  return (
    <S.Header>
      <S.Logo>
        <Image src='admin/logo.svg' alt='logo' width={28} height={28} />
      </S.Logo>
      <S.Title>Wingle Admin</S.Title>
    </S.Header>
  )
}

const S = {
  Header: styled.div`
    width: 1440px;
    height: 64px;
    background: #ffffff;
    flex: none;
    order: 0;
    flex-grow: 0;
  `,
  Logo: styled.div`
    position: absolute;
    width: 28px;
    height: 28px;
    left: 257px;
    top: 18px;
  `,
  Title: styled.div`
    position: absolute;
    width: 105px;
    height: 22px;
    left: 297px;
    top: 21px;
    width: 105px;
    height: 22px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
  `
}