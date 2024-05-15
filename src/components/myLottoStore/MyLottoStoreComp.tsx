import styled from 'styled-components';
import { useState } from 'react';
import StoreItem from '../list/StoreItem';
import ModalBasic from '../list/Modal';
import LottoStoreItem from '@/models/LottoStoreItem';

const MAX_PAGES_DISPLAY = 10; // Maximum number of pagination links to display
const ITEMS_PER_PAGE = 10;

const MyLottoStoreComp = () => {
  // 보여줄 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const localData = localStorage.getItem('favorites');
  const data: LottoStoreItem[] = localData
    ? JSON.parse(localData).sort((a: LottoStoreItem, b: LottoStoreItem) => b.score - a.score)
    : [];
  const totalCount = data.length;
  const totalPage = Math.ceil(totalCount / ITEMS_PER_PAGE);

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
    <MyLottoStoreCompContainer>
      <div className="title">
        <h2 className="head">나의 로또 판매점 리스트</h2>
      </div>

      <div className="content">
        <div className="content-head">
          <div>판매점 이름</div>
          <div>전화번호</div>
          <div>주소</div>
          <div>1등</div>
          <div>2등</div>
          <div>등수</div>

          <div>즐겨찾기</div>
          <div>상세보기</div>
        </div>
        {modalOpen && <ModalBasic setModalOpen={setModalOpen} selected={selected} />}

        <div className="list">
          {data && data.length > 0 ? (
            data.map((item) => <StoreItem key={item.id} store={item} showModal={showModal} setSelected={setSelected} />)
          ) : (
            <div className="empty">즐겨찾기한 판매점이 없습니다.</div>
          )}
        </div>
      </div>
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
    </MyLottoStoreCompContainer>
  );
};

const MyLottoStoreCompContainer = styled.div`
  justify-content: center;
  text-align: center;
  margin: 30px 150px;
  height: 100%;

  .title {
    padding-bottom: 70px;
    .head {
      padding: 10px;
    }
  }

  .content {
    min-height: 700px;
  }
  .content-head {
    width: 100%;
    display: grid;
    grid-template-columns: 15% 15% 30% 7% 7% 7% 10% 10%;
    background-color: #f8f8f8;
    padding: 15px 10px;
    font-weight: bold;
    border-radius: 5px;

    svg {
      width: 20px;
      fill: #fdd440;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .list {
    width: 100%;
  }

  .loading,
  .empty {
    padding: 100px;
  }

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
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
    cursor: pointer;
  }
`;

export default MyLottoStoreComp;
