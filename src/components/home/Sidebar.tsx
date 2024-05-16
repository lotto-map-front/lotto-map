import styled from 'styled-components';
import { laptops } from '@/common/responsive';
import { useLottoStoreData } from '@/store/LottoStoreData';
import PopUpScroll from '@/common/PopUpScroll';
import SidebarBox from './SidebarBox';
import { useMapEventInfoStore } from '@/store/MapEventInfo';
import { useEffect } from 'react';
import useFetchData from '@/hooks/useFetchData';

const Sidebar = () => {
  const { fetchData } = useFetchData();
  const { lottoStoreData, setLottoStoreData } = useLottoStoreData();
  const { boundsCoords } = useMapEventInfoStore();

  const getInitSidebarData = async () => {
    const locationData = await fetchData('post', '/lotto-stores', {
      northEastLat: boundsCoords.coordsNorthEast.lat || 38,
      northEastLon: boundsCoords.coordsNorthEast.lng || 132,
      southWestLat: boundsCoords.coordsSouthWest.lat || 33,
      southWestLon: boundsCoords.coordsSouthWest.lng || 124,
    });

    setLottoStoreData(locationData);
  };

  useEffect(() => {
    if (lottoStoreData.length === 0) {
      getInitSidebarData();
    }
  }, []);

  return (
    <SidebarStyle>
      <header className="sidebarTitle">이 지역의 복권 명당 리스트</header>
      <PopUpScroll height="95%">
        {lottoStoreData &&
          lottoStoreData.map((eachLottoStoreData, index) => (
            <SidebarBox eachLottoStoreData={eachLottoStoreData} rank={index + 1} />
          ))}
      </PopUpScroll>
    </SidebarStyle>
  );
};

const SidebarStyle = styled.div`
  flex: 1;
  padding: 0 0 1rem 1rem;
  height: 100%;

  .sidebarTitle {
    width: 100%;
    height: 6vh;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bolder;
    text-align: center;
    border: 1px solid lightgray;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  ${laptops({ display: 'none' })}
`;

export default Sidebar;
