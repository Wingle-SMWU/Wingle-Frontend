import { Text, Margin } from "../../../components/ui";
import styled from "styled-components";
import useGetMessage from "../../../hooks/message/useGetMessage";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SendMsg from "@/src/components/messageComp/sendMsg";
import ReceptionMsg from "@/src/components/messageComp/receptionMsg";
import YourInfo from "@/src/components/messageComp/yourInfo";
import MsgInput from "../../../components/messageComp/msgInput";
import Arrow_back from "../../../../public/images/message/arrow_back.svg";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import instance from "../../../api/axiosModule";
import { Message, NewMsgProps } from "@/src/types/message/messageType";
import { convertDateYear } from "@/src/utils/convertDateYear";
import Loading from "@/src/components/ui/loadingUI";

export default function MessageSend() {
  const router = useRouter();
  const [text, setText] = useState("");
  const { roomId } = router.query;
  const { page, size } = useParams(); // 채널 구분
  const [yourInfo, setYourInfo] = useState<{
    nickname: string;
    image: string;
    nation: string;
  }>();
  const {
    messageData,
    messageList,
    setMessageList,
    myInfo,
    receiverInfo,
    refetch,
  } = useGetMessage(Number(roomId) ?? 0, Number(page) ?? 1, Number(size) ?? 10);

  let prevNickname = { nickName: "" };
  let prevDate = "";
  const [newMsg, setNewMsg] = useState<NewMsgProps>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const yourInfo = JSON.parse(
        window.sessionStorage.getItem("yourInfo") || "{}"
      );
      setYourInfo(yourInfo);
    }
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageData]);

  const addMsg = async (text: string) => {
    const response = await instance.post(`/messages`, {
      roomId: Number(roomId),
      content: text,
    });
    return response.data;
  };

  const { mutate, isLoading } = useMutation(addMsg, {
    onSuccess: () => {
      setText("");
      refetch();
    },
    onError: (err) => {
      console.log(`실패 ${err}`);
    },
  });

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && e.key === "Enter") {
      return;
    }

    if (e.key === "Enter" && text) {
      e.preventDefault();
      if (!isLoading) mutate(text);
    }
  };

  const handleClickSendMessage = () => {
    if (!text) return;
    mutate(text);
  };

  useEffect(() => {
    const data = {
      content: newMsg?.content,
      createdTime: newMsg?.createdTime,
    };
    if (
      newMsg?.sender === true &&
      myInfo?.sender === true &&
      receiverInfo?.sender === false
    ) {
      setMessageList([...messageList, { ...myInfo, ...data }]);
    } else {
      setMessageList([...messageList, { ...receiverInfo, ...data }]);
    }
  }, [newMsg]);

  if (messageData === undefined) {
    return <Loading />;
  }

  return (
    <>
      <S.Container>
        <S.TitleBox>
          <Arrow_back
            style={{ paddingTop: 5, cursor: "pointer" }}
            onClick={() => router.back()}
          />
          <Margin direction="row" size={13} />
          <Text.Title1 color="gray900">쪽지보내기</Text.Title1>
          <S.YourInfoBox>
            <YourInfo
              list={{
                recipientImage: yourInfo?.image ?? "",
                nickname: yourInfo?.nickname ?? "",
                nation: yourInfo?.nation ?? "",
              }}
            />
          </S.YourInfoBox>
        </S.TitleBox>
        <S.MessageRoomList ref={scrollRef}>
          {messageData ? (
            <>
              {messageData?.messages.map((list: Message) => {
                list.nickname;
                const { createdTime, content } = list;
                const newList = { content, createdTime };
                const currentDate = convertDateYear(String(createdTime));

                if (currentDate !== prevDate) {
                  prevDate = currentDate;
                  if (list?.sender === true) {
                    return (
                      <React.Fragment key={currentDate}>
                        <S.DateBox>
                          <S.DateDisplay>
                            <span>{currentDate}</span>
                          </S.DateDisplay>
                        </S.DateBox>
                        <SendMsg
                          list={{
                            content: list.content,
                            createdTime: String(list.createdTime),
                          }}
                        />
                      </React.Fragment>
                    );
                  } else {
                    if (list?.sender === false) {
                      return (
                        <React.Fragment key={currentDate}>
                          <S.DateBox>
                            <S.DateDisplay>
                              <span>{currentDate}</span>
                            </S.DateDisplay>
                          </S.DateBox>
                          <ReceptionMsg
                            list={{
                              content: newList.content,
                              createdTime: String(newList.createdTime),
                            }}
                          />
                        </React.Fragment>
                      );
                    } else {
                      prevNickname.nickName === list.nickname;
                      return (
                        <React.Fragment key={currentDate}>
                          <S.DateBox>
                            <S.DateDisplay>
                              <span>{currentDate}</span>
                            </S.DateDisplay>
                          </S.DateBox>
                          <ReceptionMsg
                            list={{
                              content: list.content,
                              createdTime: String(list.createdTime),
                            }}
                          />
                        </React.Fragment>
                      );
                    }
                  }
                } else {
                  if (list?.sender === true) {
                    if (prevNickname.nickName === list.nickname) {
                      return (
                        <SendMsg
                          key={String(list.createdTime)}
                          list={{
                            content: newList.content,
                            createdTime: String(newList.createdTime),
                          }}
                        />
                      );
                    } else {
                      prevNickname.nickName === list.nickname;
                      return (
                        <SendMsg
                          key={String(list.createdTime)}
                          list={{
                            content: list.content,
                            createdTime: String(list.createdTime),
                          }}
                        />
                      );
                    }
                  } else {
                    if (prevNickname.nickName === list.nickname) {
                      return (
                        <ReceptionMsg
                          key={String(list.createdTime)}
                          list={{
                            content: newList.content,
                            createdTime: String(newList.createdTime),
                          }}
                        />
                      );
                    } else {
                      prevNickname.nickName === list.nickname;
                      return (
                        <ReceptionMsg
                          key={String(list.createdTime)}
                          list={{
                            content: list.content,
                            createdTime: String(list.createdTime),
                          }}
                        />
                      );
                    }
                  }
                }
              })}
            </>
          ) : (
            <S.Empty></S.Empty>
          )}
        </S.MessageRoomList>
        <MsgInput
          text={text}
          onChange={handleChangeText}
          onKeyDown={handleSendMessage}
          onClick={handleClickSendMessage}
        />
      </S.Container>
    </>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `,

  TitleBox: styled.div`
    position: sticky;
    display: flex;
    padding: 14px 24px;
    background: #ffffff;
    border-bottom: 1px solid #eeeef2;
    box-sizing: border-box;
  `,

  YourInfoBox: styled.div`
    padding-top: 80px;
  `,

  MessageRoomList: styled.div`
    padding: 1rem;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 100%;
  `,

  EmptyMessage: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  `,

  DateBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -5px;
  `,

  DateDisplay: styled.p`
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
      color: #9c9c9c;
    }
  `,

  Empty: styled.div`
    width: 100%;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-weight: 600;
      color: #a7a7a7;
    }
  `,
};
