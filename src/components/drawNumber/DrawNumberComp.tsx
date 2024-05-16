
import React, { useState } from 'react';
import styled from 'styled-components';

interface LottoGeneratorProps {
  numSets: number;
}

const DrawNumberComp: React.FC<LottoGeneratorProps> = ({ numSets }) => {
  const [lottoSets, setLottoSets] = useState<number[][]>(Array.from({ length: numSets }, () => [0, 0, 0, 0, 0, 0]));
  const [generated, setGenerated] = useState<boolean>(false);

  const generateRandomNumbers = (): number[] => {
    const lottoNumbers: number[] = [];
    while (lottoNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      if (!lottoNumbers.includes(randomNumber)) {
        lottoNumbers.push(randomNumber);
      }
    }
    return lottoNumbers;
  };

  const handleButtonClick = () => {
    if (!generated) {
      const newLottoSets = Array.from({ length: numSets }, () => generateRandomNumbers());
      setLottoSets(newLottoSets);
      setGenerated(true);
    } else {
      setLottoSets(Array.from({ length: numSets }, () => [0, 0, 0, 0, 0, 0]));
      setGenerated(false);
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <div className="imgLogo">
            <img src="gamelogo.png" alt="" />
            <h3>LOTTO</h3>
            <h4>00/00</h4>
            <img src="QRCode.png" alt="" />
          </div>
        </div>
        <div>
          <h1>제 0000 회</h1>
          <p>발행일 : 0000 / 00 / 00 (토) 18:20:10</p>
          <p>추첨일 : 0000 / 00 / 00 (토) HR :20987</p>
          <p>0000 0000 0000 0000 0000 0000</p>
          <p>12345678ABCDE 0000000/000000</p>
        </div>
        <Button className="button" onClick={handleButtonClick}>
          {generated ? '다시 뽑기' : '번호 뽑기'}
        </Button>
      </Header>
      <Section>
        {lottoSets.map((lottoSet, index1) => (
          // eslint-disable-next-line react/no-array-index-key
          <NumBoxRow className="numboxRow" key={index1}>
            <span>{String.fromCharCode(65 + index1)}</span>
            <p>자 동</p>
            {lottoSet.map((number, index2) => (
              // eslint-disable-next-line react/no-array-index-key
              <NumberContainer key={`${index1}-${index2}`} rotated={generated}>
                <div>{generated ? '' : '??'}</div>
                <LottoNumber className="lotteryNum">{generated ? number : ''}</LottoNumber>
              </NumberContainer>
            ))}
          </NumBoxRow>
        ))}
      </Section>
      <Section>
        <Footer>
          <div className="price">
            <span>금액</span>
            <span>5000 Won</span>
          </div>
          <p className="footerNum">0000 0000 0000 0000 0000 0000</p>
          <div className="qrImgBox">
            <img src="footerQrImg.png" alt="" />
          </div>
        </Footer>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  width: 50%;
  height: 80%;
  padding: 20px;
  border: 2px solid #fff;
  border-radius: 10px;
  background-color: #fff;

  @media screen and (max-width: 760px) {
    /* 모바일 세로 */
    width: 100%;
  }
`;

const Header = styled.div`
  background: linen;
  padding-top: 3rem;
  position: relative;

  div {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  h3 {
    position: relative;
    font-size: 2.3rem;
    z-index: 1;
  }

  h3::before {
    position: absolute;
    content: 'LOTTO';
    bottom: -0.4rem;
    right: -0.4rem;
    color: #fbd9e2;
    opacity: 0.6;
    z-index: -1;
  }

  h4 {
    align-self: flex-end;
    padding-bottom: 1rem;
    padding-left: 0.2rem;
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.3rem;
  }

  img:nth-child(4) {
    width: 5rem;
    height: 5rem;
    margin-left: 1rem;
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: 0;
  right: 0.5rem;
  padding: 0.2rem;
  background: lightcoral;
  border: 2px solid #fadfe6;
  color: white;
  font-weight: normal;
  cursor: pointer;
  z-index: 9999;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); 
  }

  &:active {
    transform: scale(0.9); 
  }
`;

const Section = styled.div`
  background: linen;
  padding: 2rem 0 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  
`;

const Footer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  text-align: center;
  padding: 1rem 0;
  padding-bottom: 2rem;
  div {
    display: flex;
    justify-content: space-around;
    padding-bottom: 0.2rem;
  }
  span {
    font-size: 1.5rem;
    font-weight: bolder;
  }
`;

const NumBoxRow = styled.div`
  width: 100%;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.1rem; /* 각 행 간의 간격 조절 */
  div {
    font-weight: bolder;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.8rem;
    font-weight: 600;
  }

  span {
    width: 1.2rem;
    margin-right: 0.4rem;
    font-size: 1.2rem;
    font-weight: bolder;
  }
`;

const LottoNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
`;

const NumberContainer = styled.div<{ rotated: boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 2rem; /* 숫자의 너비 */
  border: 1px solid #000; /* 테두리 스타일 지정 */
  margin: 0 0.65rem; /* 숫자 사이의 간격 조정 */
  background-color: white;
  transition: transform 0.5s ease; // 회전 애니메이션
  ${({ rotated }) =>
    rotated &&
    `
    transform: rotateX(360deg);
  `}
  @media screen and (max-width: 760px) {
    /* 모바일 세로 */
    width: 100%;
  }
`;
export default DrawNumberComp;

