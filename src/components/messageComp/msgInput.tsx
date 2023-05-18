import styled from "styled-components";
import SendDisable from "../../../public/images/message/sendDisable.svg";

interface IconProps {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onCick: () => void;
}

const MsgInput = ({ text, onChange, onKeyDown, onCick }: IconProps) => {
  return (
    <S.Container>
      <S.TextBox>
        <S.TextInput
          value={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="쪽지 내용을 입력해 보세요."
          maxLength={200}
        />
        <S.SendIcon text={text} onClick={onCick} />
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

  TextInput: styled.input`
    border: none;
    width: 100%;
    height: 19px;
    /* height: 1rem; */
    padding: 0.5rem 1.4rem;
    padding-right: 0;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    overflow-y: scroll;
    :focus {
      outline: none;
    }
  `,

  SendIcon: styled(SendDisable)<{ text: string }>`
    width: 40px;
    height: 32px;
    padding-right: 15px;
    padding-left: 8px;
    fill: ${(props) => (props.text ? "#49494D" : "#DCDCE0")};
    cursor: ${({ text }) => (text ? "pointer" : "auto")};
  `,
};

export default MsgInput;
