import { LottoDataType } from '@/models/LottoDataType';
import { useRef } from 'react';
import usePopUp from './usePopUp';
import MarkerPopUpContent from '@/components/home/MarkerPopUpContent';
import useFetchData from './useFetchData';
import PopUp from '@/common/PopUp';
import { useMapStore } from '@/store/MapStore';

const useDrawMarkers = () => {
  const { fetchData } = useFetchData();
  const { map } = useMapStore();
  const markersRef = useRef<any[]>([]);
  const { showPopUp, closePopUp } = usePopUp();

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

  return drawMarkers;
};

export default useDrawMarkers;
