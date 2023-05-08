import styled from "styled-components";
import { useRouter } from "next/router";
import { Text } from "../ui";
import { Room } from "@/src/types/message/roomType";
import Image from "next/image";
import profiledefault from "../../../public/images/profiledefault.png";

const YourInfo = ({ list }: { list: Room }) => {
  const { image, nickname } = list;
  const router = useRouter();

  const handleMoveOpponentInfo = () => {
    // 경로는 임시. 추후에 상대방 프로필 페이지로 이동할 수 있게 수정필요
    router.push(`/ex/${nickname}`);
  };

  return (
    <S.Container onClick={handleMoveOpponentInfo}>
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
        <S.TitleBox>
          <Text.Body5 color="gray900">{nickname}</Text.Body5>
        </S.TitleBox>
      </S.LeftBox>
    </S.Container>
  );
};

const S = {
  Container: styled.div``,

  LeftBox: styled.div`
    display: flex;
    align-items: center;
    margin-top: -30px;
    cursor: pointer;
    margin-left: -7px;
    position: absolute;
    left: 24px;
  `,

  UserImage: styled.img`
    width: 3em;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid blue;
  `,

  TitleBox: styled.div`
    margin-left: 0.9rem;

    span {
      cursor: pointer;
      font-weight: 600;
    }
  `,
};

export default YourInfo;
