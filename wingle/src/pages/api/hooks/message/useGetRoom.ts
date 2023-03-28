import useMsgAPI from "./useMsgAPI";

const useGetRoom = () => {
  const { getAllRoomLists } = useMsgAPI();

  const msgRoomList = async (page: number, size: number) => {
    try {
      await getAllRoomLists(page, size);
    } catch (data) {
      console.log(data);
      console.log("쪽지 불러오기 실패");
    }
  };

  return { msgRoomList };
};

export default useGetRoom;
