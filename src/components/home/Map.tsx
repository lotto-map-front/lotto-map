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
      window.naver.maps.Event.addListener(markerParam, 'click', async () => {
        const { id } = lottoDataParam;
        const lottoStoreData = await fetchData('get', `/lotto-stores/${id}`);

        showPopUp(
          <PopUp
            header={lottoStoreData.name}
            content={<MarkerPopUpContent lottoStoreData={lottoStoreData} />}
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
      dataArr
        .sort((a, b) => b.score - a.score)
        .forEach((lottoData: LottoDataType, index: number) => {
          const { lat, lon } = lottoData;
          const parsedLat = parseFloat(lat);
          const parsedLon = parseFloat(lon);

          if (window.naver && window.naver.maps) {
            const lottoLocation = new window.naver.maps.LatLng(parsedLat, parsedLon);
            const marker = new window.naver.maps.Marker({
              map: mapInstance,
              position: lottoLocation,
              icon: {
                content: [
                  `<div style="display: flex; justify-content: center; align-items: center; width: 36px; height: 36px; position: relative;">`,
                  ` <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->`,
                  `   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="width: 36px; height: 36px; position: absolute; top: 0; left:0;">`,
                  `     <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>`,
                  `   </svg>`,
                  `   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 22px; height: 22px; display: flex; justify-content: center; align-items: center; position: absolute; top: 2px; left:7px;">`,
                  `     <circle cx="12" cy="12" r="10" fill="red"/>`,
                  `     <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" fill="white" font-size="12">${index + 1}</text>`,
                  `   </svg>`,
                  `</div>`,
                ].join(''),
                size: new window.naver.maps.Size(36, 36),
                anchor: new window.naver.maps.Point(18, 18),
              },
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
    script.onload = handleScriptLoad;
    script.src = SCRIPT_URL;
    script.type = SCRIPT_TYPE;
    script.async = true;
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
  }, [boundsCoords, zoomLevel, deny]);

  useEffect(() => {
    if (data && data.length !== 0 && map) {
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
