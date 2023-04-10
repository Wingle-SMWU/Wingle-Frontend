import Pagination from 'react-js-pagination';
import styled from 'styled-components';


export default function PageBtn() {
  return (
    <S.Button>
      <Pagination 
        activePage={1}
        itemsCountPerPage={10}
        totalItemsCount={55}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={() => console.log('zz')}
      />
    </S.Button>
  )
}

const S = {
  Button: styled.ul`
    position: absolute;
    width: 248px;
    height: 40px;
    left: 598px;
    top: 839px;
    display: flex;
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 8px;
      gap: 8px;
    }
    ul.pagination li {
      display: inline-block;
      width: 40px;  
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: none;
      flex-grow: 0;
      :first-child, :last-child {
        display: none;
      }
      :nth-child(2) {
        display: none;
      }
      :nth-last-child(2) a {
        color: #49494D;
      }
    }
    ul.pagination li a {
      font-family: 'Pretendard';
      text-decoration: none;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      color: #959599;
    }
    ul.pagination li:hover,
    ul.pagination li.active {
      background: #EEEEF2;
      border-radius: 8px;
      cursor: pointer;
      > a {
        color: #222223;
      }
    }
  `
}