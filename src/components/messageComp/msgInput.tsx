import styled from "styled-components";
import SendDisable from "../../../public/images/message/sendDisable.svg";

interface IconProps {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onClick: () => void;
}

const MsgInput = ({ text, onChange, onKeyDown, onClick }: IconProps) => {
  return (
    <S.Container>
      <S.TextBox>
        <S.TextInput
          value={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="내용을 입력하세요."
          maxLength={200}
        />
        <S.SendIcon text={text} onClick={onClick} />
      </S.TextBox>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    position: sticky;
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
  `,

  TextBox: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 56px;
    border-top: 0.8px solid #eeeef2;
  `,

  TextInput: styled.textarea`
    border: none;
    width: 100%;
    padding: 0.5rem 1.4rem;
    padding-right: 0;
    padding-left: 24px;
    margin-top: 1.4rem;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    max-height: 33px;
    overflow-y: scroll;
    resize: none;

    :focus {
      outline: none;
    }
  `,

  SendIcon: styled(SendDisable)<{ text: string }>`
    width: 40px;
    height: 32px;
    padding-right: 24px;
    padding-left: 8px;
    fill: ${(props) => (props.text ? "#49494D" : "#DCDCE0")};
    cursor: ${({ text }) => (text ? "pointer" : "auto")};
  `,
};

export default MsgInput;
