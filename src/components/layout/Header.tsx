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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </BarsIcon>
        <ul>
          <li>
            <Link to="/list" className="listLink">
              {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
              </svg>
              리스트
            </Link>
          </li>
          <li>
            <Link to="/" className="mapLink">
              {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z" />
              </svg>
              지도
            </Link>
          </li>
          <li>
            <Link to="/myLottoStore" className="myLottoStore">
              {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
              </svg>
              나의 로또 판매점
            </Link>
          </li>
          <li>
            <Link to="/drawNumber" className="gamePad">
              {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z" />
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

  svg {
    width: 36px;
    height: 28px;
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
    gap: 2rem;
    position: relative;
    z-index: 999999;

    ${tablets({
      flexDirection: 'column',
      position: 'absolute',
      left: '0',
      top: '10vh',
      width: '100%',
      background: 'white',
      padding: '0.4rem',
    })}

    svg {
      ${tablets({ display: 'none' })}
    }

    li {
      display: flex;
      align-items: center;
      margin-left: 0;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      color: #7e766f;

      a {
        display: flex;
        align-items: center;
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
          fill: #de5d51;
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

      img {
        width: 36px;
        height: 36px;
        margin-right: 10px;
      }
    }
  }
`;

export default Header;
