import { useState } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IoSearch } from 'react-icons/io5';

interface SearchBarProps {
  setSearchWord: (searchWord: string) => void;
  setSearchType: (searchType: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchWord, setSearchType }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('name');
  const handleSearch = (searchType: string) => {
    setSearchType(searchType);
    setSearchWord(searchTerm);
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
      {/* <button className="button" type="button" onClick={handleSearch}>
        검색
      </button> */}
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
  align-items: center;
  margin-bottom: 20px;
  height: 50px;

  .input {
    flex: 1;
    padding: 8px;
    font-size: 16px;
    // border: 1px solid #ccc;
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
    font-size: 16px;
    color: #fff;
    background-color: #ffd440;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 100%;
    align-items: center;

    // &:hover {
    //   background-color: #0056b3;
    // }
  }
  .button.disable {
    background-color: lightgray;
  }
`;

export default SearchBar;
