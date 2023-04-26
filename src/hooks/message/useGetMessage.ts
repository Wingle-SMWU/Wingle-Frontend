import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../atoms/temp";
import { Message, getMessage } from "@/src/api/message/messageApi";

const useGetMessage = (roomId: number , page: number , size: number ) => {
  const userid = useRecoilValue(userIdState);
  const [roomList, setRoomList] = useState<any>([]); // 화면
  const [messageList, setMessageList] = useState<any>([]);
  const [myInfo, setMyInfo] = useState<Message>();
  const [receiverInfo, setReceiverInfo] = useState<Message>();
  
  const { refetch } = useQuery({
    enabled: roomId !== 0,
    refetchOnWindowFocus: false,
    queryKey: ["message", page],
    queryFn: () => { return getMessage(roomId, page, size)},
    onSuccess: (item) => {
      console.log("Item",item)
      setRoomList(item.data);
      setMessageList(item.data);
      item.data?.map(((message:Message) => {
        if (message.messageId === userid) {
          setMyInfo(message);
        } else {
          setReceiverInfo(message);
        }
      }))
    },
  });

  return {
    roomList,
    refetch,
    messageList,
    setMessageList,
    myInfo,
    receiverInfo,
  };
};

export default useGetMessage;
