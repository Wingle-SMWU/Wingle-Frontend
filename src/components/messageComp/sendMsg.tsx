import styled from "styled-components";
import { convertTime } from "@/src/utils/convertTime";

interface Iprops {
  list: {
    content: string;
    createdTime: string;
  };
}

const SendMsg = ({ list }: Iprops) => {
  const { content, createdTime } = list;

  return (
    <S.Container>
      <S.Box>
        <S.MessageInfoBox>
          <S.DateBox>{convertTime(createdTime)}</S.DateBox>
          <S.MessageContainer>
            <p
              style={{
                whiteSpace: "pre-line",
              }}
            >
              {content}
            </p>
          </S.MessageContainer>
        </S.MessageInfoBox>
      </S.Box>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 1rem;
    }
  `,

  Box: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 0.3rem;
  `,

  MessageInfoBox: styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 0px;
    gap: 4px;
  `,

  DateBox: styled.span`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 140%;
    color: #959599;
  `,

  MessageContainer: styled.div`
    max-width: 29rem;
    line-height: 22.4px;
    margin-right: 10px;
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
  `,
};

export default SendMsg;
