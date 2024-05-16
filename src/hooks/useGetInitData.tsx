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
      northEastLat: boundsCoords.coordsNorthEast.lat,
      northEastLon: boundsCoords.coordsNorthEast.lng,
      southWestLat: boundsCoords.coordsSouthWest.lat,
      southWestLon: boundsCoords.coordsSouthWest.lng,
    });

    setLottoStoreData(locationData);
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
