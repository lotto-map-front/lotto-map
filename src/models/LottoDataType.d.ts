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

interface WinningInfo {
  win_id: number;
  draw_no: number;
  rank: number;
  category: string | null;
  created_at: string;
  updated_at: string;
}

interface LottoStoreDataType {
  id: number;
  name: string;
  phone: string;
  address: string;
  lat: string;
  lon: string;
  created_at: string;
  updated_at: string;
  first_prize: number;
  second_prize: number;
  score: number;
  winningInfo: WinningInfo[];
}


export { LottoDataType, LottoStoreDataType, WinningInfo };
