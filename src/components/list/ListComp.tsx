import styled from 'styled-components';
import { useMemo, useState } from 'react';
import useFetchDataAll from '@/hooks/useFetchDataAll';
import SearchBar from './SearchBar';
import List from './List';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 10;

const ListComp = () => {
  // 보여줄 데이터
  const [searchWord, setSearchWord] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, totalCount } = useFetchDataAll(
    'post',
    '/lotto-stores/list',
    useMemo(
      () => ({
        page: currentPage,
        showCount: ITEMS_PER_PAGE,
        searchType,
        searchWord,
      }),
      [currentPage, ITEMS_PER_PAGE, searchType, searchWord]
    ),
    {}
  );
  const totalPage = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <ListcompContainer>
      <div className="title">
        <h2 className="head">로또 판매점 리스트</h2>
      </div>

      <SearchBar setSearchWord={setSearchWord} setSearchType={setSearchType} setCurrentPage={setCurrentPage} />

      <List data={data} loading={loading} />
      <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </ListcompContainer>
  );
};

const ListcompContainer = styled.div`
  justify-content: center;
  text-align: center;
  margin: 30px auto;
  height: 100%;
  width: 65%;

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
`;

export default ListComp;
