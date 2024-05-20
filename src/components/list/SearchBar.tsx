import { useState } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IoSearch } from 'react-icons/io5';
import { tablets } from '@/common/responsive';

interface SearchBarProps {
  setSearchWord: (searchWord: string) => void;
  setSearchType: (searchType: string) => void;
  setCurrentPage: (searchType: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchWord, setSearchType, setCurrentPage }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('name');
  const handleSearch = (searchType: string) => {
    setSearchType(searchType);
    setSearchWord(searchTerm);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(type); // 엔터 키가 눌리면 검색 실행
    }
  };

  return (
    <SearchContainer>
      <input
        className="input"
        type="text"
        placeholder="검색어를 입력하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러
      />

      <button
        className={type === 'name' ? 'button active' : 'button disable'}
        type="button"
        onClick={() => {
          setType('name');
          handleSearch('name');
        }}
      >
        {'판매처 검색 '}
        <IoSearch />
      </button>
      <button
        className={type === 'address' ? `button active` : 'button disable'}
        type="button"
        onClick={() => {
          setType('address');
          handleSearch('address');
        }}
      >
        {'주소로 검색 '}
        <IoSearch />
      </button>
    </SearchContainer>
  );
};

// 스타일드 컴포넌트 정의
const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  height: 45px;
  font-size: 13px;

  .input {
    flex: 1;
    padding: 5px 15px;
    border: none;
    border-radius: 4px;
    outline: none;
    background-color: #f8f8f8;
    height: 100%;

    &:focus {
      border-color: #007bff;
    }
  }

  .button {
    margin-left: 10px;
    padding: 8px 16px;
    color: #fff;
    background-color: #ffd440;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 100%;
    align-items: center;
    ${tablets({
      fontSize: '12px',
      padding: '5px',
    })}
  }
  .button.disable {
    background-color: lightgray;
  }
`;

export default SearchBar;
