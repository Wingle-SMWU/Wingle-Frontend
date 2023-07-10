import styled from "styled-components";
import { convertTime } from "@/src/utils/convertTime";

interface Iprops {
  list: {
    content: string;
    createdTime: string;
  };
}

const ReceptionMsg = ({ list }: Iprops) => {
  const { content, createdTime } = list || {};
  return (
    <S.Container>
      <S.Box>
        <S.MessageInfoBox>
          <S.MessageArea>
            <p
              style={{
                whiteSpace: "pre-line",
              }}
            >
              {content}
            </p>
          </S.MessageArea>
          <span>{convertTime(createdTime)}</span>
        </S.MessageInfoBox>
      </S.Box>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;
  `,

  Box: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
  `,

  MessageInfoBox: styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 4px;
    span {
      font-family: "Pretendard Variable", Pretendard;
      font-style: normal;
      font-weight: 500;
      line-height: 140%;
      font-size: 12px;
      color: #959599;
    }
  `,

  MessageArea: styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 8px 12px;
    gap: 8px;
    max-width: 24rem;
    margin-left: 10px;
    background-color: #eeeef2;
    border-radius: 12px;
    p {
      font-family: "Pretendard Variable", Pretendard;
      font-style: normal;
      font-weight: 500;
      line-height: 140%;
      color: #222223;
      font-size: 14px;
    }
  `,
};

export default ReceptionMsg;
