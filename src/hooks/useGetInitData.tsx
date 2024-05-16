import { useEffect } from 'react';
import { useLottoStoreData } from '@/store/LottoStoreData';
import useFetchData from './useFetchData';
import { useMapEventInfoStore } from '@/store/MapEventInfo';

const useGetInitData = () => {
  const { fetchData } = useFetchData();
  const { lottoStoreData, setLottoStoreData } = useLottoStoreData();
  const { boundsCoords } = useMapEventInfoStore();

  const getInitData = async () => {
    if (
      boundsCoords.coordsNorthEast.lat !== 0 &&
      boundsCoords.coordsNorthEast.lng !== 0 &&
      boundsCoords.coordsSouthWest.lat !== 0 &&
      boundsCoords.coordsSouthWest.lng !== 0
    ) {
      const locationData = await fetchData('post', '/lotto-stores', {
        northEastLat: boundsCoords.coordsNorthEast.lat,
        northEastLon: boundsCoords.coordsNorthEast.lng,
        southWestLat: boundsCoords.coordsSouthWest.lat,
        southWestLon: boundsCoords.coordsSouthWest.lng,
      });

      setLottoStoreData(locationData);
    } else {
      const locationData = await fetchData('post', '/lotto-stores', {
        northEastLat: 38,
        northEastLon: 132,
        southWestLat: 33,
        southWestLon: 124,
      });

      setLottoStoreData(locationData);
    }
  };

  useEffect(() => {
    getInitData();
  }, [boundsCoords]);

  useEffect(() => {
    if (lottoStoreData.length === 0) {
      getInitData();
    }
  }, [lottoStoreData, boundsCoords]);

  return { lottoStoreData, getInitData };
};

export default useGetInitData;
