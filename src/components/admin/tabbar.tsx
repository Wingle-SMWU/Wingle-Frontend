import styled from 'styled-components'

export default function Tabbar() {
  return (
    <S.Tabbar>
      <S.Content>
        <li>수락대기</li>
        <li>수락완료</li>
        <li>수락거절</li>
      </S.Content>
    </S.Tabbar>
  )
}

const S = {
  Tabbar: styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px 0px 0px 248px;
    gap: 24px;
    width: 1440px;
    height: 44px;
    border-bottom: 1px solid #eeeef2;
    flex: none;
    order: 1;
    flex-grow: 0;
  `,
  Content: styled.ul`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 8px;
    gap: 16px;
    min-width: 63px;
    flex: none;
    flex-grow: 0;
    > li {
      width: 63px;
      height: 27px;
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 150%;
      display: flex;
      align-items: center;
      text-align: center;
      font-family: Pretendard;
      cursor: pointer;
    }
    >li:nth-child(1) {
      color: #222223;
      border-bottom: 2px solid #FF812E;
      padding-bottom: 7px;
    }
    >li:not(first-child) {
      color: #959599;
    }
  `,
}