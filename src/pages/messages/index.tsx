/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import useGetRoom from "../../hooks/message/useGetRoom";
import MsgList from "../../components/message/msgList";
import { Text } from "../../components/ui";
import Message from "../../../public/images/message/message.svg";
import Navigation from "@/src/components/layout/Navigation";
import { Room } from "../../api/message/messageApi";
import instance from "@/src/api/axiosModul";


export default function message(page: number , size: number ) {
  const { messageDataRoom } = useGetRoom(0, 10000);

  if (messageDataRoom === undefined) {
    return <div>로딩중</div>;
  }

  return (
    <S.Container>
      <S.TopContainer>
        <Text.Title1 color="gray900">쪽지함</Text.Title1>
      </S.TopContainer>
      <S.MsgContainer>
        {messageDataRoom?.length > 0 ? (
          messageDataRoom.map((list: Room) => {
            console.log(list)
            return <MsgList list={list} key={list.roomId} />;
          })
        ) : (
          <>
          <S.EmptyContainer>
            <S.EmptyBox>
              <Message />
              <Text.Body3 color="gray500">받은 쪽지가 없어요.</Text.Body3>
            </S.EmptyBox>
          </S.EmptyContainer>
          </>
        )}
        <Navigation tab={""} />
      </S.MsgContainer>
    </S.Container>
  );
};

export async function getServerSideProps(context: any) {
  const { page, size } = context.query;
  const res = await instance.get(`/messages/rooms?page=${page}&size=${size}`);
  const data = await res.data;
  
  return { props: { data }};
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
  `,

  TopContainer: styled.div`
    position: sticky;
    display: flex;
    padding: 14px 24px;
  `,

  MsgContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: scroll;
  `,

  EmptyContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  EmptyBox: styled.div`
    position: absolute;
    top: 50%;
    display: grid;
    gap: 10px;

    span {
      margin-left: -10px;
    }
  `,
}