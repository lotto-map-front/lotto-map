import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useFetchDataOne from '@/hooks/useFetchDataOne';

interface PropsType {
  setModalOpen: (arg: boolean) => void;
  selected: number | undefined;
}

function ModalBasic({ setModalOpen, selected }: PropsType) {
  // 해당 판매점 정 보
  const { data, loading } = useFetchDataOne('get', `/lotto-stores/${selected}`, {}, {});
  // 모달 컨트롤
  const closeModal = () => {
    setModalOpen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  // 지도 control

  // 모달 map
  // useEffect(() => {
  //   const { naver } = window;

  //   if (mapRef.current && naver) {
  //     const location = new naver.maps.LatLng(data!.lat, data!.lon);
  //     const map = new naver.maps.Map(mapRef.current, {
  //       center: location,
  //       zoom: 15,
  //     });
  //     if (data) {
  //       const storeName = data.name;
  //       const storeLocation = new naver.maps.LatLng(data.lat, data.lon);

  //       const newMarker = new naver.maps.Marker({
  //         position: storeLocation,
  //         map,
  //         icon: {
  //           content: CustomMapMarker({ title: storeName }),
  //           size: new naver.maps.Size(5, 10),
  //           origin: new naver.maps.Point(0, 0),
  //           anchor: new naver.maps.Point(11, 35),
  //         },
  //         clickable: true,
  //       });
  //       newMarker.setTitle(storeName);
  //     }
  //   }
  // }, []);

  return (
    <ModalContainer>
      <div ref={modalRef} className="container">
        <button type="button" className="close" onClick={closeModal}>
          X
        </button>
        <h3 className="title">{data?.name}</h3>

        {loading ? (
          <div>loading</div>
        ) : (
          <div className="content">
            {/* <div ref={mapRef} style={{ height: '78vh' }} /> */}

            <div className="content-item">
              <div className="content-title">전화번호: </div> {data!.phone ? data!.phone : '전화번호가 없습니다.'}
            </div>
            <div className="content-item">
              <div className="content-title">주소: </div> {data!.address}
            </div>
            <div className="content-item">
              <div className="content-title first-prize">1등 당첨 내역: </div> {data!.first_prize}
            </div>
            <div className="content-item">
              <div className="content-title second-prize">2등 당첨 내역: </div> {data!.second_prize}
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  .container {
    /* 모달창 크기 */
    width: 50%;
    height: 30%;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* 모달창 디자인 */
    background-color: white;
    border: 1px solid black;
    border-radius: 8px;

    padding: 30px;
  }

  .content-item {
    display: flex;
  }

  /* 모달창 내부 X버튼 */
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .content {
    justify-content: left;
    align-items: left;
    font-size: 17px;
    gap: 10px;
  }
  .content-title {
    font-weight: bold;
  }
  .first-prize {
    color: red;
  }
  .second-prize {
    color: blue;
  }
`;

export default ModalBasic;
