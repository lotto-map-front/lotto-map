const SCRIPT_TYPE = 'text/javascript';
const SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}&amp;submodules=panorama,geocoder,drawing,visualization`;

export { SCRIPT_TYPE, SCRIPT_URL };
