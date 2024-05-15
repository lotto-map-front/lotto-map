import styled from 'styled-components';
import LottoStoreItem from '@/models/LottoStoreItem';

interface StoreItemProps {
  store: LottoStoreItem;
  showModal: () => void;
  setSelected: (id: number) => void;
}

const StoreItem = ({ store, showModal, setSelected }: StoreItemProps) => {
  const detailClickHandler = (id: number) => {
    setSelected(id);
    showModal();
  };

  return (
    <StoreItemContainer>
      <p className="name">{store.name}</p>
      <p className="phone">{store.phone}</p>
      <p className="address">{store.address}</p>
      <p className="firstPrize">{store.first_prize}</p>
      <p className="secondPrize">{store.second_prize}</p>
      <p className="score">{store.score}</p>
      <button type="button" className="details" onClick={() => detailClickHandler(store.id)}>
        상세보기
      </button>
    </StoreItemContainer>
  );
};

const StoreItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e9e9eb;
  text-align: center;
  align-items: center;

  .name {
    flex-basis: 15%;
  }

  .phone {
    flex-basis: 15%;
  }

  .address {
    flex-basis: 30%;
  }

  .firstPrize,
  .secondPrize,
  .score {
    flex-basis: 10%;
  }

  .details {
    backgound-color: #ffd440;
    flex-basis: 10%;
    cursor: pointer;
    border: none;
    height: 30px;
    color: black;
  }
`;

export default StoreItem;
