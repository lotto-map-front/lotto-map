import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useMapEventInfoStore } from '@/store/MapEventInfo';
import { useMapStore } from '@/store/MapStore';
import useFetchData from '@/hooks/useFetchData';
import useGetBoundsCoords from '@/hooks/useGetBoundsCoords';
import { SCRIPT_TYPE, SCRIPT_URL } from '@/constants/NaverMapScript';
import { LottoDataType } from '@/models/LottoDataType';

const Map = () => {
  const { fetchData } = useFetchData();
  const { map, setMap, deleteMap } = useMapStore();
  const { boundsCoords, zoomLevel, setLatitude, setLongitude, setZoomLevel, setBoundsCoords } = useMapEventInfoStore();
  const getBoundsCoords = useGetBoundsCoords();
  const [data, setData] = useState<LottoDataType[]>([]);
  const [deny, setDeny] = useState(false);

  const markersRef = useRef<any[]>([]);

  const handleDragEndZoomChanged = async () => {
    if (!map) return;

    const { _lat: latitude, _lng: longitude } = map.getCenter();
    const boundsCoordsFromHook = await getBoundsCoords(map);

    setBoundsCoords(boundsCoordsFromHook);
    setLatitude(latitude);
    setLongitude(longitude);

    const zoom = map.getZoom();
    setZoomLevel(zoom);
  };

  const drawMarkers = (dataArr: LottoDataType[], mapInstance: any) => {
    markersRef.current?.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];

    if (dataArr && dataArr.length !== 0) {
      dataArr.forEach((LottoData: LottoDataType) => {
        const { lat, lon } = LottoData;
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);
        const lottoLocation = new window.naver.maps.LatLng(parsedLat, parsedLon);
        const marker = new window.naver.maps.Marker({
          map: mapInstance,
          position: lottoLocation,
        });

        markersRef.current.push(marker);
      });
    }
  };

  const handleScriptLoad = async () => {
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
        const intialBoundsCoords = await getBoundsCoords(initialMapInstance);
        const zoom = initialMapInstance.getZoom();

        setBoundsCoords(intialBoundsCoords);
        setMap(initialMapInstance);
        setZoomLevel(zoom);
      }
    };

    const handleLocationError = async () => {
      setDeny(true);
      // eslint-disable-next-line no-console
      console.log('사용자가 위치 공유 권한을 거부했습니다.');

      if (window.naver && window.naver.maps) {
        const mapDiv = document.getElementById('map');
        const center = new window.naver.maps.LatLng(36.2, 127.8);
        const mapOptions = {
          center,
          zoom: 7.5,
        };
        const initialMapInstance = new window.naver.maps.Map(mapDiv, mapOptions);
        setMap(initialMapInstance);

        // prettier-ignore
        const locationDenyData = await fetchData('post', '/lotto-stores', {
          "northEastLat": 38,
          "northEastLon": 132,
          "southWestLat": 33,
          "southWestLon": 124,
        });
        setData(locationDenyData);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationPermission, handleLocationError);
    }
  };

  useEffect(() => {
    // 리렌더링에 의해 스크립트 중복으로 붙는 문제 해결을 위한 코드
    const scriptUrls = [
      SCRIPT_URL,
      'https://openapi.map.naver.com/openapi/v3/maps-panorama.js',
      'https://openapi.map.naver.com/openapi/v3/maps-drawing.js',
      'https://openapi.map.naver.com/openapi/v3/maps-visualization.js',
      'https://openapi.map.naver.com/openapi/v3/maps-geocoder.js',
    ];

    let existingScriptsCount = 0;

    scriptUrls.forEach((scriptUrl) => {
      const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
      if (existingScript) {
        existingScriptsCount += 1;
      }
    });

    if (existingScriptsCount !== scriptUrls.length) {
      scriptUrls.forEach((scriptUrl) => {
        const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = scriptUrl;
          script.type = SCRIPT_TYPE;
          script.async = true;
          document.head.appendChild(script);

          script.onload = () => {
            handleScriptLoad();
          };
        }
      });
    } else {
      handleScriptLoad();
    }

    return () => {
      scriptUrls.forEach((scriptUrl) => {
        const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
          deleteMap();
        }
      });
    };
  }, []);

  const getInitDataAndByDragZoom = async (
    coordsNorthEastLatParam: number,
    coordsNorthEastLngParam: number,
    coordsSouthWestLatParam: number,
    coordsSouthWestLngParam: number
  ) => {
    // prettier-ignore
    const initData = await fetchData('post', '/lotto-stores', {
      "northEastLat": coordsNorthEastLatParam, 
      "northEastLon": coordsNorthEastLngParam, 
      "southWestLat": coordsSouthWestLatParam, 
      "southWestLon": coordsSouthWestLngParam 
    });
    setData(initData);
  };

  useEffect(() => {
    const { lat: coordsNorthEastLat, lng: coordsNorthEastLng } = boundsCoords.coordsNorthEast;
    const { lat: coordsSouthWestLat, lng: coordsSouthWestLng } = boundsCoords.coordsSouthWest;

    if (!deny) {
      getInitDataAndByDragZoom(coordsNorthEastLat, coordsNorthEastLng, coordsSouthWestLat, coordsSouthWestLng);
    } else if (
      coordsNorthEastLat !== 0 &&
      coordsNorthEastLng !== 0 &&
      coordsSouthWestLat !== 0 &&
      coordsSouthWestLng !== 0
    ) {
      getInitDataAndByDragZoom(coordsNorthEastLat, coordsNorthEastLng, coordsSouthWestLat, coordsSouthWestLng);
    }
  }, [boundsCoords, zoomLevel]);

  useEffect(() => {
    drawMarkers(data, map);
  }, [data, map]);

  useEffect(() => {
    if (!map) return;
    const events = ['dragend', 'zoom_changed'];
    events.forEach((event) =>
      // prettier-ignore
      window.naver.maps.Event.addListener(map, event, handleDragEndZoomChanged)
    );

    return () =>
      events.forEach((event) => {
        if (window && window.naver && window.naver.Event) {
          // prettier-ignore
          window.naver.maps.Event.removeListener(map, event, handleDragEndZoomChanged)
        }
      });
  }, [map]);

  // eslint-disable-next-line no-console
  // console.log(data);
  // console.log(map);
  // console.log(`NorthEast, SouthWest`, boundsCoords.coordsNorthEast, boundsCoords.coordsSouthWest);
  // console.log(zoomLevel);
  // console.log(markersRef.current);

  return <MapBox id="map" />;
};

const MapBox = styled.div`
  width: 100%;
  height: 100%;
  background: gray;
  color: white;
`;

export default Map;
