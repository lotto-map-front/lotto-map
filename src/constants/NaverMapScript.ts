const SCRIPT_TYPE = 'text/javascript';
const SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}&amp;submodules=panorama,geocoder,drawing,visualization`;
const EVENTS = ['dragend', 'zoom_changed'];

const mapOptionsCallBack = (center: any, zoom: number) => {
  return {
    center,
    zoom,
    draggable: true,
    pinchZoom: true,
    scrollWheel: true,
    disableKineticPan: true,
    scaleControl: true,
    logoControl: true,
    logoControlOptions: {
      position: window.naver.maps.Position.BOTTOM_RIGHT,
    },
    mapDataControl: true,
    tileTransition: false,
  };
};

const geoLocationOptionsFalseAccuracy = {
  enableHighAccuracy: false, // 낮은 정확도 사용
  maximumAge: 10000, // 10초 이내 이전 위치 정보 사용
  timeout: 5000, // 5초 이내에 위치 정보 가져오기 시도
};

const geoLocationOptionsTrueAccuracy = {
  enableHighAccuracy: true, // 높은 정확도 사용
  maximumAge: 10000, // 10초 이내 이전 위치 정보 사용
  timeout: 5000, // 5초 이내에 위치 정보 가져오기 시도
};

export {
  SCRIPT_TYPE,
  SCRIPT_URL,
  EVENTS,
  mapOptionsCallBack,
  geoLocationOptionsFalseAccuracy,
  geoLocationOptionsTrueAccuracy,
};
