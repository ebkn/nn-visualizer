import React, { Component } from 'react';

// サイズを調整するためのクラス
class Seeker extends Component {
  updateSize(size) {
    this.props.updateSize(size);
  }

  // サイズの制限を指定
  invalidSize(key, value) {
    const limits = {
      'outputSize': 5,
      'dataSize': 10,
      'middleLayerSize1': 20,
      'middleLayerSize2': 20,
    };
    return value > limits[key] || value < 1;
  }

  render() {
    const { size } = this.props;
    const renderPairs = [
      ['クラスタの数', 'outputSize'],
      ['教師データ数', 'dataSize'],
      ['中間層1', 'middleLayerSize1'],
      ['中間層2', 'middleLayerSize2'],
    ];
    // 入力ベクトルのサイズは画像(100*100)
    // ['入力ベクトル', 'inputSize'],
    return (
      <div className="container d-flex justify-content-around py-3 border">
        { renderPairs.map((_pair, i) => (
          <div key={i} className="px-4 py-1">
            <div className="py-2 text-center">{_pair[0]}</div>
            <input
              type="number"
              value={Number(size[_pair[1]])}
              onChange={e => {
                if (this.invalidSize(_pair[1], e.target.value)) {
                  return;
                }
                size[_pair[1]] = Number(e.target.value);
                this.updateSize(size)
              }}
              className="text-center"
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Seeker;
