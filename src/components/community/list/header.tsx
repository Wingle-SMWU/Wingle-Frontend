import styled from "styled-components";
import { Text } from "../../ui";

type Tab = {
  tab?: boolean;
};

const TabArr = ["자유", "교류", "공지"];

export default function Header(props: {
  tab: string;
  onClickTab: (event: any) => void;
}) {
  return (
    <>
      <Style.Header>
        <Text.Title1 color="gray900">커뮤니티</Text.Title1>
      </Style.Header>
      <Style.HeaderBar>
        {TabArr.map((el) => (
          <Style.TextUnderLine tab={el === props.tab} key={el}>
            <Text.Title3
              color={el === props.tab ? "gray900" : "gray500"}
              onClick={props.onClickTab}
            >
              {el}
            </Text.Title3>
          </Style.TextUnderLine>
        ))}
      </Style.HeaderBar>
    </>
  );
}

const Style = {
  Header: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 14px 24px;
  `,

  HeaderBar: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #eeeef2;
    padding: 8px 24px 0px 24px;
    gap: 24px;
    z-index: 100;
  `,

  TextUnderLine: styled.div<Tab>`
    border-bottom: ${({ tab }) =>
      tab ? "2px solid #ff812e" : "2px solid #fff"};
    padding-bottom: 6px;
  `,
};
