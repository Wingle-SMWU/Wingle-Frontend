import { ADMIN_TAB_LIST } from '@/src/constants/constants';
import styled from 'styled-components';

type TabbarFactor = {
  currIdx: number;
  handleClickTabBar: (idx: number) => void;
}

export default function Tabbar({ currIdx, handleClickTabBar }: TabbarFactor) {
  return (
    <S.Tabbar>
      <S.Content>
        {ADMIN_TAB_LIST.map((el: string, idx: number): JSX.Element => (
          <li 
            key={idx} 
            className={idx === currIdx ? 'selected' : ''} 
            onClick={() => handleClickTabBar(idx)}
          >{el}</li>
        ))}
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
    width: 100%;
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
      justify-content: center;
      text-align: center;
      font-family: Pretendard;
      cursor: pointer;
      color: #959599;
      &:hover {
        color: #222223
      }
    }
    .selected {
      color: #222223;
      border-bottom: 2px solid #FF812E;
      padding-bottom: 7px;
    }
  `,
}