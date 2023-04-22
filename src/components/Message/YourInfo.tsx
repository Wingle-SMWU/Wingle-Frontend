import styled from "styled-components";
import { useRouter } from "next/router";
import { Text } from "../ui";
import { Room } from "@/src/api/message/messageApi";


// 쪽지보내기 페이지 - 상단에 상대방 프로필 띄워주는 컴포넌트


const YourInfo = ({ list }: { list: Room }) => {
  const { image, nickname } = list;
  const router = useRouter();

  const handleMoveOpponentInfo = () => {
    // 경로는 임시. 추후에 상대방 프로필 페이지로 이동할 수 있게 수정필요
    router.push(`/ex/${nickname}`);
  };

  return (
    <Container onClick={handleMoveOpponentInfo}>
      <LeftBox>
        <UserImg src={image} alt="상대 이미지" />
        <TitleBox>
          <Text.Body5 color="gray900">{nickname}</Text.Body5>
        </TitleBox>
      </LeftBox>
    </Container>
  );
};

const Container = styled.div``;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: -30px;
  cursor: pointer;
  margin-left: -7px;
  position: absolute;
  left: 24px;
`;

const UserImg = styled.img`
  width: 3em;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid red;
`;

const TitleBox = styled.div`
  margin-left: 0.9rem;
  span {
    cursor: pointer;
    font-weight: 600;
  }
`;

export default YourInfo;
