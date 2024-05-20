// 개별 로또점
interface WinningInfo {
  win_id: number;
  draw_no: number;
  rank: number;
  category: string | null;
  created_at: string;
  updated_at: string;
}

interface LottoStore {
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

export type { LottoStore, WinningInfo };
