import Footer from "@/src/components/community/list/footer";
import FreeTab from "@/src/components/community/list/freeTab";
import Header from "@/src/components/community/list/header";
import InteractTab from "@/src/components/community/list/interactTab";
import NoticeTab from "@/src/components/community/list/noticeTab";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";

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

  const imgUrl: string = useMemo(() => {
    if (currentTab === "자유") {
      return "community/list/wingle-default.svg";
    }
    if (currentTab === "교류") {
      return "community/list/list_profile_flag.png";
    }
    if (currentTab === "공지") {
      return "community/list/wingle-manager.svg";
    }
    return "";
  }, [currentTab]);

  return (
    <>
      <Header tab={currentTab} onClickTab={onClickTab}></Header>
      <Style.Body>
        <Style.CreateAbsolutePoint tab={currentTab}>
          <Style.CreateIcon
            src="community/list/new_write.svg"
            onClick={onClickMoveToWrite}
          />
        </Style.CreateAbsolutePoint>
        {currentTab === "교류" && <InteractTab imgUrl={imgUrl}></InteractTab>}
        {currentTab === "공지" && <NoticeTab imgUrl={imgUrl}></NoticeTab>}
        {currentTab === "자유" && <FreeTab imgUrl={imgUrl}></FreeTab>}
      </Style.Body>
      <Footer></Footer>
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
