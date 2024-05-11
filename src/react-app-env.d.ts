/// <reference types="react-scripts" />
interface CoordsType {
  latitude: number;
  longitude: number;
}

type RequestMethod = "get" | "post" | "put" | "delete";

type PopUpContextValueType = {
  showPopUp: (popUp: JSX.Element) => void;
  closePopUp: () => void;
};

type PopUpProviderPropsType = {
  children: JSX.Element | JSX.Element[];
};
