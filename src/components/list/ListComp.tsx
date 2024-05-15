import styled from 'styled-components';
import { useMemo, useState } from 'react';
import useFetchDataAll from '@/hooks/useFetchDataAll';
import StoreItem from './StoreItem';
import SearchBar from './SearchBar';
import ModalBasic from './Modal';

const ITEMS_PER_PAGE = 13; // Number of items per page
const MAX_PAGES_DISPLAY = 10; // Maximum number of pagination links to display

const ListComp = () => {
  // 보여줄 데이터
  const [searchWord, setSearchWord] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const count = 13;
  const { data, loading, totalCount } = useFetchDataAll(
    'post',
    '/lotto-stores/list',
    useMemo(
      () => ({
        page: currentPage,
        showCount: count,
        searchType,
        searchWord,
      }),
      [currentPage, count, searchType, searchWord]
    ),
    {}
  );
  const totalPage = Math.ceil(totalCount / count);

  // 검색 시 데이터 필터링, 페이지 1번으로, 필터된 데이터
  // const handleSearch = () => {
  //   setCurrentPage(1);
  // };

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

  // 모달

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<number | undefined>();

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <ListcompContainer>
      <div className="title">
        <h2 className="head">로또 판매점 리스트</h2>
        <div className="update">최근 업데이트일: 2024년 05월 13일</div>
      </div>

      <SearchBar setSearchWord={setSearchWord} setSearchType={setSearchType} />

      <div className="content">
        <div className="content-head">
          <div>판매점 이름</div>
          <div>전화번호</div>
          <div>주소</div>
          <div>1등 당첨</div>
          <div>2등 당첨</div>
          <div>등수</div>
          <div>상세보기</div>
        </div>
        {modalOpen && <ModalBasic setModalOpen={setModalOpen} selected={selected} />}

        {loading ? (
          <div className="loading">로딩 중...</div>
        ) : (
          <div className="list">
            {data && data.length > 0 ? (
              data
                .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                .map((item) => <StoreItem key={item.id} store={item} showModal={showModal} setSelected={setSelected} />)
            ) : (
              <div className="empty">해당 조건의 판매점이 없습니다.</div>
            )}
          </div>
        )}
      </div>
      {totalPage > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} type="button">
            이전
          </button>
          <button disabled={currentPage <= 3} onClick={() => goToPage(currentPage - 1)} type="button">
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
          <button
            disabled={currentPage === totalPage || currentPage === totalPage - 1}
            onClick={() => goToPage(currentPage - 1)}
            type="button"
          >
            {totalPage}
          </button>
          <button type="button" disabled={currentPage === totalPage} onClick={() => goToPage(currentPage + 1)}>
            다음
          </button>
        </div>
      )}
    </ListcompContainer>
  );
};

const ListcompContainer = styled.div`
  justify-content: center;
  text-align: center;
  margin: 30px 150px;
  height: 100%;

  .title {
    padding-bottom: 70px;
    .head {
      padding: 10px;
    }
    .update {
      color: gray;
      font-size: 12px;
    }
  }

  .content {
    height: 80%;
  }

  .content-head {
    width: 100%;
    display: grid;
    grid-template-columns: 15% 15% 30% 10% 10% 10% 10%;
    background-color: #f8f8f8;
    padding: 15px 10px;
    font-weight: bold;
    border-radius: 5px;
  }

  .list {
    width: 100%;
  }

  .loading,
  .empty {
    padding: 100px;
  }

  .pagination {
    margin-top: 20px;
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
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }
`;

export default ListComp;
