import styled from "styled-components";
import { useRouter } from "next/router";
import { Room } from "@/src/types/message/roomType";
import betweenTime from "@/src/utils/betweenTime";
import Image from "next/image";
import profiledefault from "../../../public/images/profiledefault.png";

const MsgList = ({ list }: { list: Room }) => {
  const { image, nickname, createdTime, recentChat, roomId } = list;
  const router = useRouter();

  const handleMoveChatRoom = () => {
    router.push(`/messages/${roomId}?page=${0}&size=${1000}`);
  };
  return (
    <>
      <S.Container onClick={handleMoveChatRoom}>
        <S.LeftBox>
          {image ? (
            <S.UserImage src={image} alt="상대 이미지" />
          ) : (
            <Image
              src="/images/message/profiledefault.png"
              alt="기본 프로필 이미지"
              width={35}
              height={35}
            />
          )}
          <S.LeftContent>
            <S.LeftDetail>
              <span>{nickname}</span>
              <span>{betweenTime(String(createdTime))}</span>
            </S.LeftDetail>
            <p>{recentChat}</p>
          </S.LeftContent>
        </S.LeftBox>
      </S.Container>
    </>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eeeef2;
    background: #ffffff;
    padding: 1rem;
    cursor: pointer;
  `,

  LeftBox: styled.div`
    display: flex;
    width: 100%;
  `,

  UserImage: styled.img`
    width: 40px;
    height: 36px;
    border-radius: 50%;
  `,

  LeftContent: styled.div`
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
  `,

  LeftDetail: styled.div`
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
  `,
};

export default MsgList;
