import { useState } from 'react'
import Contents from '@/src/components/admin/detail/contents'
import Modal from '@/src/components/admin/detail/modal'
import Header from '@/src/components/admin/header'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { adminListAPI } from '@/src/api/admin'



export default function Detail() {

  const [isOpen, setIsOpen] = useState('');
  const userId = Number(useRouter().asPath.split('?').at(-1));

  const { data, isLoading, error } = useQuery('getUser', () => adminListAPI.getUser({path: 'waiting', userId}), {
    onSuccess: (res) => console.log(res),
    onError: (res) => console.log(res),
  })

  return (
    <S.Main modal={isOpen}>
      <Header />
      <S.TabBar><p>수락대기</p></S.TabBar>
      <S.Card card={data?.data.idCardImage}/>
      <Contents userId={userId} data={data} setIsOpen={setIsOpen} />
      {isOpen && <Modal setIsOpen={setIsOpen}>{isOpen}</Modal>}
      <S.Button onClick={() => setIsOpen('수락')}>
        <button type='button'>가입수락</button>
      </S.Button>
    </S.Main>
  )
}

const S = {
  Main: styled.div<{modal: string}>`
    width: 100%;
    height: 1500px;
    background: ${({ modal }) => (modal ? '#eeeef2' : 'white')};
    position: relative;
  `,
  TabBar: styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px 0px 0px 248px;
    gap: 24px;
    width: 1440px;
    height: 44px;
    left: 0px;
    top: 143px;
    border-bottom: 1px solid #EEEEF2;
    > p {
      padding: 8px;
      width: 63px;
      height: 27px;
      font-family: Pretendard;
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 150%;
      display: flex;
      align-items: center;
      text-align: center;
      color: #222223;
    }
  `,
  Card: styled.div<{card: string}>`
    position: absolute;
    width: 700px;
    height: 600px;
    left: 373px;
    top: 123px;
    background-image: ${({ card }) => (card ? `url(${card})` : 'url(/logo_favicon.jpeg)')};
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center;
  `,
  Button: styled.div`
    position: absolute;
    width: 1440px;
    height: 80px;
    left: 0px;
    bottom: 0px;
    border-top: 1px solid #EEEEF2;
    > button {
      position: absolute;
      left: 992px;
      top: 15px;
      width: 200px;
      height: 50px;
      padding: 14px 16px;
      background: #FF812E;
      border-radius: 8px;
      font-weight: 700;
      font-size: 16px;
      color: #FFFFFF;
      font-family: Pretendard;
    }
  `
}