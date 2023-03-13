import { useState } from "react";
import useMsgAPI from "./useMsgAPI";

interface User {
  image: string;
  nickname: string;
  memberId: number;
}

const useGetMessage = (page: number, size: number) => {
  const { getRoomAllMessage } = useMsgAPI();

  const [roomList, setRoomList] = useState<any>([]); // 화면
  const [messageList, setMessageList] = useState<any[]>([]);
  const [myInfo, setMyInfo] = useState<User>();
  const [receiverInfo, setReceiverInfo] = useState<User>();

  const getmessageData = async () => {
    try {
      return getRoomAllMessage(page, size);
    } catch (data: any) {
      setRoomList(data);
      setMessageList(data);
      data.users.map((user: any) => {
        if (user) {
          setMyInfo(user);
        } else {
          setReceiverInfo(user);
        }
      });
    }
  };
  getmessageData();

  return {
    roomList,
    messageList,
    setMessageList,
    myInfo,
    receiverInfo,
  };
};

export default useGetMessage;
