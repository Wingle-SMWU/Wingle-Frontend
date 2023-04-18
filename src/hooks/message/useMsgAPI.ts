import instance from "@/src/api/axiosModul";

function useMsgAPI() {
  const getRoomAllMessage = (roomId: number, page: number | string, size: number | string) =>
    instance.get(`/messages/${roomId}?page=${page}&size=${size}`).then((res) => res);

  const getAllRoomLists = (page: number, size: number) =>
    instance.get(`/messages/rooms?page=${page}&size=${size}`).then((res) => res);

  const axiosCreateRoom = () => instance.get(`/messages`).then((res) => res.data);

  return {
    getRoomAllMessage,
    getAllRoomLists,
    axiosCreateRoom,
  };
}

export default useMsgAPI;
