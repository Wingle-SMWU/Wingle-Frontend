import useAPI from "../useAPI";

function useMsgAPI() {
  const api = useAPI();

  const getRoomAllMessage = (page: number, size: number) =>
    api
      .get(`/messages/:roomId?page=${page}&size=${size}`)
      .then((res) => res.data);

  const getAllRoomLists = (page: number, size: number) =>
    api.get(`/messages/rooms?page=${page}&size=${size}`).then((res) => res);

  const axiosCreateRoom = () => api.get(`/messages`).then((res) => res.data);

  return {
    getRoomAllMessage,
    getAllRoomLists,
    axiosCreateRoom,
  };
}

export default useMsgAPI;
