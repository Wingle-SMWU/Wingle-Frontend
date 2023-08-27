import styled from "styled-components";
import { useRouter } from "next/router";
import { Room } from "@/src/types/message/roomType";
import betweenTime from "@/src/utils/betweenTime";
import { getImageUrl } from "@/src/modules/utils";
import { countryImg } from "@/src/modules/utils";
import UnivLabel from "@/src/components/ui/univLabel";

const MsgList = ({ list }: { list: Room }) => {
  const {
    image,
    nickname,
    createdTime,
    recentChat,
    roomId,
    nation,
    schoolName,
  } = list;
  const router = useRouter();

  const handleMoveChatRoom = () => {
    router.push(`/messages/${roomId}`, undefined, {});
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "yourInfo",
        JSON.stringify({
          nickname,
          image,
          nation,
          schoolName,
        })
      );
    }
  };
  return (
    <>
      <S.Container onClick={handleMoveChatRoom}>
        <S.Box>
          <S.Detail>
            <S.ImageBox>
              <S.UserImage
                src={image ? image : getImageUrl("기본")}
                alt="프로필 이미지"
                width={35}
                height={35}
              />
              <S.NationIcon src={countryImg(nation)} />
            </S.ImageBox>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <S.HeaderTop>
                <span>{nickname}</span>
                <UnivLabel univ={schoolName} />
                <S.Conunt>10+</S.Conunt>
              </S.HeaderTop>
              <span>{betweenTime(String(createdTime))}</span>
            </div>
          </S.Detail>
          <S.Content>{recentChat}</S.Content>
        </S.Box>
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
    padding: 12px 24px;
    cursor: pointer;
  `,

  Box: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,

  ImageBox: styled.div`
    position: relative;
    width: 36px;
    height: 36px;
  `,

  HeaderTop: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  Conunt: styled.div`
    text-align: center;
    font-size: 10px;
    font-weight: 500;
    line-height: 150%;
    color: #fff;
    background: var(--sub-red-red-500, #f03030);
    border-radius: 8px;
    height: 16px;
    padding: 0px 6px;
  `,

  NationIcon: styled.img`
    width: 16px;
    height: 16px;
    border-radius: 100px;
    position: absolute;
    right: 0%;
    left: 60%;
    bottom: 0%;
    z-index: 0;
    cursor: pointer;
    border: 1px solid #ffffff;
  `,

  UserImage: styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
  `,

  Content: styled.p`
    font-family: "Pretendard Variable", Pretendard;
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
  `,

  Detail: styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    span {
      font-family: "Pretendard Variable", Pretendard;
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
