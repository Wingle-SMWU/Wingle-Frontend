import instance from "../axiosModul";

export interface GetMessageResponse {
  status:  number;
  message: string;
  data:    Message[];
}

export interface Message {
  messageId:   number;
  nickname:    string;
  content:     string;
  createdTime: Date;
  sender:      boolean;
}

export interface GetRooms {
  status:  number;
  message: string;
  data:    Room[];
}

export interface Room {
  roomId:      number;
  image:       string;
  nation:      string;
  nickname:    string;
  recentChat:  string;
  createdTime: Date;
}

export const getMessage = async (roomId: number, page: number , size: number ) => {
  const response = await instance.get<GetMessageResponse>(`/messages/${roomId}?page=${page}&size=${size}`);
  return response.data;
};

export const getMessageRoom = async (page: number , size: number ) => {
  try{ 
  const response = await instance.get<GetRooms>(`/messages/rooms?page=${page}&size=${size}`);
  return response.data;
  } catch {
    console.log('실패')
  }
};
