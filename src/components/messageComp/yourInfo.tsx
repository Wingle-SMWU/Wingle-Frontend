import styled from "styled-components";
import { useRouter } from "next/router";
import { Text } from "../ui";
import { getImageUrl } from "@/src/modules/utils";
import { countryImg } from "@/src/modules/utils";
import { useRecoilState } from "recoil";
import { recipientUserId } from "@/src/atoms/message/recipientUserId";
import UnivLabel from "@/src/components/ui/univLabel";
interface UserInfo {
  list: {
    recipientSchoolName: string;
    recipientImage: string;
    nickname: string;
    nation: string;
  };
}

const YourInfo = ({ list }: UserInfo) => {
  const router = useRouter();
  const [userRecipientId, setUserRecipientId] = useRecoilState(recipientUserId);
  const { recipientSchoolName, recipientImage, nickname, nation } = list;

  const handleMoveOpponentInfo = async () => {
    if (!!userRecipientId) {
      router.push(`/profile?userID=${userRecipientId}&fromMessages=true`);
    }
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
          <Text.Body5 color="gray900">{nickname}</Text.Body5>
          <UnivLabel univ={recipientSchoolName} />
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
    position: absolute;
    left: 22px;
    cursor: pointer;
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
    border: 1px solid #ffffff;
  `,
  UserImage: styled.img`
    width: 3.2em;
    height: 3.2rem;
    border-radius: 50%;
  `,
  TitleBox: styled.div`
    margin-left: 0.9rem;
    display: flex;
    align-items: center;
    gap: 4px;

    span {
      cursor: pointer;
      font-weight: 600;
    }
  `,
};
export default YourInfo;
