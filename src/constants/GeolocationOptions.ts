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

export { geoLocationOptionsFalseAccuracy, geoLocationOptionsTrueAccuracy };
