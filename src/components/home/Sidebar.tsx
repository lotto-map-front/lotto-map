import styled from 'styled-components';
import { laptops } from '@/common/responsive';
import { useLottoStoreData } from '@/store/LottoStoreData';
import PopUpScroll from '@/common/PopUpScroll';
import SidebarBox from './SidebarBox';

const Sidebar = () => {
  const { lottoStoreData } = useLottoStoreData();

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
