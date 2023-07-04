import { getForums } from "@/src/api/community/get/forums";
import { currentTabStateAtom } from "@/src/atoms/community/tab";
import FreeTab from "@/src/components/community/list/freeTab";
import Header from "@/src/components/community/list/header";
import InteractTab from "@/src/components/community/list/interactTab";
import Loading from "@/src/components/ui/loadingUI";
import { getImageUrl } from "@/src/modules/utils";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";

export default function PostList() {
  const router = useRouter();
  // const currentTab: string = useMemo(() => {
  //   if (!router.query.tab) {
  //     return "자유";
  //   }
  //   return String(router.query.tab);
  // }, [router.query.tab]);

  const [currentTab, setCurrentTab] = useRecoilState(currentTabStateAtom);

  const onClickTab = (event: any) => {
    setCurrentTab(event.target.textContent);
    router.push({ query: { tab: event.target.textContent } });
  };

  const {
    data: TabArr,
    isLoading,
    isError,
    isIdle,
  } = useQuery({
    queryFn: getForums,
    queryKey: ["forums"],
  });

  if (isLoading) return <Loading />;
  if (isError || isIdle) return <div>에러</div>;

  return (
    <S.Wrapper>
      <Header myArticle={true} tab={currentTab} onClickTab={onClickTab} />
      <S.Content>
        {currentTab === TabArr[0].name && (
          <FreeTab
            forumId={TabArr[0].id}
            imgUrl={getImageUrl(currentTab)}
            my={true}
          />
        )}
        {currentTab === TabArr[1].name && (
          <InteractTab
            forumId={TabArr[1].id}
            imgUrl={getImageUrl(currentTab)}
            my={true}
          />
        )}
      </S.Content>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    position: fixed;
    height: 100vh;
  `,
  Content: styled.div`
    @media (min-width: 501px) {
      width: 500px;
    }
    @media (max-width: 500px) {
      width: 100vw;
    }
    overflow-y: scroll;
    height: 100%;
  `,
};
