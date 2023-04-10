import styled from 'styled-components'

const dummy = [
  {
    id: '999999',
    name: '금쪽이',
    nationality: '한국인'
  },
  {
    id: '01',
    name: '김첨지',
    nationality: '외국인',
  }
];

export default function Content() {
  return (
    <S.Content>
      <S.Menu>
        <li><p>No</p></li>
        <li><p>Name</p></li>
        <li><p>구분</p></li>
        <li></li>
      </S.Menu>
      <div>
        {dummy.map(user => {
          return (
            <S.Item key={user.id}>
              <li><p>{user.id}</p></li>
              <li><p>{user.name}</p></li>
              <li><p>{user.nationality}</p></li>
              <li>{' '}</li>
            </S.Item>
          )
        })}
      </div>

    </S.Content>
  )
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
  `,
  Menu: styled.ul`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    width: 946px;
    height: 44px;  
    flex: none;
    order: 0;
    flex-grow: 0;
    > li {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background: #FCFCFE;
      padding: 12px 16px;
      gap: 8px;
      flex: none;
      flex-grow: 0;
      > p {
        height: 20px;
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 140%;
        color: #6C6C70;
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
    > li:nth-child(4) {
      width: 532px;
      height: 44px;
    }
  `,
  Item: styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 946px;
  background: #FFFFFF;
  flex: none;
  flex-grow: 0;
  border-bottom: 1px solid #EEEEF2;
  > li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 16px;
    gap: 8px;
    flex: none;
    flex-grow: 0;
    > p {
      width: 182px;
      height: 22px;
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: #222223;
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
    border: 1px solid #EEEEF2;
    border-radius: 20px;
    padding: 4px 12px;
    margin: auto 0;
    > p {
      width: 32px;
      height: 17px;
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      color: #6C6C70;
      flex: none;
      flex-grow: 0;
    }
  }
  > li:nth-child(4) {
    width: 532px;
  }
  `
}