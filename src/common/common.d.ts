interface ButtonPropsType {
  children: React.ReactNode;
  btnOnClick: (e: any) => void;
  fontSize?: string;
  fontWeight?: string;
  width?: string;
  height?: string;
  padding?: string;
}

interface PopUpPropsType {
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
  height?: string;
  footerOnClick: () => void;
  overlayOnClick: () => void;
}

interface OverlayPropsType {
  children: React.ReactNode;
  overlayOnClick: () => void;
}

interface PopUpScrollPropsType {
  children: React.ReactNode;
  height?: string;
}
