import styled from 'styled-components';

const MAX_PAGES_DISPLAY = 10; // Maximum number of pagination links to display

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
const Pagination = ({ setCurrentPage, currentPage, totalPage }: PaginationProps) => {
  // 페이지네이션
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_DISPLAY / 2));
    const endPage = Math.min(totalPage, startPage + MAX_PAGES_DISPLAY - 1);

    for (let i: number = startPage; i <= endPage; i += 1) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer>
      {totalPage > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} type="button">
            이전
          </button>
          <button onClick={() => goToPage(1)} type="button">
            1
          </button>
          {' *** '}
          {getPageNumbers().map((page) => (
            <button
              type="button"
              key={page}
              onClick={() => goToPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
          {' *** '}
          <button disabled={currentPage === totalPage} onClick={() => goToPage(totalPage)} type="button">
            {totalPage}
          </button>
          <button type="button" disabled={currentPage === totalPage} onClick={() => goToPage(currentPage + 1)}>
            다음
          </button>
        </div>
      )}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  .pagination {
    margin-top: 40px;
  }

  .pagination button {
    margin-right: 5px;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
  }

  .pagination button.active {
    font-weight: bold;
    background-color: #fdd400;
    border-color: #fdd400;
    cursor: pointer;
  }
`;

export default Pagination;
