import styled, { createGlobalStyle } from 'styled-components';
import Map from '@/components/home/Map';
import Sidebar from '@/components/home/Sidebar';
import { tablets } from '@/common/responsive';

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
  .mainBoxStyle {
    height: 90vh;
    padding: 0.2rem 2rem 1rem 2rem;
    ${tablets({ padding: '0' })}
  }
`;

const Home = () => {
  return (
    <HomeStyle>
      <GlobalStyle />
      <Map />
      <Sidebar />
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Home;
