import styled from "styled-components";
import { useRouter } from "next/router";
import { Text } from "../ui";
import { getImageUrl } from "@/src/modules/utils";
import { countryImg } from "@/src/modules/utils";

interface UserInfo {
  list: {
    recipientImage: string;
    nickname: string;
    nation: string;
  };
}

const YourInfo = ({ list }: UserInfo) => {
  const { recipientImage, nickname, nation } = list;
  const router = useRouter();

  const handleMoveOpponentInfo = () => {
    // 경로는 임시. 추후에 상대방 프로필 페이지로 이동할 수 있게 수정 필요
    router.push(`/ex/${nickname}`);
  };

  return (
    <S.Container onClick={handleMoveOpponentInfo}>
      <S.LeftBox>
        <S.ImageBox>
          <S.UserImage
            src={recipientImage ? recipientImage : getImageUrl("기본")}
            alt="프로필 이미지"
            width={35}
            height={35}
          />
          <S.NationIcon src={countryImg(nation)} />
        </S.ImageBox>
        <S.TitleBox>
          <Text.Body5 color="gray900">{list.nickname}</Text.Body5>
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
