import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Text } from "../../ui";
import useGetProfile from "@/src/hooks/mypage/useGetProfile";
import { theme } from "@/src/styles/theme";

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
    <Style.Wrapper>
      <Style.Box>
        {NavigationMenuArr.map((el) => (
          <Style.NavigationMenu key={el.name} href={el.page}>
            <Style.NavigationMenuImg
              isRadius={el.name === "마이페이지"}
              isActive={props.tab === "mypage"}
              src={menu.includes(el.page) ? el.normalImg : el.disableImg}
            />
            <Text.Caption2
              color={menu.includes(el.page) ? "orange500" : "gray500"}
            >
              {el.name}
            </Text.Caption2>
          </Style.NavigationMenu>
        ))}
      </Style.Box>
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.div`
    width: 100%;
    max-width: 500px;
    height: 72px;
    border-top: 1px solid #eeeef2;
    background-color: #fff;
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
    width: 28px;
    height: 28px;
    border-radius: ${({ isRadius }) => (isRadius ? "50%" : "none")};
    box-shadow: ${({ isRadius, isActive }) =>
      isRadius && isActive ? `0 0 0 1px ${theme.color.orange500}` : "none"};
  `,
};
