import { useEffect } from 'react';
import { useLottoStoreData } from '@/store/LottoStoreData';
import useFetchData from './useFetchData';
import { useMapEventInfoStore } from '@/store/MapEventInfo';

const useGetInitData = () => {
  const { fetchData } = useFetchData();
  const { lottoStoreData, setLottoStoreData } = useLottoStoreData();
  const { boundsCoords } = useMapEventInfoStore();

  const getInitData = async () => {
    const locationData = await fetchData('post', '/lotto-stores', {
      northEastLat: boundsCoords.coordsNorthEast.lat || 38,
      northEastLon: boundsCoords.coordsNorthEast.lng || 132,
      southWestLat: boundsCoords.coordsSouthWest.lat || 33,
      southWestLon: boundsCoords.coordsSouthWest.lng || 124,
    });

    setLottoStoreData(locationData);
  };

  useEffect(() => {
    getInitData();
  }, [boundsCoords]);

  return { lottoStoreData, getInitData };
};

export default useGetInitData;
