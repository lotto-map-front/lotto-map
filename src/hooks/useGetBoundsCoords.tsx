const useGetBoundsCoords = () => {
  const getBoundsCoords = async (map: any) => {
    const bounds = await map.getBounds();
    const ne = new window.naver.maps.LatLng(bounds._max._lat, bounds._max._lng);
    const se = new window.naver.maps.LatLng(bounds._min._lat, bounds._max._lng);
    const nw = new window.naver.maps.LatLng(bounds._max._lat, bounds._min._lng);
    const sw = new window.naver.maps.LatLng(bounds._min._lat, bounds._min._lng);

    return {
      coordsNorthEast: {
        lat: ne._lat,
        lng: ne._lng,
      },
      coordsSouthEast: {
        lat: se._lat,
        lng: se._lng,
      },
      coordsNorthWest: {
        lat: nw._lat,
        lng: nw._lng,
      },
      coordsSouthWest: {
        lat: sw._lat,
        lng: sw._lng,
      },
    };
  };

  return getBoundsCoords;
};

export default useGetBoundsCoords;
