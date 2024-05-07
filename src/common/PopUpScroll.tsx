import styled from 'styled-components';

const PopUpScroll = ({ children, height }: PopUpScrollPropsType) => {
  return <PopUpScrollType height={height}>{children}</PopUpScrollType>;
};

const PopUpScrollType = styled.div<Pick<PopUpScrollPropsType, 'height'>>`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: fit-content;
  height: ${(props) => props.height};

  &::-webkit-scrollbar {
    min-width: 0.4rem;
    max-width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 10px;
  }
`;

PopUpScroll.defaultProps = {
  height: '25vh',
};

export default PopUpScroll;
