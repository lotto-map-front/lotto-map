import { createContext, useEffect, useMemo, useState } from 'react';

const PopUpContext = createContext<PopUpContextValueType>({
  showPopUp: () => {},
  closePopUp: () => {},
});

const PopUpCtxProvider = ({ children }: PopUpProviderPropsType) => {
  const [openPopUp, setOpenPopUp] = useState<React.ReactNode>();

  const providerValue = useMemo(() => {
    return {
      showPopUp: (popUp: JSX.Element) => {
        setOpenPopUp(popUp);
      },
      closePopUp: () => {
        setOpenPopUp(null);
      },
    };
  }, []);

  useEffect(() => {}, [openPopUp]);

  return (
    <PopUpContext.Provider value={providerValue}>
      {children}
      {openPopUp}
    </PopUpContext.Provider>
  );
};

export { PopUpContext, PopUpCtxProvider };
