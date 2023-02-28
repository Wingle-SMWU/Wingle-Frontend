import styled from "styled-components";
import useMsgAPI from "@/src/pages/api/hooks/message/useMsgAPI";
import { useRouter } from "next/router";

// 쪽지함에서 보는 개별 메시지 리스트

interface IProps {
  roomId: number;
  image: string;
  nation: string;
  nickname: string;
  recentChat: string;
  createdTime: string;
  messageId: number;
  isSender: boolean;
}

function betweenTime(value: string) {
  let today: number | Date = new Date();
  let timeValue: number | Date = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );

  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 30) {
    return `${betweenTimeDay}일 전`;
  }

  const betweenTimeMonth = Math.floor(betweenTime / 60 / 24 / 30);
  if (0 < betweenTimeMonth && betweenTimeMonth < 12) {
    return `${betweenTimeMonth}달 전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
}

const MsgList = (list: IProps) => {
  const { axiosCreateRoom } = useMsgAPI();
  const {
    image,
    nickname,
    createdTime,
    recentChat,
    roomId,
    messageId,
    isSender,
  } = list;

  const router = useRouter();
  const handleMoveChatRoom = () => {
    axiosCreateRoom(messageId).then((res) => {
      router.push(`/messages/:roomId?page=${res}&size=${res}`);
    });
  };
  return (
    <>
      <Container onClick={handleMoveChatRoom}>
        <LeftBox>
          <UserImage src={image} alt="상대 이미지" />
          <LeftContent>
            <LeftDetail>
              <span>{nickname}</span>
              <span>{betweenTime(createdTime)}</span>
            </LeftDetail>
            <p>{recentChat}</p>
          </LeftContent>
        </LeftBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeef2;
  background: #ffffff;
  padding: 1rem;
  cursor: pointer;
`;

const LeftBox = styled.div`
  display: flex;
  width: 100%;
`;

const UserImage = styled.img`
  width: 40px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid red;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #222223;
    word-break: keep-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 450px;
    margin-left: -40px;
  }
`;

const LeftDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-left: 1rem;

  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 140%;
    color: #959599;
    &:first-child {
      font-weight: 500;
      font-size: 14px;
      color: #222223;
    }
  }
`;

export default MsgList;
