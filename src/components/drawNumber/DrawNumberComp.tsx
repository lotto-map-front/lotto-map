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
      const newLottoSets = Array.from({ length: numSets }, () => generateRandomNumbers());
      setLottoSets(newLottoSets);
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
            <h3>자 동</h3>
            {lottoSet.map((number, index2) => (
              // eslint-disable-next-line react/no-array-index-key
              <NumberContainer key={`${index1}-${index2}`}>
                <div>{generated ? '' : '??'}</div>
                <LottoNumber className="lotteryNum">{generated ? number : ''}</LottoNumber>
              </NumberContainer>
            ))}
          </NumBoxRow>
        ))}
      </Section>
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
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  width: 50%;
  height: 100%;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 10px;
  background-color: #fff;
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
    padding-bottom: 0.5rem;
  }

  img {
    width: 5rem;
    height: 5rem;
    margin-right: 2rem;
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

  button:active {
    transform: scale(0.8);
    font-size: 90%;
  }
`;

const Section = styled.div`
  background: linen;
`;

const Footer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NumBoxRow = styled.div`
  display: flex;
  align-items: center;
`;

const LottoNumber = styled.div`
  margin: 0 0.7rem; // 각 번호 사이의 간격 조정
  font-size: 1.2rem;
`;

const NumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem; /* 숫자의 너비 */
  height: 2rem; /* 숫자의 높이 */
  border: 1px solid #000; /* 테두리 스타일 지정 */
  margin: 0 0.2rem; /* 숫자 사이의 간격 조정 */
  background-color: white;
`;

export default DrawNumberComp;