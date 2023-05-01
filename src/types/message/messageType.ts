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

export interface NewMsgProps {
  roomId: number;
  content: string;
  createdTime: string;
  sender: boolean;
}