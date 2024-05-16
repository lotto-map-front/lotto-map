import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { LottoStoreDataType } from '@/models/LottoDataType';

interface WinningInfoType {
  auto: number;
  manual: number;
}

const MarkerPopUpContent = ({ lottoStoreData }: { lottoStoreData: LottoStoreDataType }) => {
  const [winningInfo, setWinningInfo] = useState<WinningInfoType>({
    auto: 0,
    manual: 0,
  });

  useEffect(() => {
    const { lat, lon } = lottoStoreData;

    if (window.naver && window.naver.maps && lat && lon) {
      const mapListDiv = document.getElementById('mapList');
      if (window.naver && window.naver.maps) {
        const lottoStoreLocation = new window.naver.maps.LatLng(lat, lon);
        const mapOptions = {
          center: lottoStoreLocation,
          zoom: 15,
        };
        const listMapInstance = new window.naver.maps.Map(mapListDiv, mapOptions);
        const markerOption = {
          map: listMapInstance,
          position: lottoStoreLocation,
        };
        // eslint-disable-next-line no-new
        new window.naver.maps.Marker(markerOption);
      }
    }

    setWinningInfo({
      auto: lottoStoreData.winningInfo.filter((info) => info.rank === 1 && info.category === '자동').length,
      manual: lottoStoreData.winningInfo.filter((info) => info.rank === 1 && info.category === '수동').length,
    });
  }, []);

  return (
    <PopUpContentDetailStyle>
      <div id="mapList" style={{ width: '80%', height: '35vh', margin: '1.2rem 0' }} />
      <div>
        {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </svg>
        <span className="addrSpan">{lottoStoreData.address}</span>
      </div>
      <div style={lottoStoreData.phone === null ? { margin: '0.4rem 0' } : { margin: '0.8rem 0' }}>
        {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
        {lottoStoreData.phone === null ? (
          <></>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            <span className="phone">{lottoStoreData.phone}</span>
          </>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <span className="first_prize">
          <strong>
            <span id="num">1등</span> 당첨횟수
          </strong>{' '}
          : <span id="num">{lottoStoreData.first_prize}</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 'medium' }}>번</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 'medium', marginLeft: '0.4rem' }}>
            <strong>(</strong> <strong style={{ color: '#0a857e' }}>자동</strong> <strong>:</strong>{' '}
            <span style={{ fontWeight: 'bolder' }}>{winningInfo.auto}</span>,{' '}
            <strong style={{ color: '#f57b19' }}>수동</strong> <strong>:</strong>{' '}
            <span style={{ fontWeight: 'bolder' }}>{winningInfo.manual}</span> <strong>)</strong>
          </span>
        </span>
        <span className="second_prize">
          <strong>
            <span id="num">2등</span> 당첨횟수
          </strong>{' '}
          : <span id="num">{lottoStoreData.second_prize}</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 'medium' }}>번</span>
        </span>
      </div>
    </PopUpContentDetailStyle>
  );
};

const PopUpContentDetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  padding-bottom: 2rem;

  .addrSpan {
    color: #666;
    font-weight: bolder;
  }

  .phone {
    color: #8e8073;
    margin: 2rem 0;
    font-size: medium;
    font-weight: 600;
  }

  .time {
    margin-top: 6px;
  }

  svg {
    width: 15px;
    height: 15px;
    display: inline-block;
    margin-right: 7px;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
    fill: #8e8073;
  }

  .first_prize {
    #num {
      font-weight: bolder;
      color: darkred;
    }
  }

  .second_prize {
    #num {
      font-weight: bolder;
      color: darkblue;
    }
  }
`;

export default MarkerPopUpContent;
