import FreeTab from "@/src/components/community/list/freeTab";
import Header from "@/src/components/community/list/header";
import InteractTab from "@/src/components/community/list/interactTab";
import NoticeTab from "@/src/components/community/list/noticeTab";
import { getImageUrl } from "@/src/modules/utils";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import Navigation from "@/src/components/layout/Navigation";
import { getForums } from "@/src/api/community/get/forums";
import { useQuery } from "react-query";

export default function Community(props: { tab: string }) {

  const router = useRouter();
  
  const { data: TabArr, isLoading, isError } = useQuery({
    queryFn: getForums,
    queryKey: ['forums'],
  });
  
  const getForumId = () => {
    const forum = TabArr.filter((forum: { id: number, name: string }) => forum.name === currentTab)
    return forum[0].id;
  };

  const onClickMoveToWrite = () => {
    const forumId = getForumId();
    router.push({ pathname: `/community/create`, query: { tab: currentTab, forumId: forumId } });
  };

  const currentTab: string = useMemo(() => {
    if (!router.query.tab) {
      return '자유';
    }
    return String(router.query.tab);
  }, [router.query.tab]);
  
  const onClickTab = (event: any) => {
    router.push({ query: { tab: event.target.textContent } });
  };

  if (isLoading) return <div>로딩중</div>
  if (isError) return <div>에러</div>
  
  
  return (
    <S.Wrapper>
      <Header tab={currentTab} onClickTab={onClickTab} />
      {currentTab === TabArr[0].name && <FreeTab forumId={TabArr[0].id} imgUrl={getImageUrl(currentTab)} />}
      {currentTab === TabArr[1].name && <InteractTab forumId={TabArr[1].id} imgUrl={getImageUrl(currentTab)} />}
      {currentTab === TabArr[2].name && <NoticeTab forumId={TabArr[2].id} imgUrl={getImageUrl(currentTab)} />}
      <S.Box>
        <S.CreateIcon
          tab={props.tab}
          src="community/list/new-write.svg"
          onClick={onClickMoveToWrite}
        />
      </S.Box>
      <Navigation tab={currentTab} />
    </S.Wrapper>
  );
}
const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding-bottom: 72px;
  `,

  Box: styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-right: 30px;
  `,

  CreateIcon: styled.img<Tab>`
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 94px;
    display: ${({ tab }) => (tab === "공지" ? "none" : "block")};
  `,
};
