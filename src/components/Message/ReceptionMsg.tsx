import styled from "styled-components";
import { convertDate } from "./SendMsg";

interface Iprops {
  list: {
    content: string;
    createdTime: string;
  };
}

const ReceptionMsg = ({ list }: Iprops) => {
  const { content, createdTime } = list;
  return (
    <Container>
      <Box>
        <MessageInfoBox>
          <MessageArea>
            <p>{content}</p>
          </MessageArea>
          <span>{convertDate(createdTime)}</span>
        </MessageInfoBox>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

const MessageInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 4px;
  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    font-size: 12px;
    color: #959599;
  }
`;

const MessageArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 12px;
  gap: 8px;
  max-width: 18.2rem;
  background-color: #eeeef2;
  border-radius: 12px;
  p {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    color: #222223;
    font-size: 14px;
  }
`;

export default ReceptionMsg;
