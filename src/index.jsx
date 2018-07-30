import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Seeker from './seeker';

// デフォルトのサイズ
const defaultSize = {
  dataSize: 4,
  inputSize: 3,
  middleLayerSize1: 6,
  middleLayerSize2: 6,
  outputSize: 2,
};

// メインのクラス
class App extends Component {
  constructor(_, state) {
    super();
    this.state = { size: defaultSize };
  }

  // サイズの変更を反映させる
  updateSize(_size) {
    this.setState({ size: _size });
  }

  // 描画
  render() {
    return (
      <div className="container">
        <h1>Visualizer</h1>
        <Seeker
          size={this.state.size}
          updateSize={_size => this.updateSize(_size)}
        />
      </div>
    );
  }
}
// 全てのHTMLを描画する
render(
  <App />,
  document.getElementById("root"),
);
