import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Text } from "../../ui";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";
import { theme } from "@/src/styles/theme";
import useGetTotalUnreadCount from "@/src/hooks/message/useGetTotalUnreadCount";

type Profile = {
  isRadius: boolean;
  isActive: boolean;
};
type Tab = {
  tab: string;
};

export default function Navigation(props: Tab) {
  const router = useRouter();
  const menu = router.asPath;
  const { unreadMessageCount } = useGetTotalUnreadCount();
  const unreadMessage =
    unreadMessageCount?.unreadMessageCount < 10
      ? unreadMessageCount?.unreadMessageCount
      : "10+";

  const { profileData } = useGetProfile();
  const NavigationMenuArr = [
    {
      name: "커뮤니티",
      page: "/community",
      normalImg: "/community/list/comu-normal.svg",
      disableImg: "/community/list/comu-disable.svg",
    },
    {
      name: "쪽지",
      page: "/messages",
      normalImg: "/community/list/message-normal.svg",
      disableImg: "/community/list/message-disable.svg",
    },
    {
      name: "마이페이지",
      page: "/mypage",
      normalImg: `
      ${
        profileData?.image
          ? `${profileData?.image}`
          : "/community/list/wingle-active-default.svg"
      }`,
      disableImg: `
      ${
        profileData?.image
          ? `${profileData?.image}`
          : "/community/list/mypage-disable.svg"
      }`,
    },
  ];

  return (
    <S.Wrapper>
      <S.Box>
        {NavigationMenuArr.map((el) => (
          <S.NavigationMenu key={el.name} href={el.page}>
            <S.NavigationMenuImg
              isRadius={el.name === "마이페이지"}
              isActive={props.tab === "mypage"}
              src={menu.includes(el.page) ? el.normalImg : el.disableImg}
            />
            <Text.Caption2
              color={menu.includes(el.page) ? "orange500" : "gray500"}
            >
              {el.name}
            </Text.Caption2>
            {el.name === "쪽지" && unreadMessage !== 0 && (
              <S.Conunt>{unreadMessage}</S.Conunt>
            )}
          </S.NavigationMenu>
        ))}
      </S.Box>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    width: 100%;
    max-width: 500px;
    height: 72px;
    border-top: 1px solid ${theme.color.gray200};
    background-color: ${theme.color.white};
    position: fixed;
    bottom: 0;
  `,

  Box: styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
  `,

  NavigationMenu: styled(Link)`
    width: 104px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
    padding: 12.5px 24px;
    text-decoration: none;
  `,

  NavigationMenuImg: styled.img<Profile>`
    object-fit: cover;

    width: 28px;
    height: 28px;
    border-radius: ${({ isRadius }) => (isRadius ? "50%" : "none")};
    box-shadow: ${({ isRadius, isActive }) =>
      isRadius && isActive ? `0 0 0 1px ${theme.color.orange500}` : "none"};
  `,

  Conunt: styled.div`
    text-align: center;
    font-size: 10px;
    font-weight: 500;
    line-height: 150%;
    color: #fff;
    background: var(--sub-red-red-500, #f03030);
    border-radius: 8px;
    height: 16px;
    padding: 0px 6px;
    position: absolute;
    margin-left: 25px;
  `,
};
