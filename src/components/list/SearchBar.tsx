import { useState } from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  setSearchWord: (searchWord: string) => void;
  setSearchType: (searchType: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchWord, setSearchType }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('name');
  const handleSearch = () => {
    setSearchWord(searchTerm);
    setSearchType(type);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // 엔터 키가 눌리면 검색 실행
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
      <button className="button" type="button" onClick={handleSearch}>
        검색
      </button>
      <button
        className={type === 'name' ? 'button active' : 'button disable'}
        type="button"
        onClick={() => {
          setType(type === 'name' ? 'address' : 'name');
          handleSearch();
        }}
      >
        name
      </button>
      <button
        className={type === 'address' ? `button active` : 'button disable'}
        type="button"
        onClick={() => {
          setType(type === 'name' ? 'address' : 'name');
          handleSearch();
        }}
      >
        address
      </button>
    </SearchContainer>
  );
};

// 스타일드 컴포넌트 정의
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .input {
    flex: 1;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;

    &:focus {
      border-color: #007bff;
    }
  }

  .button {
    margin-left: 10px;
    padding: 8px 16px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 100%;

    &:hover {
      background-color: #0056b3;
    }
  }
  .button.disable {
    background-color: lightgray;
  }
`;

export default SearchBar;
