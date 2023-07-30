import { Text } from "../../ui";
import { getForums } from "@/src/api/community/get/forums";
import { useQuery } from "react-query";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

type Tab = {
  tab?: boolean;
};

export default function Header({
  myArticle,
  tab,
  onClickTab,
}: {
  myArticle?: boolean;
  tab: string;
  onClickTab: (event: any) => void;
}): JSX.Element {
  const {
    data: TabArr,
    isLoading,
    isError,
    isIdle,
  } = useQuery({
    queryFn: getForums,
    queryKey: ["forums"],
  });

  const router = useRouter();

  if (isLoading) return <div>로딩중</div>;
  if (isError || isIdle) return <div>에러</div>;

  return (
    <S.Wrapper>
      <S.Header>
        {myArticle ? (
          <>
            <Image
              style={{ cursor: "pointer" }}
              src="/community/arrow-back.svg"
              alt=""
              width={24}
              height={24}
              onClick={(): void => {
                router.push("/mypage");
              }}
            />
            <Text.Title1 color="gray900">내가 쓴 게시글</Text.Title1>
          </>
        ) : (
          <Text.Title1 color="gray900">커뮤니티</Text.Title1>
        )}
      </S.Header>
      <S.HeaderBar>
        {TabArr.map((el: { name: string; id: number }) => {
          return myArticle && el.name === "공지" ? (
            <></>
          ) : (
            <S.TextUnderLine tab={el.name === tab} key={el.id}>
              <Text.Title3
                color={el.name === tab ? "gray900" : "gray500"}
                onClick={onClickTab}
                pointer={true}
              >
                {el.name}
              </Text.Title3>
            </S.TextUnderLine>
          );
        })}
      </S.HeaderBar>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    background-color: #fff;
    width: 100%;
    max-width: 500px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    position: fixed;
  `,

  Header: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 14px 24px;
    gap: 12px;
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
    border-bottom: ${({ tab }): string =>
      tab ? "2px solid #ff812e" : "2px solid #fff"};
    padding-bottom: 6px;
  `,
};
