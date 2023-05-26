import instance from "../axiosModule";
import { GetMessageResponse } from "@/src/types/message/messageType";
import { GetRooms } from "@/src/types/message/roomType";

export const getMessage = async (
  roomId: number,
  page: number,
  size: number
) => {
  const { data: response } = await instance.get<GetMessageResponse>(
    `/messages/${roomId}?page=${0}&size=${1000}`
  );
  return response.data;
};

export const getMessageRoom = async (page: number, size: number) => {
  const { data: response } = await instance.get<GetRooms>(
    `/messages/rooms?page=${page}&size=${size}`
  );
  return response.data;
};
