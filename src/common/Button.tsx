import styled from 'styled-components';

const Button = ({ children, btnOnClick, fontSize, fontWeight, width, height, padding }: ButtonPropsType) => {
  return (
    <ButtonStyle
      onClick={btnOnClick}
      fontSize={fontSize}
      fontWeight={fontWeight}
      width={width}
      height={height}
      padding={padding}
    >
      {children}
    </ButtonStyle>
  );
};

// prettier-ignore
const ButtonStyle = styled.button<Pick<ButtonPropsType, "width" | "height" | "padding" | "fontSize" | "fontWeight">>`
  width: ${(props) => props.width};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.height};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  cursor: pointer;
  border-radius: 5px;
  background-color: #028267;
  color: white;
  border: none;
  transition: all 0.2s linear;

  &:hover,
  &:focus {
    background-color: #3c3733;
    color: white;
  }

  &:active {
    transform: scale(0.8);
  }
`;

Button.defaultProps = {
  fontSize: '16px',
  fontWeight: '600',
  width: '100%',
  height: '16px',
  padding: '0px',
};

export default Button;
