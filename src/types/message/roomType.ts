export interface GetRooms {
  status: number;
  message: string;
  data: Room[];
}

export interface Room {
  roomId: number;
  image: string;
  nation: string;
  nickname: string;
  recentChat: string;
  createdTime: Date;
}

export interface RoomNumberResponse {
  roomId: number;
  image: null;
  nation: null;
  nickname: null;
  recentChat: null;
  createdTime: null;
}
