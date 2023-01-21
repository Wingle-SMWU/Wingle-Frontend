import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Text } from "../../ui";

const FooterMenuArr = [
  {
    name: "커뮤니티",
    page: "/community",
    normalImg: "/community/list/comu_normal.svg",
    disableImg: "/community/list/comu_disable.svg",
  },
  {
    name: "쪽지",
    page: "/message",
    normalImg: "/community/list/message_normal.svg",
    disableImg: "/community/list/message_disable.svg",
  },
  {
    name: "마이페이지",
    page: "/mypage",
    normalImg: "/community/list/wingle-manager.svg",
    disableImg: "/community/list/mypage_disable.svg",
  },
];

export default function Footer() {
  const router = useRouter();
  const menu = router.asPath;

  return (
    <Style.Footer>
      {FooterMenuArr.map((el) => (
        <Style.FooterMenu key={el.name} href={el.page}>
          <Style.FooterMenuImg
            src={menu === el.page ? el.normalImg : el.disableImg}
          />
          <Text.Caption2 color={menu === el.page ? "gray900" : "gray500"}>
            {el.name}
          </Text.Caption2>
        </Style.FooterMenu>
      ))}
    </Style.Footer>
  );
}

const Style = {
  Footer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #eeeef2;
  `,

  FooterMenu: styled(Link)`
    width: 104px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12.5px 24px;
    text-decoration: none;
  `,

  FooterMenuImg: styled.img``,
};
