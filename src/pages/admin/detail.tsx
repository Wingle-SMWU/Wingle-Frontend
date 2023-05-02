import { useEffect, useState } from 'react'
import Contents from '@/src/components/admin/detail/contents'
import Modal from '@/src/components/admin/detail/modal'
import Header from '@/src/components/admin/index/header'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { adminListAPI } from '@/src/api/admin/admin'
import { useSetRecoilState } from 'recoil';
import { postOrderStateAtom } from '../../atoms/admin/admin';
import { theme } from '@/src/styles/theme'

export default function Detail() {
  const [isOpen, setIsOpen] = useState('');
  const userId = Number(useRouter().asPath.split('?').at(-2));
  const postOrder = Number(useRouter().asPath.split('?').at(-1));
  const setPostOrder = useSetRecoilState(postOrderStateAtom);

  const { data, isError } = useQuery(['getUser', userId], () => adminListAPI.getUser({path: 'waiting', userId}), { cacheTime: 0, retry: 0 })

  useEffect(() => setPostOrder(postOrder), []);

  if(isError) {
    return (
      <S.Main modal={isOpen}>
        404
      </S.Main>
    )
  }

  return (
    <S.Main modal={isOpen}>

      <Header />
      {data && <>
        <S.TabBar><p>수락{data.message.split(' ')[1]}</p></S.TabBar>
        <S.Card card={data.data.idCardImage}/>
        <Contents userId={userId} data={data.data} setIsOpen={setIsOpen} />
      </> }

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
    background: ${({ modal }) => (modal ? theme.color.gray200 : theme.color.white)};
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
    border-bottom: 1px solid ${theme.color.gray200};
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
      color: ${theme.color.gray900};
    }
  `,
  Card: styled.div<{card: string | undefined}>`
    position: absolute;
    width: 700px;
    height: 600px;
    left: 373px;
    top: 123px;
    background-image: ${({ card }) => (card ? `url(${card})` : '')};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  `,
  Button: styled.div`
    position: absolute;
    width: 1440px;
    height: 80px;
    left: 0px;
    bottom: 0px;
    border-top: 1px solid ${theme.color.gray200};
    > button {
      position: absolute;
      left: 992px;
      top: 15px;
      width: 200px;
      height: 50px;
      padding: 14px 16px;
      background: ${theme.color.orange500};
      border-radius: 8px;
      font-weight: 700;
      font-size: 16px;
      color: ${theme.color.white};
      font-family: Pretendard;
    }
  `
}