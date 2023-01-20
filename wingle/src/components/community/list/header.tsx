import styled from "styled-components";
import { Text } from "../../ui";

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
  `,

  TextUnderLineOrange: styled.div`
    border-bottom: 2px solid #ff812e;
    padding-bottom: 6px;
  `,

  TextUnderLineNone: styled.div`
    border-bottom: 2px solid #fff;
    padding-bottom: 6px;
  `,
};

export default function Header(props: {
  tab: string;
  onChangeTab: (event: any) => void;
}) {
  return (
    <>
      <Style.Header>
        <Text.Title2 color="gray900">커뮤니티</Text.Title2>
      </Style.Header>
      <Style.HeaderBar>
        {props.tab === "자유" ? (
          <Style.TextUnderLineOrange>
            <Text.Title3 color="gray900" onClick={props.onChangeTab}>
              자유
            </Text.Title3>
          </Style.TextUnderLineOrange>
        ) : (
          <Style.TextUnderLineNone>
            <Text.Title3 color="gray500" onClick={props.onChangeTab}>
              자유
            </Text.Title3>
          </Style.TextUnderLineNone>
        )}
        {props.tab === "교류" ? (
          <Style.TextUnderLineOrange>
            <Text.Title3 color="gray900" onClick={props.onChangeTab}>
              교류
            </Text.Title3>
          </Style.TextUnderLineOrange>
        ) : (
          <Style.TextUnderLineNone>
            <Text.Title3 color="gray500" onClick={props.onChangeTab}>
              교류
            </Text.Title3>
          </Style.TextUnderLineNone>
        )}
        {props.tab === "공지" ? (
          <Style.TextUnderLineOrange>
            <Text.Title3 color="gray900" onClick={props.onChangeTab}>
              공지
            </Text.Title3>
          </Style.TextUnderLineOrange>
        ) : (
          <Style.TextUnderLineNone>
            <Text.Title3 color="gray500" onClick={props.onChangeTab}>
              공지
            </Text.Title3>
          </Style.TextUnderLineNone>
        )}
      </Style.HeaderBar>
    </>
  );
}
