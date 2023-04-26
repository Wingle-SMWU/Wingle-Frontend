import { Text, Margin } from "../../../components/ui";
import styled from "styled-components";
import useGetMessage from "../../../hooks/message/useGetMessage";
import React, { KeyboardEvent, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SendMsg from "@/src/components/message/sendMsg";
import ReceptionMsg from "@/src/components/message/ReceptionMsg";
import YourInfo from "@/src/components/message/yourInfo";
import MsgInput from "../../../components/message/msgInput";
import Arrow_back from "../../../../public/images/message/arrow_back.svg";
import { useRouter } from "next/router";
import { useMutation, useQueryClient  } from "react-query";
import instance from "../../../api/axiosModul";
import { Message } from "../../../api/message/messageApi";
import { Room } from "../../../api/message/messageApi";


// 쪽지 보내기 - 메시지 내용

interface NewMsgProps {
  roomId: number;
  content: string;
  createdTime: string;
  sender: boolean;
}

export default function MessageSend() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const [text, setText] = useState("");
  const { nickName, roomId } = router.query;
  
  const { page, size } = useParams(); // 채널 구분
  const { roomList, messageList, setMessageList, myInfo, receiverInfo, refetch } = useGetMessage(
    Number(roomId) ?? 0 ,
    Number(page) ?? 1,
    Number(size) ?? 10,
  );



  console.log("roomList",roomList)

  console.log(messageList,myInfo,receiverInfo)
  

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
      mutate(text);
      setText("");
    console.log('엔터 보내기')
    console.log(`메시지 내용 ${text}`)}
  };

  // 마우스로 쪽지 보내기
  const handleClickSendMessage = () => {
    if (!text) return;
    mutate(text);
    setText("");
    console.log('마우스보내기')
    console.log(`메시지 내용 ${text}`)
  };

  const addMsg = async (text: string) => {
    const response = await instance.post(`/messages`,  {
      roomId: Number(roomId),
      content: text,      
    });
    return response.data;
  }


  const { mutate } = useMutation(addMsg, {
    onMutate: async () => {
      await queryClient.cancelQueries('messages')},
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
			refetch();
    },
    onError: (err) => {
      console.log(`실패 ${err}`);}
  });

  useEffect(() => {
    const data = {
      content: newMsg?.content,
      createdTime: newMsg?.createdTime,
    };
    if (newMsg?.sender === true && myInfo?.sender === true && receiverInfo?.sender === false) { 
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
            onClick={() => router.push(`/messages/${roomId}?page=${0}&size=${1000}`, '/messages', { shallow: true })}
          />
          <Margin direction="row" size={13} />
          <Text.Title1 color="gray900">쪽지보내기</Text.Title1>
          <YourInfoBox>
            {messageList?.map((list: Room) => {
              return <YourInfo list={list} key={list.roomId}/>}) 
              }
          </YourInfoBox>
        </TitleBox>
        <MessageRoomList>
          {messageList?.length > 0 ? (
            <>
              {messageList?.map((list: Message) => {
                list.nickname
                const { createdTime, content } = list;
                const newList = { content, createdTime };
                const currentDate = convertDate(String(createdTime));

                if (currentDate !== prevDate) {
                  prevDate = currentDate;
                  if (list?.sender === true) {
                    if (list?.sender === true) {
                      return (
                        <React.Fragment key={currentDate}>
                          <DateBox>
                            <DateDisplay>
                              <span>{currentDate}</span>
                            </DateDisplay>
                          </DateBox>
                          <SendMsg list={{
                            content: list.content,
                            createdTime: String(list.createdTime)
                          }} />
                        </React.Fragment>
                      );
                    } else {
                      prevNickname.nickName = list.nickname;
                      return (
                        <React.Fragment key={currentDate}>
                          <DateBox>
                            <DateDisplay>
                              <span>{currentDate}</span>
                            </DateDisplay>
                          </DateBox>
                          <SendMsg list={{
                            content: list.content,
                            createdTime: String(list.createdTime)
                          }} />
                        </React.Fragment>
                      );
                    }
                  } else {
                    if (list?.sender === false) {
                      return (
                        <React.Fragment key={currentDate}>
                          <DateBox>
                            <DateDisplay>
                              <span>{currentDate}</span>
                            </DateDisplay>
                          </DateBox>
                          <ReceptionMsg list={{
                            content: newList.content,
                            createdTime: String(newList.createdTime)
                          }} />
                        </React.Fragment>
                      );
                    } else {
                      prevNickname.nickName = list.nickname;
                      return (
                        <React.Fragment key={currentDate}>
                          <DateBox>
                            <DateDisplay>
                              <span>{currentDate}</span>
                            </DateDisplay>
                          </DateBox>
                          <ReceptionMsg list={{
                            content: list.content,
                            createdTime: String(list.createdTime)
                          }} />
                        </React.Fragment>
                      );
                    }
                  }
                } else {
                  if (list?.sender === true) {
                    if (prevNickname.nickName === list.nickname) {
                      return <SendMsg key={String(list.createdTime)} list={{
                        content: newList.content,
                        createdTime: String(newList.createdTime)
                      }} />;
                    } else {
                      prevNickname.nickName = list.nickname;
                      return <SendMsg key={String(list.createdTime)} list={{
                        content: list.content,
                        createdTime: String(list.createdTime)
                      }} />;
                    }
                  } else {
                    if (prevNickname.nickName === list.nickname) {
                      return <ReceptionMsg key={String(list.createdTime)} list={{
                        content: newList.content,
                        createdTime: String(newList.createdTime)
                      }} />;
                    } else {
                      prevNickname.nickName = list.nickname;
                      return <ReceptionMsg key={String(list.createdTime)}list={{
                        content: list.content,
                        createdTime: String(list.createdTime)
                      }} />;
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

export async function getServerSideProps(context: any) {
  const { roomId } = context.query;
  const res = await instance.get(`/messages/${roomId}?page=${0}&size=${1000}`);
  const data = await res.data;
  
  return { props: { data }};
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
