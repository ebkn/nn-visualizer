import React, { Component } from 'react';

// サイズを調整するためのクラス
class Seeker extends Component {
  updateSize(size) {
    this.props.updateSize(size);
  }

  // 上限を指定
  invalidSize(key, value) {
    const limits = {
      'dataSize': 10,
      'inputSize': 100*100,
      'middleLayerSize1': 10,
      'middleLayerSize2': 10,
      'outputSize': 10,
    };
    return value > limits[key];
  }

  render() {
    const { size } = this.props;
    const renderPairs = [
      ['教師データの個数', 'dataSize'],
      ['入力ベクトル', 'inputSize'],
      ['中間層1', 'middleLayerSize1'],
      ['中間層2', 'middleLayerSize2'],
      ['出力ベクトル', 'outputSize'],
    ];
    return (
      <div className="container-fluid">
        { renderPairs.map((_pair, i) => (
          <div key={i} className="row px-4 py-1">
            <div className="col-8">{_pair[0]}</div>
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
              className="col-4"
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Seeker;
