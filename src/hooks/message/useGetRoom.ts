import { useQuery } from "react-query";
import { getMessageRoom } from "@/src/api/message/messageApi";

const useGetRoom = (page: number, size: number) => {
  const { data: messageDataRoom } = useQuery({
    queryKey: ['message'],
		queryFn: () => { return getMessageRoom(page, size) },
	});

  return { messageDataRoom:  messageDataRoom?.data };
};

export default useGetRoom;

