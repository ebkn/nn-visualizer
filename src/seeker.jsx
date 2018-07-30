import React, { Component } from 'react';

// サイズを調整するためのクラス
class Seeker extends Component {
  updateSize(size) {
    this.props.updateSize(size);
  }

  render() {
    const { size } = this.props;
    const renderPairs = [
      ["教師データの個数", size.dataSize],
      ["入力ベクトル", size.dataSize],
      ["中間層1", size.middleLayerSize1],
      ["中間層2", size.middleLayerSize2],
      ["出力ベクトル", size.outputSize],
    ];
    return (
      <div className="container-fluid">
        { renderPairs.map((_pair, i) => (
          <div key={i} className="row px-4 py-1">
            <div className="col-8">{_pair[0]}</div>
            <input
              type="number"
              value={_pair[1]}
              onChange={e => {
                _pair[1] = Number(e.target.value);
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
