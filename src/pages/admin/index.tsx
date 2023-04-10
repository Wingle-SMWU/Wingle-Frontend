import Content from '@/src/components/admin/content';
import Header from '@/src/components/admin/header';
import PageBtn from '@/src/components/admin/pageBtn';
import Tabbar from '@/src/components/admin/tabbar';
import styled from 'styled-components';

export default function Admin() {
  return (
    <S.Main>
      <Header />
      <Tabbar />
      <Content />
      <PageBtn />
    </S.Main>
  )
}

const S = {
  Main: styled.div`;
    width: 100%;
    height: 1000px;
    background-color: white;
    position: relative;
  `
}