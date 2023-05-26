import { useState } from "react";
import { useQuery } from "react-query";
import { Message } from "@/src/types/message/messageType";
import { getMessage } from "@/src/api/message/messageApi";

const useGetMessage = (roomId: number, page: number, size: number) => {
  const [messageList, setMessageList] = useState<any>([]);
  const [myInfo, setMyInfo] = useState<Message>();
  const [receiverInfo, setReceiverInfo] = useState<Message>();

  const handleInfoUpdate = (message: Message) => {
    if (message.sender) {
      setMyInfo(message);
    } else {
      setReceiverInfo(message);
    }
  };

  const { data: messageData, refetch } = useQuery({
    enabled: roomId !== 0 && roomId !== null,
    refetchInterval: 2000,
    queryKey: ["message", roomId],
    queryFn: () => {
      return getMessage(roomId, page, size);
    },
    onSuccess: (item) => {
      setMessageList(item);
      item?.messages.forEach((message) => {
        handleInfoUpdate(message);
      });
    },
  });

  return {
    refetch,
    messageList,
    setMessageList,
    myInfo,
    receiverInfo,
    messageData: messageData,
  };
};

export default useGetMessage;
