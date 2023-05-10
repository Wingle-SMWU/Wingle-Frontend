import styled from "styled-components";
import { useRouter } from "next/router";
import { Text } from "../ui";
import { Room } from "@/src/types/message/roomType";
import Image from "next/image";
import profiledefault from "../../../public/images/profiledefault.png";
import { countryImg } from "../mypage/countryImg";

const YourInfo = ({ list }: { list: Room }) => {
  const { image, nickname, nation } = list;
  const router = useRouter();

  const handleMoveOpponentInfo = () => {
    // 경로는 임시. 추후에 상대방 프로필 페이지로 이동할 수 있게 수정필요
    router.push(`/ex/${nickname}`);
  };

  return (
    <S.Container onClick={handleMoveOpponentInfo}>
      <S.LeftBox>
        <S.ImageBox>
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
          <S.NationIcon src={countryImg(nation)} />
        </S.ImageBox>
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
    position: absolute;
    left: 22px;
  `,

  ImageBox: styled.div`
    position: relative;
    width: 36px;
    height: 36px;
  `,

  NationIcon: styled.img`
    width: 16px;
    height: 16px;
    border-radius: 100px;
    position: absolute;
    right: 0%;
    bottom: 0%;
    z-index: 0;
    cursor: pointer;
    border: 1px solid #ffffff;
  `,

  UserImage: styled.img`
    width: 3.2em;
    height: 3.2rem;
    border-radius: 50%;
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
