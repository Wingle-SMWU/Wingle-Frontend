import styled from "styled-components";
import useGetRoom from "./api/hooks/message/useGetRoom";
import MsgList from "../components/Message/MsgList";
import { Text } from "../components/ui";
import Message from "../../public/images/message/message.svg";

interface RoomListProps {
  roomId: number;
  image: string;
  nation: string;
  nickname: string;
  recentChat: string;
  createdTime: string;
  messageId: number;
  isSender: boolean;
}

const message = () => {
  const { getMsgRoomList } = useGetRoom();

  return (
    <Container>
      <TopContainer>
        <Text.Title1 color="gray900">쪽지함</Text.Title1>
      </TopContainer>
      <MsgContainer>
        {getMsgRoomList ? (
          getMsgRoomList.map((list: RoomListProps) => {
            return <MsgList list={list} key={list.roomId} />;
          })
        ) : (
          <EmptyContainer>
            <EmptyBox>
              <Message />
              <Text.Body3 color="gray500">받은 쪽지가 없어요.</Text.Body3>
            </EmptyBox>
          </EmptyContainer>
        )}
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
  padding: 14px;
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
