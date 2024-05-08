import styled from 'styled-components';
import { useEffect } from 'react';
import Overlay from './Overlay';
import Button from './Button';
import PopUpScroll from './PopUpScroll';
import { tablets } from './responsive';

const PopUp = ({ header, content, footer, height, footerOnClick, overlayOnClick }: PopUpPropsType) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target instanceof HTMLButtonElement) {
      overlayOnClick();
    }
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflowY = 'hidden';
    }

    return () => {
      if (body) {
        body.style.overflowY = 'auto';
      }
    };
  }, []);

  return (
    <Overlay overlayOnClick={overlayOnClick}>
      <PopUpStyle onClick={handleButtonClick}>
        {!header ? null : (
          <header>
            <h2>{header}</h2>
          </header>
        )}
        <PopUpScroll height={height}>{content}</PopUpScroll>
        {!footer ? null : (
          <footer>
            <Button height="34px" width="100%" fontSize="16px" fontWeight="600" btnOnClick={footerOnClick}>
              {footer}
            </Button>
          </footer>
        )}
      </PopUpStyle>
    </Overlay>
  );
};

const PopUpStyle = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 1px #d3dbd9;
  width: 50vw;
  padding: 0.8rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${tablets({
    width: '95% !important',
    padding: '0.2rem',
  })}

  header {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #3c3733;
    padding: 0.6rem;

    h2 {
      margin: 0.2rem 0 0 0;
      font-weight: 800;
    }
  }

  footer {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default PopUp;
