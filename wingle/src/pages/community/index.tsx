import FreeTab from "@/src/components/community/list/freeTab";
import Header from "@/src/components/community/list/header";
import InteractTab from "@/src/components/community/list/interactTab";
import NoticeTab from "@/src/components/community/list/noticeTab";
import { getImageUrl } from "@/src/modules/utils";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import Navigation from "@/src/components/layout/Navigation";

type Tab = {
  tab: string;
};

export default function Community() {
  const router = useRouter();

  const currentTab: string = useMemo(() => {
    if (!router.query.tab) {
      return "자유";
    }
    return String(router.query.tab);
  }, [router.query.tab]);

  const onClickMoveToWrite = () => {
    router.push({ pathname: `/community/create`, query: { tab: currentTab } });
  };

  const onClickTab = (event: any) => {
    router.push({ query: { tab: event.target.textContent } });
  };

  return (
    <>
      <Header tab={currentTab} onClickTab={onClickTab} />
      <Style.Body>
        <Style.CreateAbsolutePoint tab={currentTab}>
          <Style.CreateIcon
            src="community/list/new-write.svg"
            onClick={onClickMoveToWrite}
          />
        </Style.CreateAbsolutePoint>
        {currentTab === "교류" && (
          <InteractTab imgUrl={getImageUrl(currentTab)} />
        )}
        {currentTab === "공지" && (
          <NoticeTab imgUrl={getImageUrl(currentTab)} />
        )}
        {currentTab === "자유" && <FreeTab imgUrl={getImageUrl(currentTab)} />}
      </Style.Body>
      <Navigation />
    </>
  );
}

const Style = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 780px;
    background-color: white;
  `,

  CreateAbsolutePoint: styled.div<Tab>`
    position: absolute;
    display: ${({ tab }) => (tab === "공지" ? "none" : "block")};
  `,

  CreateIcon: styled.img`
    width: 50px;
    height: 50px;
    position: relative;
    left: 428px;
    top: 710px;
  `,
};
