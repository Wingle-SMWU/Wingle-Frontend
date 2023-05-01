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