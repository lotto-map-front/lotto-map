import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useMapEventInfoStore } from '@/store/MapEventInfo';
import { useMapStore } from '@/store/MapStore';
import useFetchData from '@/hooks/useFetchData';
import useGetBoundsCoords from '@/hooks/useGetBoundsCoords';
import { EVENTS, SCRIPT_TYPE, SCRIPT_URL } from '@/constants/NaverMapScript';
import { LottoDataType } from '@/models/LottoDataType';
import usePopUp from '@/hooks/usePopUp';
import PopUp from '@/common/PopUp';
import MarkerPopUpContent from './MarkerPopUpContent';
import { desktops, tablets } from '@/common/responsive';

const Map = () => {
  const { fetchData } = useFetchData();
  const { map, setMap } = useMapStore();
  const { boundsCoords, zoomLevel, setLatitude, setLongitude, setZoomLevel, setBoundsCoords } = useMapEventInfoStore();
  const getBoundsCoords = useGetBoundsCoords();
  const [data, setData] = useState<LottoDataType[]>([]);
  const [deny, setDeny] = useState(false);

  const markersRef = useRef<any[]>([]);
  const { showPopUp, closePopUp } = usePopUp();

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

  const showMakerInfoScreen = (lottoDataParam: LottoDataType, mapParam: any, markerParam: any) => {
    const handleClosePopUp = () => closePopUp();

    if (window.naver && window.naver) {
      window.naver.maps.Event.addListener(mapParam, 'click', handleClosePopUp);
      window.naver.maps.Event.addListener(markerParam, 'click', () => {
        showPopUp(
          <PopUp
            header={lottoDataParam.name}
            content={<MarkerPopUpContent lottoData={lottoDataParam} />}
            footer="Close"
            height="40vh"
            footerOnClick={handleClosePopUp}
            overlayOnClick={handleClosePopUp}
          />
        );
      });
    }
  };

  const drawMarkers = (dataArr: LottoDataType[], mapInstance: any) => {
    if (markersRef.current?.length !== 0) {
      markersRef.current?.forEach((marker) => {
        marker.setMap(null);
      });
      markersRef.current = [];
    }

    if (dataArr && dataArr.length !== 0) {
      dataArr.forEach((lottoData: LottoDataType) => {
        const { lat, lon } = lottoData;
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);

        if (window.naver && window.naver.maps) {
          const lottoLocation = new window.naver.maps.LatLng(parsedLat, parsedLon);
          const marker = new window.naver.maps.Marker({
            map: mapInstance,
            position: lottoLocation,
          });

          showMakerInfoScreen(lottoData, map, marker);
          markersRef.current.push(marker);
        }
      });
    }
  };

  const handleScriptLoad = async () => {
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
        const mapDiv = document.getElementById('map');
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

        // 위치정보 허용 시 초기 데이터 가져오기
        const locationData = await fetchData('post', '/lotto-stores', {
          northEastLat: initialBoundsCoords.coordsNorthEast.lat,
          northEastLon: initialBoundsCoords.coordsNorthEast.lng,
          southWestLat: initialBoundsCoords.coordsSouthWest.lat,
          southWestLon: initialBoundsCoords.coordsSouthWest.lng,
        });
        setData(locationData);
      }
    };

    // 현재 위치정보 공유 거절시
    const handleLocationError = async () => {
      setDeny(true);
      // eslint-disable-next-line no-console
      console.log('사용자가 위치 공유 권한을 거부했습니다.');

      if (window.naver && window.naver.maps) {
        const mapDiv = document.getElementById('map');
        const center = new window.naver.maps.LatLng(36.2, 127.8);
        const mapOptions = {
          center,
          zoom: 7,
        };
        const initialMapInstance = new window.naver.maps.Map(mapDiv, mapOptions);
        setMap(initialMapInstance);

        // 위치정보 거절 시 초기 데이터 가져오기
        const locationDenyData = await fetchData('post', '/lotto-stores', {
          northEastLat: 38,
          northEastLon: 132,
          southWestLat: 33,
          southWestLon: 124,
        });
        setData(locationDenyData);
      }
    };

    if (window.naver && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationPermission, handleLocationError);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.type = SCRIPT_TYPE;
    script.async = true;
    script.onload = handleScriptLoad;
    document.head.appendChild(script);
  }, []);

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
    setData(dataOnInitOrDataByDragZoom);
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
  }, [boundsCoords, zoomLevel]);

  useEffect(() => {
    if (data.length !== 0 && map) {
      drawMarkers(data, map);
    }
  }, [data, map]);

  useEffect(() => {
    if (!map) return;

    EVENTS.forEach((event) => {
      if (window && window.naver) {
        // prettier-ignore
        window.naver.maps.Event.addListener(map, event, handleDragEndZoomChanged)
      }
    });
  }, [data, map]);

  return <MapBox id="map" />;
};

const MapBox = styled.div`
  width: 100%;
  height: 100%;
  background: gray;
  color: white;

  ${desktops({
    width: '85%',
  })}

  ${tablets({
    width: '88%',
  })}
`;

export default Map;
