import styled from 'styled-components';

const Overlay = ({ children, overlayOnClick }: OverlayPropsType) => {
  return <OverlayStyle onClick={overlayOnClick}>{children}</OverlayStyle>;
};

const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  z-index: 999999;
`;

export default Overlay;
