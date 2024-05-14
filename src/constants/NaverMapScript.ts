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

export { SCRIPT_TYPE, SCRIPT_URL, EVENTS, mapOptionsCallBack };
