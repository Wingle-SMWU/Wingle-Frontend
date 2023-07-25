/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import useGetRoom from "../../hooks/message/useGetRoom";
import MsgList from "../../components/messageComp/msgList";
import { Text } from "../../components/ui";
import Message from "../../../public/images/message/message.svg";
import Navigation from "@/src/components/layout/Navigation";
import { Room } from "@/src/types/message/roomType";
import instance from "@/src/api/axiosModule";
import Loading from "@/src/components/ui/loadingUI";
import NoData from "@/src/components/ui/NoDataUI";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "react-i18next";

// export const getStaticProps: GetStaticProps = async ({
//   locale = "en" || "ko",
// }) => {
//   return {
//     props: { ...(await serverSideTranslations(locale, ["message", "navbar"])) },
//   };
// };

export default function message(page: number, size: number) {
  const { messageDataRoom } = useGetRoom(0, 10000);

  // const { t } = useTranslation();

  if (messageDataRoom === undefined) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.TopContainer>
        <Text.Title1 color="gray900">쪽지함</Text.Title1>
      </S.TopContainer>
      <S.MsgContainer>
        {messageDataRoom?.length > 0 ? (
          messageDataRoom.map((list: Room) => {
            console.log(list.createdTime);
            if (list.recentChat !== null) {
              return <MsgList list={list} key={list.roomId} />;
            }
          })
        ) : (
          <NoData type="message" />
        )}
        <Navigation tab={""} />
      </S.MsgContainer>
    </S.Container>
  );
}

// export async function getServerSideProps(context: any) {
//   const { page, size } = context.query;
//   const res = await instance.get(`/messages/rooms?page=${page}&size=${size}`);
//   const data = await res.data;

//   return { props: { data } };
// }

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 70px;
    background-color: white;
  `,

  TopContainer: styled.div`
    position: fixed;
    padding: 14px 24px;
    background-color: white;
    z-index: 20;
    width: 450px;
  `,

  MsgContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: scroll;
    padding-top: 55px;
  `,
};
