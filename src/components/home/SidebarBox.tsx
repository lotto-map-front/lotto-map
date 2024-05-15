import styled from 'styled-components';
import { useEffect, useState } from 'react';
import gold from '@/assets/gold.png';
import silver from '@/assets/silver.png';
import bronze from '@/assets/bronze.png';
import useFetchData from '@/hooks/useFetchData';
import { LottoDataType, WinningInfo } from '@/models/LottoDataType';

interface WinningInfoType {
  first: number;
  second: number;
  recentWinning: {
    draw_no: number;
    rank: number;
  };
}

const SidebarBox = ({ eachLottoStoreData, rank }: { eachLottoStoreData: LottoDataType; rank: number }) => {
  const { id } = eachLottoStoreData;
  const { fetchedData: lottoStoreData } = useFetchData('get', `/lotto-stores/${id}`);
  const [winningInfo, setWinningInfo] = useState<WinningInfoType>({
    first: 0,
    second: 0,
    recentWinning: {
      draw_no: 0,
      rank: 0,
    },
  });
  const [star, setStar] = useState(false);

  const rankingCallback = (rankParam: number) => {
    switch (rankParam) {
      case 1:
        return <img src={gold} alt="gold" />;
      case 2:
        return <img src={silver} alt="silver" />;
      case 3:
        return <img src={bronze} alt="bronze" />;

      default:
        return (
          <span className="rankString" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            {rank}.
          </span>
        );
    }
  };

  useEffect(() => {
    if (lottoStoreData.winningInfo && lottoStoreData.winningInfo.length > 0) {
      setWinningInfo({
        first: lottoStoreData.winningInfo.filter((info: WinningInfo) => info.rank === 1).length,
        second: lottoStoreData.winningInfo.filter((info: WinningInfo) => info.rank === 2).length,
        recentWinning: lottoStoreData.winningInfo.reduce((prev: WinningInfo | null, current: WinningInfo) => {
          return !prev || prev.draw_no > current.draw_no ? prev : current;
        }, null),
      });
    }
  }, [lottoStoreData]);

  return (
    <SidebarBoxStyle>
      <header>
        {rankingCallback(rank)}
        <strong>{lottoStoreData.name}</strong>
        {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
        {!star ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" onClick={() => setStar((prev) => !prev)}>
            <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" onClick={() => setStar((prev) => !prev)}>
            <path
              fill="gold"
              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
            />
          </svg>
        )}
        {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
      </header>
      <div className="sidebarDetail">
        <span className="phone">{lottoStoreData.phone}</span>
        <p>{lottoStoreData.address}</p>
        <p>1등 당첨 횟수 : {winningInfo.first}회</p>
        <p>2등 당첨 횟수 : {winningInfo.second}회</p>
        {winningInfo.recentWinning && (
          <p>
            최근 당첨 내역 : {winningInfo.recentWinning.draw_no}회 {winningInfo.recentWinning.rank}등
          </p>
        )}
      </div>
    </SidebarBoxStyle>
  );
};

const SidebarBoxStyle = styled.div`
  header {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0.8rem 0;

    img,
    svg {
      width: 14px;
      height: 14px;
      object-fit: contain;
    }

    svg {
      cursor: pointer;
      transition: all 0.4s linear;

      &:active {
        transform: scale(0.6);
      }
    }

    .rankString {
      font-size: 14px !important;
    }

    strong {
      margin: 0 0.3rem;
      font-size: 0.8rem;
      font-weight: bolder;
    }
  }

  .sidebarDetail {
    font-size: 0.75rem;
    line-height: 1.1rem;
    font-weight: 500;
    padding-bottom: 0.8rem;
    border: 1px solid lightgray;
    border-left: none;
    border-right: none;
    border-top: none;
  }
`;

export default SidebarBox;
