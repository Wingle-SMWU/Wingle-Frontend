import { Text, Margin } from "../components/ui";
import styled from "styled-components";
import useGetMessage from "../hooks/message/useGetMessage";
import React, { KeyboardEvent, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SendMsg from "../components/Message/SendMsg";
import ReceptionMsg from "../components/Message/ReceptionMsg";
import YourInfo from "../components/Message/YourInfo";
import MsgInput from "../components/Message/MsgInput";
import Arrow_back from "../../public/images/message/arrow_back.svg";
import { useRouter } from "next/router";

// 쪽지 보내기 - 메시지 내용

interface NewMsgProps {
  roomId: number;
  content: string;
  createdTime: string;
}

export default function MessageSend() {
  const router = useRouter();

  const [text, setText] = useState("");
  const { nickName, id } = useParams();
  const { page, size } = useParams(); // 채널 구분
  const { roomList, messageList, setMessageList, myInfo, receiverInfo } = useGetMessage(
    page!,
    size!
  );
  const { image, nickname } = roomList;

  const client: any = useRef({});
  let prevNickname = { nickName: "" };
  let prevDate = "";
  const [newMsg, setNewMsg] = useState<NewMsgProps>();

  // 쪽지 리스트 누르면 보이는 메시지 보내기에 들어갈 메시지 내용
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 엔터키로 쪽지 보내기
  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && text) {
      publish(text);
    }
  };

  // 마우스로 쪽지 보내기
  const handleClickSendMessage = () => {
    if (!text) return;
    publish(text);
  };

  const publish = (text: string) => {
    if (!client.current.connected) return;
    client.current.publish({
      destination: `/messages`,
      body: JSON.stringify({
        roomId: id,
        content: text,
      }),
    });
    setText("");
  };

  useEffect(() => {
    const data = {
      content: newMsg?.content,
      createdTime: newMsg?.createdTime,
    };
    if (newMsg?.roomId === myInfo?.memberId) {
      setMessageList([...messageList, { ...myInfo, ...data }]);
    } else {
      setMessageList([...messageList, { ...receiverInfo, ...data }]);
    }
  }, [newMsg]);

  const convertDate = (data: string) => {
    const newDate = new Date(data).toLocaleString().split(".").slice(0, 3);
    return `${newDate[0]}년 ${newDate[1]}월 ${newDate[2]}일`;
  };

  return (
    <>
      <Container>
        <TitleBox>
          <Arrow_back
            style={{ paddingTop: 5, cursor: "pointer" }}
            onClick={() => router.push("/message")}
          />
          <Margin direction="row" size={13} />
          <Text.Title1 color="gray900">쪽지보내기</Text.Title1>
          <YourInfoBox>
            <YourInfo image={image} nickName={nickName} />
          </YourInfoBox>
        </TitleBox>
        <MessageRoomList>
          {messageList.length ? (
            <>
              {messageList?.map((list: any, i: number) => {
                const { createdTime, content } = list;
                const newList = { content, createdTime };
                const currentDate = convertDate(createdTime);

                if (currentDate !== prevDate) {
                  prevDate = currentDate;
                  if (list?.nickName === nickname) {
                    if (prevNickname === list.nickName) {
                      return (
                        <React.Fragment key={currentDate}>
                          <DateBox>
                            <DateDisplay>
                              <span>{currentDate}</span>
                            </DateDisplay>
                          </DateBox>
                          <SendMsg list={newList} />
                        </React.Fragment>
                      );
                    } else {
                      prevNickname = list.nickName;
                      return (
                        <React.Fragment key={currentDate}>
                          <DateBox>
                            <DateDisplay>
                              <span>{currentDate}</span>
                            </DateDisplay>
                          </DateBox>
                          <SendMsg list={list} />
                        </React.Fragment>
                      );
                    }
                  } else {
                    if (prevNickname === list.nickName) {
                      return (
                        <React.Fragment key={currentDate}>
                          <DateBox>
                            <DateDisplay>
                              <span>{currentDate}</span>
                            </DateDisplay>
                          </DateBox>
                          <ReceptionMsg list={newList} />
                        </React.Fragment>
                      );
                    } else {
                      prevNickname = list.nickName;
                      return (
                        <React.Fragment key={currentDate}>
                          <DateBox>
                            <DateDisplay>
                              <span>{currentDate}</span>
                            </DateDisplay>
                          </DateBox>
                          <ReceptionMsg list={list} />
                        </React.Fragment>
                      );
                    }
                  }
                } else {
                  if (list?.nickName === nickname) {
                    if (prevNickname === list.nickName) {
                      return <SendMsg key={createdTime} list={newList} />;
                    } else {
                      prevNickname = list.nickName;
                      return <SendMsg key={createdTime} list={list} />;
                    }
                  } else {
                    if (prevNickname === list.nickName) {
                      return <ReceptionMsg key={createdTime} list={newList} />;
                    } else {
                      prevNickname = list.nickName;
                      return <ReceptionMsg key={createdTime} list={list} />;
                    }
                  }
                }
              })}
            </>
          ) : (
            <Empty>
              <p>임시</p>
            </Empty>
          )}
        </MessageRoomList>
        <MsgInput
          text={text}
          onChange={handleChangeText}
          onKeyDown={handleSendMessage}
          onCick={handleClickSendMessage}
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TitleBox = styled.div`
  position: sticky;
  display: flex;
  padding: 14px 24px;
  background: #ffffff;
  border-bottom: 1px solid #eeeef2;
  box-sizing: border-box;
`;

const YourInfoBox = styled.div`
  padding-top: 80px;
`;

const MessageRoomList = styled.div`
  padding: 1rem;
  box-sizing: border-box;

  overflow-y: scroll;
  height: 100%;
`;

const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -5px;
`;

const DateDisplay = styled.p`
  justify-content: center;
  box-sizing: border-box;
  margin: 1.2rem 0;
  padding: 5px 10px;
  text-align: center;
  width: 110px;
  height: 25px;
  background: #fcfcfe;
  border: 1px solid #dcdce0;
  border-radius: 23px;

  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 140%;
    color: #6c6c70;
  }
`;

const Empty = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-weight: 600;
    color: #a7a7a7;
  }
`;
