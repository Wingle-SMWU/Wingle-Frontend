import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { adminAPI } from '@/src/api/admin';
import Content from '@/src/components/admin/content';
import Header from '@/src/components/admin/header';
import PageBtn from '@/src/components/admin/pageBtn';
import styled from 'styled-components';
import Tabbar from '@/src/components/admin/tabbar';
import { ADMIN_GET_LIST } from '@/src/constants/constants';
import useGetAdminUserList from '@/src/hooks/admin/useGetAdminUserList';


export default function Admin() {

  const [currIdx, setCurrIdx] = useState(0);
  const [page, setPage] = useState(1);
  const path = ADMIN_GET_LIST[currIdx];

  // const { data } = useQuery([path, {path, page}], () => adminAPI.getList({ path, page: page - 1 }), {
  //   onSuccess: (res) => {
  //     console.log(res);
  //   },
  //   onError: (res) => console.log(res),
  // });

  const { data, isLoading, error } = useGetAdminUserList({path, page})



  const handleClickTabBar = useCallback((idx: number) => {
    setCurrIdx(idx);
    setPage(1);
  }, [])

  useEffect(() => setPage(1), [currIdx])

  return (
    <S.Main>
      <Header />
      <Tabbar currIdx={currIdx} handleClickTabBar={handleClickTabBar} />
      <Content data={data?.data} />
      <PageBtn data={data?.data} page={page} setPage={setPage} />
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