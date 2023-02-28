import styled from "styled-components";

export const convertDate = (data: string) => {
  const newDate = new Date(data).toLocaleTimeString().split(" ");
  const hour = newDate[0];
  const min = newDate[1].split(":").slice(0, 2).join(":");
  const answer = `${hour} ${min}`;
  return answer;
};

interface Iprops {
  list: {
    content: string;
    createdTime: string;
  };
}

const SendMsg = ({ list }: Iprops) => {
  const { content, createdTime } = list;
  return (
    <Container>
      <Box>
        <MessageInfoBox>
          <Date>{convertDate(createdTime)}</Date>
          <MessageContainer>
            <p>{content}</p>
          </MessageContainer>
        </MessageInfoBox>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 1rem;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 0.3rem;
`;

const MessageInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 4px;
`;

const Date = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  color: #959599;
`;

const MessageContainer = styled.div`
  max-width: 18.2rem;
  line-height: 22.4px;
  background-color: #ff812e;
  border-radius: 12px;
  padding: 8px 12px;
  gap: 8px;

  p {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #ffffff;
  }
`;

export default SendMsg;
