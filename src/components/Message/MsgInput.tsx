import styled from "styled-components";
import SendDisable from "../../../public/images/message/sendDisable.svg";

interface IconProps {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onCick: () => void;
}

const MsgInput = ({ text, onChange, onKeyDown, onCick }: IconProps) => {
  return (
    <Container>
      <TextBox>
        <TextInput
          value={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="쪽지 내용을 입력해 보세요."
          maxLength={200}
        />
        <SendIcon text={text} onClick={onCick} />
      </TextBox>
    </Container>
  );
};
const Container = styled.div`
  position: sticky;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  border-top: 0.8px solid #eeeef2;
`;

const TextInput = styled.textarea`
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
`;

interface SendIconProps {
  text: string;
}

const SendIcon = styled(SendDisable)<SendIconProps>`
  width: 40px;
  height: 32px;
  padding-right: 24px;
  padding-left: 8px;
  fill: ${(props) => (props.text ? "#49494D" : "#DCDCE0")};
  cursor: pointer;
`;

export default MsgInput;
