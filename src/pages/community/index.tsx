import { getForums } from "@/src/api/community/get/forums";
import { currentTabStateAtom } from "@/src/atoms/community/tab";
import FreeTab from "@/src/components/community/list/freeTab";
import Header from "@/src/components/community/list/header";
import InteractTab from "@/src/components/community/list/interactTab";
import NoticeTab from "@/src/components/community/list/noticeTab";
import Navigation from "@/src/components/layout/Navigation";
import Loading from "@/src/components/ui/loadingUI";
import { getImageUrl } from "@/src/modules/utils";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";

export default function Community(): JSX.Element {
  const router = useRouter();

  const {
    data: TabArr,
    isLoading,
    isError,
    isIdle,
  } = useQuery({
    queryFn: getForums,
    queryKey: ["forums"],
  });

  const onClickMoveToWrite = (): void => {
    const forumId = getForumId();
    router.push({
      pathname: `/community/create`,
      query: { tab: currentTab, forumId: forumId },
    });
  };

  const [currentTab, setCurrentTab] = useRecoilState(currentTabStateAtom);

  const onClickTab = (event: any): void => {
    setCurrentTab(event.target.textContent);
    router.push({ query: { tab: event.target.textContent } });
  };

  if (isLoading) return <Loading />;
  if (isError || isIdle) return <div>에러</div>;

  const getForumId = (): number => {
    const forum = TabArr.filter(
      (forum: { id: number; name: string }) => forum.name === currentTab
    );
    return forum[0].id;
  };

  return (
    <S.Wrapper>
      <Header tab={currentTab} onClickTab={onClickTab} />
      <S.Content>
        {currentTab === TabArr[0].name && (
          <FreeTab
            forumId={TabArr[0].id}
            imgUrl={getImageUrl(currentTab)}
            my={false}
          />
        )}
        {currentTab === TabArr[1].name && (
          <InteractTab
            forumId={TabArr[1].id}
            imgUrl={getImageUrl(currentTab)}
            my={false}
          />
        )}
        {currentTab === TabArr[2].name && (
          <NoticeTab forumId={TabArr[2].id} imgUrl={getImageUrl(currentTab)} />
        )}
      </S.Content>
      <S.Box>
        <S.CreateIcon
          tab={currentTab}
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
    padding-bottom: 70px;
    flex-direction: column;
    background-color: white;
  `,
  Content: styled.div`
    @media (min-width: 501px) {
      width: 500px;
    }
    @media (max-width: 500px) {
      width: 100vw;
    }
    padding-top: 105px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  `,
  Box: styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-right: 30px;
  `,

  CreateIcon: styled.img<{ tab: string }>`
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 94px;
    cursor: pointer;
    display: ${({ tab }): string => (tab === "공지" ? "none" : "block")};
  `,
};
