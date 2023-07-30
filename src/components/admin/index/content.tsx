import styled from "styled-components";
import { ADMIN_CONTENT_MENU, USER_NATIONALITY } from "@/src/constants/admin";
import { AdminUserResp } from "../../../types/admin/admin";
import Link from "next/link";
import { theme } from "@/src/styles/theme";

type AdminUsersResp = {
  data: AdminUserResp[];
};

export default function Content({ data }: AdminUsersResp) {
  return (
    <S.Content>
      <S.Menu menu={ADMIN_CONTENT_MENU}>
        {ADMIN_CONTENT_MENU.map((menu, idx) => (
          <li key={idx}>
            <p>{menu}</p>
          </li>
        ))}
      </S.Menu>
      <div>
        {data.map((user, idx) => {
          return (
            <Link
              key={user.userId}
              href={`/admin/detail?${user.userId}?${data.length - idx}`}
            >
              <S.Item nation={user.nation}>
                <li>
                  <p>{data.length - idx}</p>
                </li>
                <li>
                  <p>{user.name}</p>
                </li>
                <li>
                  <p>
                    {user.nation === "KR"
                      ? USER_NATIONALITY[0]
                      : !user.nation
                      ? "입력필요"
                      : USER_NATIONALITY[1]}
                  </p>
                </li>
              </S.Item>
            </Link>
          );
        })}
      </div>
    </S.Content>
  );
}

const S = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    position: absolute;
    width: 946px;
    height: 664px;
    left: 248px;
    top: 124px;
    a {
      text-decoration: none;
    }
  `,
  Menu: styled.ul<{ menu: string[] }>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    width: 946px;
    height: 44px;
    flex: none;
    order: 0;
    flex-grow: 0;
    background: #fcfcfe;
    width: 100%;
    > li {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 12px 16px;
      gap: 8px;
      flex: none;
      flex-grow: 0;
      // width: ${({ menu }) => `${100 / menu.length}%`};
      > p {
        height: 20px;
        font-family: "Pretendard Variable", Pretendard;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 140%;
        color: ${theme.color.gray600};
        flex: none;
        flex-grow: 1;
      }
    }
    > li:nth-child(1) {
      width: 112px;
      > p {
        width: 80px;
      }
    }
    > li:nth-child(2) {
      width: 214px;
      > p {
        width: 182px;
      }
    }
    > li:nth-child(3) {
      width: 88px;
      > p {
        width: 48px;
      }
    }
  `,
  Item: styled.ul<{ nation: string | null }>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    width: 946px;
    background: ${theme.color.white};
    flex: none;
    flex-grow: 0;
    border-bottom: 1px solid ${theme.color.gray200};
    &: hover {
      cursor: pointer;
      > li:nth-child(2) {
        opacity: 70%;
      }
    }
    > li {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px 16px;
      gap: 8px;
      flex: none;
      flex-grow: 0;
      text-decoration: none;
      > p {
        width: 182px;
        height: 22px;
        font-family: "Pretendard Variable", Pretendard;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        color: ${theme.color.gray900};
        flex: none;
        flex-grow: 1;
      }
    }
    > li:nth-child(1) {
      width: 112px;
      > p {
        width: 80px;
      }
    }
    > li:nth-child(2) {
      width: 214px;
      > p {
        width: 182px;
      }
    }
    > li:nth-child(3) {
      border: 1px solid ${theme.color.gray200};
      border-radius: 20px;
      padding: 4px 12px;
      margin: auto 0;
      > p {
        width: 100%;
        height: 17px;
        font-family: "Pretendard Variable", Pretendard;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        color: ${theme.color.gray600};
        color: ${({ nation }) =>
          nation === "KR"
            ? theme.color.gray600
            : !nation
            ? "red"
            : theme.color.orange400};
        text-align: center;
        flex: none;
        flex-grow: 0;
      }
    }
    > li:nth-child(4) {
      width: 532px;
    }
  `,
};
