import { useQuery } from "react-query";
import { getMessageRoom } from "@/src/api/message/messageApi";

const useGetRoom = (page: number, size: number) => {
  const { data: messageDataRoom } = useQuery({
    refetchInterval: 5000,
    queryKey: ["message"],
    queryFn: () => {
      return getMessageRoom(page, size);
    },
  });

  return { messageDataRoom: messageDataRoom };
};

export default useGetRoom;
