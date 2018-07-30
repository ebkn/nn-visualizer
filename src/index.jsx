import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import DrawCanvas from './drawCanvas';
import Seeker from './seeker';
import StartButton from './startButton';
import NNCalculator from './nn';

// デフォルトのサイズ
const defaultSize = {
  dataSize: 4,
  inputSize: 100*100,
  middleLayerSize1: 6,
  middleLayerSize2: 6,
  outputSize: 1,
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

  // 学習させる
  startLearning() {
    let calclator = new NNCalculator(this.state.size);
    calclator.run();
  }

  // 指定した数だけキャンバスを描画する
  createCanvases() {
    const { size } = this.state;
    const variety = 3;
    let canvases = [];
    for (let i=0; i<variety; i++) {
      canvases.push(<h3 key={`title${i}`} className="py-1 mb-0">{i}</h3>);
      let children = [];
      for (let n=0; n<size.dataSize; n++) {
        children.push(
          <DrawCanvas
            key={i*size.dataSize+n}
          />
        );
      }
      const parentDiv = (
        <div
          key={`parent${i}`}
          children={children}
          className="d-flex justify-content-between mb-5 border"
        />
      );
      canvases.push(parentDiv);
    }
    return canvases;
  }

  // 描画
  render() {
    const { size } = this.state;
    return (
      <div className="container">
        <h1>Visualizer</h1>
        <Seeker
          size={size}
          updateSize={_size => this.updateSize(_size)}
        />
        {this.createCanvases()}
        <div className="d-flex">
          <StartButton
            startLearning={() => this.startLearning()}
          />
        </div>
      </div>
    );
  }
}
// 全てのHTMLを描画する
render(
  <App />,
  document.getElementById("root"),
);
