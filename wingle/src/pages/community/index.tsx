import Footer from "@/src/components/community/list/footer";
import FreeTab from "@/src/components/community/list/freeTab";
import Header from "@/src/components/community/list/header";
import InteractTab from "@/src/components/community/list/interactTab";
import NoticeTab from "@/src/components/community/list/noticeTab";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import styled from "styled-components";

export default function Community() {
  const router = useRouter();

  const [tab, setTab] = useState("자유");

  const onClickMoveToWrite = () => {
    router.push("/community/create");
  };

  const onClickTab = (event: any) => {
    setTab(event.target.textContent);
  };

  const imgUrl: string = useMemo(() => {
    if (tab === "자유") {
      return "community/list/wingle-default.svg";
    }
    if (tab === "교류") {
      return "community/list/list_profile_flag.png";
    }
    if (tab === "공지") {
      return "community/list/wingle-manager.svg";
    }
    return "";
  }, [tab]);

  return (
    <>
      <Header tab={tab} onClickTab={onClickTab}></Header>
      <Style.Body>
        <Style.CreateAbsolutePoint>
          <Style.CreateIcon
            src="community/list/new_write.svg"
            onClick={onClickMoveToWrite}
          />
        </Style.CreateAbsolutePoint>
        {tab === "교류" && <InteractTab imgUrl={imgUrl}></InteractTab>}
        {tab === "공지" && <NoticeTab imgUrl={imgUrl}></NoticeTab>}
        {tab === "자유" && <FreeTab imgUrl={imgUrl}></FreeTab>}
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

  CreateAbsolutePoint: styled.div`
    position: absolute;
  `,

  CreateIcon: styled.img`
    width: 50px;
    height: 50px;
    position: relative;
    left: 428px;
    top: 710px;
  `,
};
