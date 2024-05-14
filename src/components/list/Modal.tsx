import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useFetchDataOne from '@/hooks/useFetchDataOne';
import CustomMapMarker from '@/common/CustomMarker';

interface PropsType {
  setModalOpen: (arg: boolean) => void;
  selected: number | undefined;
}

function ModalBasic({ setModalOpen, selected }: PropsType) {
  const { data, loading } = useFetchDataOne('get', `/lotto-stores/${selected}`, {}, {});
  const mapRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [setModalOpen]);

  useEffect(() => {
    if (!data || !mapRef.current) return;

    const { naver } = window;
    const location = new naver.maps.LatLng(data.lat, data.lon);
    const map = new naver.maps.Map(mapRef.current, {
      center: location,
      zoom: 15,
    });

    const storeName = data.name;
    const storeLocation = new naver.maps.LatLng(data.lat, data.lon);

    const newMarker = new naver.maps.Marker({
      position: storeLocation,
      map,
      icon: {
        content: CustomMapMarker(),
        size: new naver.maps.Size(5, 10),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(11, 35),
      },
    });
    newMarker.setTitle(storeName);
  }, [data]);

  return (
    <ModalContainer>
      <div ref={modalRef} className="container">
        <button type="button" className="close" onClick={closeModal}>
          X
        </button>
        <h3 className="title">{data?.name}</h3>

        {loading ? (
          <div>loading...</div>
        ) : (
          <div className="content">
            <div ref={mapRef} style={{ height: '200px', marginBottom: '20px' }} />
            <div className="content-item">
              <div className="content-title">전화번호</div>
              <div>{data?.phone || '전화번호가 없습니다.'}</div>
            </div>
            <div className="content-item">
              <div className="content-title">주소</div>
              <div>{data?.address}</div>
            </div>
            <div className="content-item">
              <div className="content-title first-prize">1등 당첨</div>
              <div>{data?.first_prize}회</div>
            </div>
            <div className="content-item">
              <div className="content-title second-prize">2등 당첨</div>
              <div>{data?.second_prize}회</div>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>당첨 회차</th>
                    <th>종류</th>
                    <th>등수</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.winningInfo.map((item) => (
                    <tr>
                      <td>{item.draw_no}</td>
                      <td>{item.category}</td>
                      <td>{item.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.5);

  .container {
    width: 50%;
    max-height: 80%;
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */
    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
    padding: 30px;
    position: relative; /* 모달 내부의 위치를 상대적으로 조정 */
    z-index: 999; /* 모달보다 높은 z-index */
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    padding: 8px;
    background-color: transparent;
    font-weight: bold;
    cursor: pointer;
  }

  .title {
    font-size: 24px;
    padding: 20px;
  }

  .content {
    font-size: 17px;
    text-align: left;

    .content-title {
      font-weight: bold;
      width: 120px;
    }
    .content-item {
      display: flex;
      margin-bottom: 10px;
    }
  }

  .table-container {
    max-height: 200px; /* 테이블 최대 높이 */
    overflow-y: auto; /* 필요할 때 수직 스크롤 표시 */
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 20px;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table th,
  .table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
`;

export default ModalBasic;
