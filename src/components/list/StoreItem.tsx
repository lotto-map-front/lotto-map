/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LottoStoreItem from '@/models/LottoStoreItem';

interface StoreItemProps {
  store: LottoStoreItem;
  showModal: () => void;
  setSelected: (id: number) => void;
}

const StoreItem = ({ store, showModal, setSelected }: StoreItemProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // 첫 화면 실행 시 isFavorite 설정
  useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      setIsFavorite(parsedFavorites.includes(store.id));
    }
  }, []);

  const detailClickHandler = (id: number) => {
    setSelected(id);
    showModal();
  };
  // 로컬 스토리지 리스트, isFavorite 상태 토글
  const toggleFavorite = () => {
    const favorites = localStorage.getItem('favorites');
    let updatedFavorites: number[] = [];
    if (favorites) {
      updatedFavorites = JSON.parse(favorites);
    }

    if (isFavorite) {
      // 즐겨찾기에서 제거
      updatedFavorites = updatedFavorites.filter((favId) => favId !== store.id);
    } else {
      // 즐겨찾기에 추가
      updatedFavorites.push(store.id);
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <StoreItemContainer isFavorite={isFavorite}>
      <p className="name">{store.name}</p>
      <p className="phone">{store.phone}</p>
      <p className="address">{store.address}</p>
      <p className="firstPrize">{store.first_prize}</p>
      <p className="secondPrize">{store.second_prize}</p>
      <p className="score">{store.score}</p>

      <p className="star" onClick={toggleFavorite}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700" className={isFavorite ? 'active' : ''}>
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
        </svg>
      </p>
      <button type="button" className="details" onClick={() => detailClickHandler(store.id)}>
        상세보기
      </button>
    </StoreItemContainer>
  );
};

const StoreItemContainer = styled.div<{ isFavorite: boolean }>`
  display: grid;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e9e9eb;
  text-align: center;
  align-items: center;
  grid-template-columns: 15% 15% 30% 7% 7% 7% 10% 10%;
  justify-items: center;
  height: 65px;

  .details {
    background-color: #e9e9eb;
    cursor: pointer;
    border: none;
    height: 30px;
    color: black;
    width: 80%;
  }

  .star {
    cursor: pointer;
    svg {
      width: 20px;
      fill: ${({ isFavorite }) => (isFavorite ? '#fdd440' : '#ccc')};
    }
  }
`;

export default StoreItem;
