import { Text } from "../ui";
import styled from "styled-components";

const Style = {
  InterestBox: styled.div`
    width: fit-content;
    border-radius: 40px;
    padding: 8px 15px;
    background-color: #eeeef2; // 비활성화

    // 활성화됐을때
    // background-color: #FFF3EB;
    // border: 1px solid #FFD7BD;
  `,
};

export default function SelectInterest() {
  return (
    <>
      <Style.InterestBox>
        <Text.Body6 color="gray900">
          {/* {관심사 이름} */}
          운동
        </Text.Body6>
      </Style.InterestBox>
    </>
  );
}
