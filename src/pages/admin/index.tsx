import { useCallback, useEffect, useState } from 'react';
import Content from '@/src/components/admin/index/content';
import Header from '@/src/components/admin/index/header';
import PageBtn from '@/src/components/admin/index/pageBtn';
import styled from 'styled-components';
import Tabbar from '@/src/components/admin/index/tabbar';
import { ADMIN_GET_LIST } from '@/src/constants/admin';
import useGetAdminUserList from '@/src/hooks/admin/useGetAdminUserList';


export default function Admin() {

  const [currIdx, setCurrIdx] = useState(0);
  const [page, setPage] = useState(1);
  const path = ADMIN_GET_LIST[currIdx];

  const { data, isLoading, error } = useGetAdminUserList({path, page});

  const handleClickTabBar = useCallback((idx: number) => {
    setCurrIdx(idx);
    setPage(1);
  }, [])

  useEffect(() => setPage(1), [currIdx])

  return (
    <S.Main>
      <Header />
      <Tabbar currIdx={currIdx} handleClickTabBar={handleClickTabBar} />
      <Content data={data?.data.list} />
      <PageBtn totalPages={data?.data.totalPages} page={page} setPage={setPage} />
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