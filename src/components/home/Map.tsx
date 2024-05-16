import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useMapEventInfoStore } from '@/store/MapEventInfo';
import { useMapStore } from '@/store/MapStore';
import useFetchData from '@/hooks/useFetchData';
import useGetBoundsCoords from '@/hooks/useGetBoundsCoords';
import { EVENTS } from '@/constants/NaverMapScript';
import { desktops, tablets } from '@/common/responsive';
import useDrawMarkers from '@/hooks/useDrawMarkers';
import useHandleScriptLoad from '@/hooks/useHandleScriptLoad';
import { useLottoStoreData } from '@/store/LottoStoreData';
import useGetInitData from '@/hooks/useGetInitData';

const Map = () => {
  const { fetchData } = useFetchData();
  const drawMarkers = useDrawMarkers();
  const { map } = useMapStore();
  const { lottoStoreData, setLottoStoreData } = useLottoStoreData();
  useGetInitData();
  const [deny, setDeny] = useState(false);

  useHandleScriptLoad(setLottoStoreData, setDeny, 'map', true);
  const { boundsCoords, zoomLevel, setLatitude, setLongitude, setZoomLevel, setBoundsCoords } = useMapEventInfoStore();
  const getBoundsCoords = useGetBoundsCoords();

  // Drag 그리고 Zoom 동작에 따른 Callback 함수
  const handleDragEndZoomChanged = async () => {
    if (!map) return;

    const { _lat: latitude, _lng: longitude } = map.getCenter();
    const boundsCoordsFromHook = await getBoundsCoords(map);

    // 네이버 지도 4곳 가장자리 경도, 위도 중간 위치 경도 위도, zoom 레벨 업데이트 (zustand)
    setBoundsCoords(boundsCoordsFromHook);
    setLatitude(latitude);
    setLongitude(longitude);

    const zoom = map.getZoom();
    setZoomLevel(zoom);
    // 이렇게 상태값을 변경하고, 아래 useEffect를 통해서 새로운 데이터값을 업데이트하고 마커표시
  };

  const getInitDataOrDataByDragZoom = async (
    coordsNorthEastLatParam: number,
    coordsNorthEastLngParam: number,
    coordsSouthWestLatParam: number,
    coordsSouthWestLngParam: number
  ) => {
    // prettier-ignore
    const dataOnInitOrDataByDragZoom = await fetchData('post', '/lotto-stores', {
      "northEastLat": coordsNorthEastLatParam, 
      "northEastLon": coordsNorthEastLngParam, 
      "southWestLat": coordsSouthWestLatParam, 
      "southWestLon": coordsSouthWestLngParam 
    });
    setLottoStoreData(dataOnInitOrDataByDragZoom);
  };

  useEffect(() => {
    const { lat: coordsNorthEastLat, lng: coordsNorthEastLng } = boundsCoords.coordsNorthEast;
    const { lat: coordsSouthWestLat, lng: coordsSouthWestLng } = boundsCoords.coordsSouthWest;

    if (!deny) {
      getInitDataOrDataByDragZoom(coordsNorthEastLat, coordsNorthEastLng, coordsSouthWestLat, coordsSouthWestLng);
    } else if (
      coordsNorthEastLat !== 0 &&
      coordsNorthEastLng !== 0 &&
      coordsSouthWestLat !== 0 &&
      coordsSouthWestLng !== 0
    ) {
      getInitDataOrDataByDragZoom(coordsNorthEastLat, coordsNorthEastLng, coordsSouthWestLat, coordsSouthWestLng);
    }
    // 드래그, 줌 동작에 따라 boundsCoord, zoomLevel이 달라지고, 리렌더링 되면서, data 배열값 업데이트
  }, [boundsCoords, zoomLevel, deny]);

  useEffect(() => {
    if (!map) return;

    if (lottoStoreData && lottoStoreData.length !== 0) {
      drawMarkers(lottoStoreData, map);
    }

    EVENTS.forEach((event) => {
      if (window && window.naver) {
        // prettier-ignore
        window.naver.maps.Event.addListener(map, event, handleDragEndZoomChanged)
      }
    });
  }, [lottoStoreData, map]);

  return <MapBox id="map" />;
};

const MapBox = styled.div`
  width: 100%;
  height: 87vh;
  flex: 5;
  background: gray;
  color: white;

  ${desktops({
    width: '85%',
  })}

  ${tablets({
    width: '88%',
    flex: 'unset',
  })}
`;

export default Map;
