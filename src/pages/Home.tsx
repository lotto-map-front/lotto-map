import styled from 'styled-components';
import Map from '@/components/home/Map';

const Home = () => {
  return (
    <HomeStyle>
      <Map />
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Home;
