import { create } from 'zustand';

type BoundsCoordsType = {
  coordsNorthEast: {
    lat: number;
    lng: number;
  };
  coordsNorthWest: {
    lat: number;
    lng: number;
  };
  coordsSouthEast: {
    lat: number;
    lng: number;
  };
  coordsSouthWest: {
    lat: number;
    lng: number;
  };
};
interface MapEventInfoState {
  zoomLevel: number;
  latitude: number;
  longitude: number;
  sido: string;
  gugun: string;
  boundsCoords: BoundsCoordsType;
  setZoomLevel: (zoomLevel: number) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setSido: (sido: string) => void;
  setGugun: (gugun: string) => void;
  setBoundsCoords: (boundsCoords: BoundsCoordsType) => void;
}

export const useMapEventInfoStore = create<MapEventInfoState>((set) => ({
  zoomLevel: 14,
  latitude: 0,
  longitude: 0,
  sido: '',
  gugun: '',
  boundsCoords: {
    coordsNorthEast: {
      lat: 0,
      lng: 0,
    },
    coordsNorthWest: {
      lat: 0,
      lng: 0,
    },
    coordsSouthEast: {
      lat: 0,
      lng: 0,
    },
    coordsSouthWest: {
      lat: 0,
      lng: 0,
    },
  },
  setZoomLevel: (zoomLevel) => {
    set((state) => ({
      ...state,
      zoomLevel,
    }));
  },
  setLatitude: (latitude) => {
    set((state) => ({
      ...state,
      latitude,
    }));
  },
  setLongitude: (longitude) => {
    set((state) => ({
      ...state,
      longitude,
    }));
  },
  setSido: (sido) => {
    set((state) => ({
      ...state,
      sido,
    }));
  },
  setGugun: (gugun) => {
    set((state) => ({
      ...state,
      gugun,
    }));
  },
  setBoundsCoords: (boundsCoords) => {
    set((state) => ({
      ...state,
      boundsCoords,
    }));
  },
}));
