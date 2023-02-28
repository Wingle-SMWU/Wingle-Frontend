import useAPI from "./useAPI";

function useMsgAPI() {
  const api = useAPI();
  const getRoomAllMessage = (roomId: number) =>
    api.get(`/messages/rooms?page=${roomId}&size=${roomId}`).then((res) => res);

  const getAllRoomLists = () => api.get(`/messages`).then((res) => res);

  const axiosCreateRoom = (messageId: number) =>
    api.get(`/messages` + messageId).then((res) => res);

  return {
    getRoomAllMessage,
    getAllRoomLists,
    axiosCreateRoom,
  };
}

export default useMsgAPI;
