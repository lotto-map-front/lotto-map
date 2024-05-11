import { create } from 'zustand';

interface MapStoreState {
  map: any;
  setMap: (mapInstance: any) => void;
  deleteMap: () => void;
}

export const useMapStore = create<MapStoreState>((set) => ({
  map: null,
  setMap: (mapInstance) => {
    set((state) => ({
      ...state,
      map: mapInstance,
    }));
  },
  deleteMap: () => {
    set((state) => ({
      ...state,
      map: null,
    }));
  },
}));
