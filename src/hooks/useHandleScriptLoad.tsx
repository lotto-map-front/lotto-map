import { useEffect, useState } from 'react';
import { useMapEventInfoStore } from '@/store/MapEventInfo';
import useGetBoundsCoords from './useGetBoundsCoords';
import { useMapStore } from '@/store/MapStore';
import useFetchData from './useFetchData';
import { LottoDataType } from '@/models/LottoDataType';
import { SCRIPT_TYPE, SCRIPT_URL } from '@/constants/NaverMapScript';

const useHandleScriptLoad = (
  setData?: React.Dispatch<React.SetStateAction<LottoDataType[]>>,
  setDeny?: React.Dispatch<React.SetStateAction<boolean>>,
  mapDivString?: string,
  needCurrentPosition?: boolean
) => {
  const { fetchData } = useFetchData();
  const { setMap } = useMapStore();
  const { zoomLevel, setLatitude, setLongitude, setZoomLevel, setBoundsCoords } = useMapEventInfoStore();
  const getBoundsCoords = useGetBoundsCoords();
  const [mapDiv, setMapDiv] = useState(document.getElementById(`${mapDivString}`));

  // 현재 위치정보 공유 허용시
  const handleLocationPermission = async (position: any) => {
    if (!position) {
      // 위치 정보를 가져오지 못한 경우 처리
      // eslint-disable-next-line no-console
      console.log('위치 정보를 가져올 수 없습니다.');
      return;
    }

    const { coords } = position;
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);

    if (coords.latitude === 0 || coords.longitude === 0) return;

    if (window.naver && window.naver.maps) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(coords.latitude, coords.longitude),
        zoom: zoomLevel,
      };
      const initialMapInstance = new window.naver.maps.Map(mapDiv, mapOptions);
      const initialBoundsCoords = await getBoundsCoords(initialMapInstance);
      const zoom = initialMapInstance.getZoom();

      setBoundsCoords(initialBoundsCoords);
      setMap(initialMapInstance);
      setZoomLevel(zoom);

      if (setData) {
        // 위치정보 허용 시 초기 데이터 가져오기
        const locationData = await fetchData('post', '/lotto-stores', {
          northEastLat: initialBoundsCoords.coordsNorthEast.lat,
          northEastLon: initialBoundsCoords.coordsNorthEast.lng,
          southWestLat: initialBoundsCoords.coordsSouthWest.lat,
          southWestLon: initialBoundsCoords.coordsSouthWest.lng,
        });

        setData(locationData);
      }
    }
  };

  // 현재 위치정보 공유 거절시
  const handleLocationError = async () => {
    if (setDeny) {
      setDeny(true);
    }
    // eslint-disable-next-line no-console
    console.log('사용자가 위치 공유 권한을 거부했습니다.');

    if (window.naver && window.naver.maps) {
      const center = new window.naver.maps.LatLng(36.2, 127.8);
      const mapOptions = {
        center,
        zoom: 7,
      };
      const initialMapInstance = new window.naver.maps.Map(mapDiv, mapOptions);
      setMap(initialMapInstance);

      if (setData) {
        // 위치정보 거절 시 초기 데이터 가져오기
        const locationDenyData = await fetchData('post', '/lotto-stores', {
          northEastLat: 38,
          northEastLon: 132,
          southWestLat: 33,
          southWestLon: 124,
        });

        setData(locationDenyData);
      }
    }
  };

  const handleGetCurrentPosition = async () => {
    if (needCurrentPosition && window.naver && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationPermission, handleLocationError);
    }
  };

  useEffect(() => {
    const mapDivElement = document.getElementById(`${mapDivString}`);
    setMapDiv(mapDivElement);
  }, []);

  useEffect(() => {
    handleGetCurrentPosition();
    const existingScripts = document.querySelectorAll<HTMLScriptElement>(`script[src="${SCRIPT_URL}"]`);

    if (existingScripts.length > 0) {
      existingScripts.forEach((script) => {
        script.parentNode?.removeChild(script);
      });
    }

    const script = document.createElement('script');
    script.onload = handleGetCurrentPosition;
    script.src = SCRIPT_URL;
    script.type = SCRIPT_TYPE;
    script.async = true;
    document.head.appendChild(script);
  }, [mapDiv]);
};

export default useHandleScriptLoad;
