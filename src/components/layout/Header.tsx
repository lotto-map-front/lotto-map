import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import lottoLogo from '@/assets/lottomap-logo2.png';
import { tablets } from '@/common/responsive';

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [showBars, setShowBars] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setShowBars(true);
      setShowMenu(false);
    } else {
      setShowBars(false);
      setShowMenu(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HeaderStyle>
      <Link to="/">
        <LeftSide>
          <h2>
            <img src={lottoLogo} alt="로또로고" />
            로또맵
          </h2>
        </LeftSide>
      </Link>

      <RightSide showMenu={showMenu}>
        <BarsIcon showBars={showBars} onClick={toggleMenu}>
          {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </BarsIcon>
        <ul>
          <li>
            <Link to="/list" className="listLink">
              {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700">
                <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
              </svg>
              리스트
            </Link>
          </li>
          <li>
            <Link to="/" className="mapLink">
              {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700">
                <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z" />
              </svg>
              지도
            </Link>
          </li>
          <li>
            <Link to="/myLottoStore" className="myLottoStore">
              {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700">
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
              </svg>
              나의 로또 판매점
            </Link>
          </li>
          <li>
            <Link to="/drawNumber" className="gamePad">
              {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700">
                <path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H347.1L325.8 320H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H315.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7H155.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320h95.1l21.3-128H187.1z" />
              </svg>
              추첨번호
            </Link>
          </li>
        </ul>
      </RightSide>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  height: 10vh;
  padding: 0.4rem 0;
  align-items: center;
  justify-content: space-between;
  ${tablets({ position: 'relative' })}
  border-bottom: 1px solid #f8f8f8;

  svg {
    width: 34px;
    height: 26px;
    fill: #ad9a8a;
    margin-right: 12px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;

  h2 {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 72px;
      height: 72px;
      ${tablets({ width: '62px', height: '62px' })}
    }

    &:hover {
      font-weight: 700;
      text-shadow: 8px 8px 1px rgb(0, 0, 0, 0.4);
      transition: all 0.2s linear;
    }

    &:active {
      transform: scale(0.9);
      text-shadow: 0px 0px 1px rgb(0, 0, 0);
    }
  }
`;

const BarsIcon = styled.div<{ showBars: boolean }>`
  cursor: pointer;
  display: ${({ showBars }) => (showBars ? 'block' : 'none')};
`;

const RightSide = styled.div<{ showMenu: boolean }>`
  ul {
    display: ${({ showMenu }) => (showMenu ? 'flex' : 'none')};
    list-style: none;
    text-align: center;
    align-items: center;
    justify-items: center;

    gap: 1.5rem;
    position: relative;
    z-index: 998;

    ${tablets({
      flexDirection: 'column',
      position: 'absolute',
      left: '0',
      top: '10vh',
      width: '100%',
      background: 'white',
      padding: '0.4rem',
    })}

    li {
      display: flex;
      align-items: center;
      margin-left: 0;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;

      justify-content: center;
      align-items: center;
      text-align: center;
      justify-items: center;

      svg {
        ${tablets({ display: 'none' })};
        fill: #ffd440;
        display: inline-block;
        vertical-align: middle;
        width: 20px;
      }

      &.mapLink {
        color: #de5d51;
        transition: all 0.2s linear;

        &:hover {
          font-weight: 700;
          text-shadow: 4px 4px 1px #dcc1be;
          transition: all 0.2s linear;
        }

        svg {
          fill: #ffd440;
        }
      }

      &:hover {
        font-weight: 700;
        text-shadow: 4px 4px 1px rgb(0, 0, 0, 0.1);
        transition: all 0.2s linear;
      }

      &:active {
        transform: scale(0.9);
        text-shadow: 0px 0px 1px rgb(0, 0, 0);
      }
    }
  }
`;

export default Header;
