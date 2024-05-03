import styled from 'styled-components';
import { Link } from 'react-router-dom';
import lottoLogo from '@/assets/lottomap-logo2.png';

const Header = () => {
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
      <RightSide>
        <ul>
          <Link to="/list">
            <li className="listLink">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
              </svg>
              리스트
            </li>
          </Link>
          <Link to="/">
            <li className="mapLink">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z" />
              </svg>
              지도
            </li>
          </Link>
          <Link to="/myLottoStore">
            <li className="myLottoStore">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
              </svg>
              나의 로또 판매점
            </li>
          </Link>
          <Link to="/drawNumber">
            <li className="gamePad">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z" />
              </svg>
              추첨번호
            </li>
          </Link>
        </ul>
      </RightSide>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  padding: 0.4rem 0;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 36px;
    height: 28px;
    fill: #ad9a8a;
    margin-right: 8px;
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

const RightSide = styled.div`
  ul {
    display: flex;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      margin-left: 48px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      color: #7e766f;

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
