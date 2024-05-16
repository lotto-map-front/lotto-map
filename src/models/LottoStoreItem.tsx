// 로또점 배열
interface LottoStoreItem {
  id: number;
  name: string;
  address: string;
  phone: null | string;
  lat: number;
  lon: number;
  created_at: string;
  updated_at: string;
  first_prize: number;
  second_prize: number;
  score: number;
}

export default LottoStoreItem;
