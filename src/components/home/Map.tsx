import styled from 'styled-components';
import useFetchData from '@/hooks/useFetchData';

const Map = () => {
  // prettier-ignore
  const fetchedData = useFetchData('post', '/lotto-stores', { 
    "northEastLat": 38, 
    "northEastLon": 132, 
    "southWestLat": 33, 
    "southWestLon": 124 
  }, {});
  // eslint-disable-next-line no-console
  console.log(fetchedData);

  return <MapBox id="map">Clone And Netlify CI/CD Test</MapBox>;
};

const MapBox = styled.div`
  width: 100%;
  height: 100%;
  background: gray;
  color: white;
`;

export default Map;
