import { useQuery } from "react-query";
import { getMessageRoom } from "@/src/api/message/messageApi";

const useGetRoom = (page: number, size: number) => {
  const { data: messageData } = useQuery({
    queryKey: ['message'],
		queryFn: () => { return getMessageRoom(page, size) },
	});

  return { messageData:  messageData?.data };
};

export default useGetRoom;

