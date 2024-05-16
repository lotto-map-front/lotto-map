import styled from 'styled-components';
import ProgrammersLogo from '@/assets/programmers_logo.png';
import Facebook from '@/assets/facebook.svg';
import Instagram from '@/assets/instagram.svg';
import Twitter from '@/assets/twitter.svg';
import { tablets } from '@/common/responsive';

const Footer = () => {
  return (
    <FooterStyle>
      <LeftSide>
        <img src={ProgrammersLogo} alt="Programmers Logo" />
        <h3>Programmers</h3>
        <div className="desc">
          <p>This is the Part of The Programmers FullStack Dev Course Project.</p>
          <p>You can track the The lottery Store having history of winning nearby your location</p>
        </div>
        <strong>Copyright 2024. 진희경, 최준병, 변성은, 이성은, 방명규. All rights reserved.</strong>
      </LeftSide>
      <RightSide>
        <div className="contactSocialInfo">
          <div className="socialBox">
            <span>
              <strong>Phone</strong> : +1 123 456 789
            </span>
            <span>
              <strong>Email</strong> : info@programmers.com
            </span>
          </div>
          <div className="contactBox">
            <a href="https://www.facebook.com/">
              <img src={Facebook} alt="facebook_logo_fontAweSome" />
            </a>
            <a href="https://twitter.com/">
              <img src={Twitter} alt="twitter_logo_fontAweSome" />
            </a>
            <a href="https://www.instagram.com/">
              <img src={Instagram} alt="Instagram_logo_fontAweSome" />
            </a>
          </div>
        </div>
        <div className="legalLinks">
          <strong>
            <a href="https://www.programmers.co.kr">Privacy Policy</a>
          </strong>
          <strong>
            <a href="https://www.programmers.co.kr">Terms of Service</a>
          </strong>
        </div>
      </RightSide>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  ${tablets({ flexDirection: 'column', padding: '1rem', gap: '4rem' })}
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  ${tablets({ alignItems: 'center' })}

  img {
    width: 300px;
    ${tablets({ justifyContent: 'center', margin: 'auto' })}
    height: auto;
    cursor: pointer;

    &:hover {
      transition: all 0.2s linear;
    }

    &:active {
      transform: scale(0.9);
    }
  }

  h3 {
    margin: 10px 0;
  }

  .desc {
    margin-top: 5px;
    ${tablets({ textAlign: 'center' })}

    p {
      font-size: 14px;
      ${tablets({ lineHeight: '1.5rem' })}
    }
  }

  strong {
    margin-top: 14px;
    font-size: 12px;
    ${tablets({ textAlign: 'center', lineHeight: '20px' })}
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;

  .contactSocialInfo {
    .socialBox {
      ${tablets({ textAlign: 'center' })}

      span {
        display: block;
        margin-bottom: 5px;
      }
    }

    .contactBox {
      margin: 25px 0;
      font-size: 16px;
      font-weight: lighter;
      display: flex;
      justify-content: center;
      gap: 24px;

      a {
        text-decoration: none;
        cursor: pointer;

        img {
          width: 36px;
          height: 36px;
        }

        &:hover {
          transition: all 0.2s linear;
        }

        &:active {
          transform: scale(0.9);
        }
      }
    }
  }

  .legalLinks {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;

    a {
      display: block;
      text-decoration: none;
      text-align: center;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Footer;
