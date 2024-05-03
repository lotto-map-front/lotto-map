import styled from 'styled-components';
import useFetchData from '@/hooks/useFetchData';

const Map = () => {
  const fetchedData = useFetchData('get', '/posts', {}, {});
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
