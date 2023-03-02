import useMsgAPI from "./useMsgAPI";

const useGetRoom = () => {
  const { getAllRoomLists } = useMsgAPI();

  const msgRoomList = async () => {
    try {
      return getAllRoomLists();
    } catch (data) {
      console.log(data);
    }
    throw new Error("쪽지 불러오기 실패");
  };

  return [msgRoomList];
};

export default useGetRoom;
