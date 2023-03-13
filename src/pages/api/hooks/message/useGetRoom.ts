import useMsgAPI from "./useMsgAPI";

interface Iprops {
  page: number;
  size: number;
}

const useGetRoom = ({ page, size }: Iprops) => {
  const { getAllRoomLists } = useMsgAPI();

  const msgRoomList = async () => {
    try {
      await getAllRoomLists(page, size);
    } catch (data) {
      console.log(data);
      console.log("쪽지 불러오기 실패");
    }
  };

  return [msgRoomList];
};

export default useGetRoom;
