import { useContext } from 'react';
import { PopUpContext } from '@/context/PopUpCtx';

const usePopUp = () => {
  const popUps = useContext(PopUpContext);
  return popUps;
};

export default usePopUp;
