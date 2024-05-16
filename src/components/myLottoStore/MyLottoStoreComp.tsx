import styled from 'styled-components';
import LottoStoreItem from '@/models/LottoStoreItem';
import List from '../list/List';

const MyLottoStoreComp = () => {
  // 보여줄 데이터
  const localData = localStorage.getItem('favorites');
  const data: LottoStoreItem[] = localData
    ? JSON.parse(localData).sort((a: LottoStoreItem, b: LottoStoreItem) => b.score - a.score)
    : [];

  return (
    <MyLottoStoreCompContainer>
      <div className="title">
        <h2 className="head">나의 로또 판매점 리스트</h2>
      </div>

      <List data={data} loading={false} />
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
`;

export default MyLottoStoreComp;
