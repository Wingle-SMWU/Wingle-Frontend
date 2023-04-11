import styled from "styled-components";
import { Text } from "../../ui";
import { useQuery } from "react-query";
import { getForums } from "@/src/api/community/get/forums";

type Tab = {
  tab?: boolean;
};

export default function Header(props: {
  tab: string;
  onClickTab: (event: any) => void;
}) {
  const { data, isLoading, isError } = useQuery({
    queryFn: getForums,
    queryKey: ['forums'],
  });

  if (isLoading) return <div>로딩중</div>
  if (isError) return <div>에러</div>
  
  const TabArr = data.data;
  
  return (
    <>
      <Style.Header>
        <Text.Title1 color="gray900">커뮤니티</Text.Title1>
      </Style.Header>
      <Style.HeaderBar>
        {TabArr.map((el: {name: string, id: number}) => (
          <Style.TextUnderLine tab={el.name === props.tab} key={el.id}>
            <Text.Title3
              color={el.name === props.tab ? "gray900" : "gray500"}
              onClick={props.onClickTab}
            >
              {el.name}
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
  `,

  TextUnderLine: styled.div<Tab>`
    border-bottom: ${({ tab }) =>
      tab ? "2px solid #ff812e" : "2px solid #fff"};
    padding-bottom: 6px;
  `,
};
