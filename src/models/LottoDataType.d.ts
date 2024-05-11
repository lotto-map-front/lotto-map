interface LottoDataType {
  [key: string]: string | number | undefined;
  id: number;
  name: string;
  address: string;
  lat: string;
  lon: string;
  phone: string;
  score: number;
  first_prize: number;
  second_prize: number;
  created_at: string;
  updated_at: string;
}

export { LottoDataType };
