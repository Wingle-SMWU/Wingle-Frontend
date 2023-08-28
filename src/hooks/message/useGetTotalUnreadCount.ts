import { useQuery } from "react-query";
import { getUnreadMessageCount } from "@/src/api/message/messageApi";

export default function useGetTotalUnreadCount() {
  const { data: unreadMessageCount } = useQuery({
    refetchInterval: 5000,
    queryKey: ["unReadMessage"],
    queryFn: () => {
      return getUnreadMessageCount();
    },
  });

  return { unreadMessageCount: unreadMessageCount };
}
