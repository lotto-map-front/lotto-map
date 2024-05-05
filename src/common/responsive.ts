import { CSSProp, css } from 'styled-components';

export const desktops = (props: CSSProp) => {
  return css`
    @media only screen and (max-width: 1200px) {
      ${props}
    }
  `;
};

export const laptops = (props: CSSProp) => {
  return css`
    @media only screen and (max-width: 1024px) {
      ${props}
    }
  `;
};

export const tablets = (props: CSSProp) => {
  return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `;
};

export const mobiles = (props: CSSProp) => {
  return css`
    @media only screen and (max-width: 480px) {
      ${props}
    }
  `;
};

export const folders = (props: CSSProp) => {
  return css`
    @media only screen and (max-width: 319px) {
      ${props}
    }
  `;
};
