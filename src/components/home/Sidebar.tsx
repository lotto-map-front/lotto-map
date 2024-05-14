import styled from 'styled-components';
import { laptops } from '@/common/responsive';
import { useLottoStoreData } from '@/store/LottoStoreData';

const Sidebar = () => {
  const { lottoStoreData } = useLottoStoreData();
  // eslint-disable-next-line no-console
  console.log(lottoStoreData);

  return (
    <SidebarStyle>
      <span>Sidebar</span>
    </SidebarStyle>
  );
};

const SidebarStyle = styled.div`
  flex: 1;
  padding: 1rem;
  height: 100%;

  ${laptops({ display: 'none' })}
`;

export default Sidebar;
