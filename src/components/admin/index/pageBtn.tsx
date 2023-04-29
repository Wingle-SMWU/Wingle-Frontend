import { theme } from '@/src/styles/theme';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';

type AdminUsersResp = {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageBtn({ totalPages, page, setPage }: AdminUsersResp) {

  const handleChangePage = (e: number) => {
    setPage(e);
  }

  return (
    <S.Button page={page}>
      <Pagination 
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalPages * 10 | 1}
        pageRangeDisplayed={5}
        prevPageText={"<"}  
        nextPageText={">"}
        onChange={handleChangePage}
      />
    </S.Button>
  )
}

const S = {
  Button: styled.ul<{page: number}>`
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
      position: relative;
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
        visibility: ${({page}) => (page === 1 ? 'hidden' : '')};
      }
      :nth-last-child(2) a {
        color: ${theme.color.gray700}; 
      }
    }
    ul.pagination li a {
      font-family: 'Pretendard';
      text-decoration: none;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      color: ${theme.color.gray500};
    }
    ul.pagination li:hover,
    ul.pagination li.active {
      background: ${theme.color.gray200};
      border-radius: 8px;
      cursor: pointer;
      > a {
        color: ${theme.color.gray900};
      }
    }
  `
}