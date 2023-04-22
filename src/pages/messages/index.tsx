/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import useGetRoom from "../../hooks/message/useGetRoom";
import MsgList from "../../components/message/MsgList";
import { Text } from "../../components/ui";
import Message from "../../../public/images/message/message.svg";
import Navigation from "@/src/components/layout/Navigation";
import { Room } from "../../api/message/messageApi";


const message = (page: number , size: number ) => {
  const { messageData } = useGetRoom(0, 10000);

  if (messageData === undefined) {
    return <div>로딩중</div>;
  }

  return (
    <Container>
      <TopContainer>
        <Text.Title1 color="gray900">쪽지함</Text.Title1>
      </TopContainer>
      <MsgContainer>
        {messageData?.length > 0 ? (
          messageData.map((list: Room) => {
            return <MsgList list={list} key={list.roomId} />;
          })
        ) : (
          <>
          <EmptyContainer>
            <EmptyBox>
              <Message />
              <Text.Body3 color="gray500">받은 쪽지가 없어요.</Text.Body3>
            </EmptyBox>
          </EmptyContainer>
          </>
        )}
        <Navigation tab={""} />
      </MsgContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const TopContainer = styled.div`
  position: sticky;
  display: flex;
  padding: 14px 24px;
`;

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
`;

const EmptyBox = styled.div`
  position: absolute;
  top: 50%;
  display: grid;
  gap: 10px;

  span {
    margin-left: -10px;
  }
`;

export default message;
