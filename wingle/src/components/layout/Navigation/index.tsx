import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Text } from "../../ui";

type Radius = {
  isRadius: boolean;
};

const NavigationMenuArr = [
  {
    name: "커뮤니티",
    page: "/community",
    normalImg: "/community/list/comu-normal.svg",
    disableImg: "/community/list/comu-disable.svg",
  },
  {
    name: "쪽지",
    page: "/message",
    normalImg: "/community/list/message-normal.svg",
    disableImg: "/community/list/message-disable.svg",
  },
  {
    name: "마이페이지",
    page: "/mypage",
    normalImg: "/community/list/wingle-manager.svg",
    disableImg: "/community/list/mypage-disable.svg",
  },
];

export default function Navigation() {
  const router = useRouter();
  const menu = router.asPath;

  return (
    <Style.Wrapper>
      {NavigationMenuArr.map((el) => (
        <Style.NavigationMenu key={el.name} href={el.page}>
          <Style.NavigationMenuImg
            isRadius={el.name === "마이페이지"}
            src={menu.includes(el.page) ? el.normalImg : el.disableImg}
          />
          <Text.Caption2 color={menu.includes(el.page) ? "gray900" : "gray500"}>
            {el.name}
          </Text.Caption2>
        </Style.NavigationMenu>
      ))}
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #eeeef2;
    position: absolute;
    bottom: 0;
  `,

  NavigationMenu: styled(Link)`
    width: 104px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12.5px 24px;
    text-decoration: none;
  `,

  NavigationMenuImg: styled.img<Radius>`
    width: 28px;
    height: 28px;
    border-radius: ${({ isRadius }) => (isRadius ? "50%" : "none")};
  `,
};
