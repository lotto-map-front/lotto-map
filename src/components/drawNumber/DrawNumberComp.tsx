import React, { Component } from 'react';

interface LottoGeneratorProps {
  numSets: number;
}

interface LottoGeneratorState {
  lottoSets: number[][];
  generated: boolean;
}

class DrawNumberComp extends Component<LottoGeneratorProps, LottoGeneratorState> {
  constructor(props: LottoGeneratorProps) {
    super(props);
    // 초기 상태 설정: 5세트의 ??로 된 번호와 번호 생성 여부
    this.state = {
      lottoSets: Array.from({ length: this.props.numSets }, () => [0, 0, 0, 0, 0, 0]),
      generated: false,
    };
  }

  generateRandomNumbers = (): number[] => {
    const lottoNumbers: number[] = [];
    while (lottoNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      if (!lottoNumbers.includes(randomNumber)) {
        lottoNumbers.push(randomNumber);
      }
    }
    return lottoNumbers;
  };

  // 번호 뽑기 버튼 클릭 시 호출되는 함수
  handleButtonClick = () => {
    // 번호가 생성되지 않은 상태일 때만 번호 생성하도록 변경
    if (!this.state.generated) {
      // 새로운 번호 생성
      const newLottoSets: number[][] = [];
      for (let i = 0; i < this.props.numSets; i++) {
        newLottoSets.push(this.generateRandomNumbers());
      }
      // 생성된 번호와 버튼 텍스트 업데이트
      this.setState({
        lottoSets: newLottoSets,
        generated: true, // 번호가 생성되었음을 표시
      });
    } else {
      // 번호가 생성된 상태일 때는 다시 뽑기 기능 수행
      // 여기서는 추가적인 기능 없이 번호만 다시 생성
      const newLottoSets: number[][] = [];
      for (let i = 0; i < this.props.numSets; i++) {
        newLottoSets.push(this.generateRandomNumbers());
      }
      // 생성된 번호 업데이트
      this.setState({
        lottoSets: newLottoSets,
      });
    }
  };

  componentDidMount() {
    // 컴포넌트가 마운트된 후에는 번호 생성하지 않고 초기화만 수행
    this.setState({
      generated: false, // 번호 생성 여부 초기화
    });
  }

  render() {
    const { lottoSets, generated } = this.state;

    return (
      <div>
        <h2>Lotto Numbers</h2>
        {lottoSets.map((lottoSet, index) => (
          <div key={index}>
            <strong>Set {index + 1}:</strong>{' '}
            {lottoSet.map((number, index) => (
              <span key={index}>{generated ? number : '??'} </span>
            ))}
          </div>
        ))}
        {/* 번호 뽑기 버튼 */}
        <button onClick={this.handleButtonClick}>
          {generated ? '다시 뽑기' : '번호 뽑기'}
        </button>
      </div>
    );
  }
}

export default DrawNumberComp;
