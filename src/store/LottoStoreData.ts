import { create } from 'zustand';
import { LottoDataType } from '@/models/LottoDataType';

export interface LottoStoreDataState {
  lottoStoreData: LottoDataType[];
  setLottoStoreData: (lottoStoreDataParam: LottoDataType[]) => void;
}

export const useLottoStoreData = create<LottoStoreDataState>((set) => ({
  lottoStoreData: [],
  setLottoStoreData: (lottoStoreDataParam) => {
    set((state) => ({
      ...state,
      lottoStoreData: [...lottoStoreDataParam],
    }));
  },
}));
