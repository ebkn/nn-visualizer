import React, { Component } from 'react';
import DrawCanvas from './DrawCanvas';
import Seeker from './Seeker';
import Canvases from './Canvases';
import Button from './Button';
import NNCalculator from './nn';

// デフォルトのサイズ
const defaultSize = {
  dataSize: 6,
  inputSize: 25*25,
  middleLayerSize1: 10,
  middleLayerSize2: 10,
  outputSize: 3,
};

// メインのクラス
class App extends Component {
  constructor(_, state) {
    super();
    this.state = {
      size: defaultSize,
      teacher: new Array(defaultSize.dataSize*defaultSize.outputSize),
      answer: new Array(defaultSize.dataSize*defaultSize.outputSize),
      testData: new Array(defaultSize.inputSize),
      calculator: null,
      output: [],
    };
    this.initializePixels();
  }

  // サイズの変更を反映させる
  updateSize(_size) {
    const arrayLength = _size.dataSize*_size.outputSize;
    this.setState({ size: _size });
    this.state.teacher = new Array(arrayLength);
    this.state.answer = new Array(arrayLength);
    this.state.testData = new Array(_size.dataSize);
    this.initializePixels();
  }

  initializePixels() {
    const { size, teacher, answer, testData } = this.state;
    for (let i=0; i<size.dataSize*size.outputSize; i++) {
      teacher[i] = new Array(size.inputSize).fill(0);
      answer[i] = new Array(size.outputSize).fill(0);
      answer[i][Math.floor(i/size.dataSize)] = 1;
    }
    this.state.testData = new Array(size.inputSize).fill(0);
  }

  updatePixels(index, pixels) {
    this.state.teacher[index] = pixels;
  }

  setTestPixels(pixels) {
    this.setState({ testData: pixels });
  }

  // 学習させる
  startLearning() {
    this.state.calculator = new NNCalculator(this.state.size);
    this.state.calculator.setDatas(this.state.teacher, this.state.answer);
    this.state.calculator.startLearning();
   }

  // テストデータを使って確認する
  checkTestData() {
    this.setState({ output: this.state.calculator.checkTestData(this.state.testData) });
  }

  createResult() {
    const { size, output } = this.state;
    let children = [];
    for (let i=0; i<size.outputSize; i++) {
      children.push(
        <div key={`result${i}`} className="d-flex align-items-center flex-column mx-4">
          <p>クラスタ[{i}]</p>
          <p>{output[i]}</p>
        </div>
      );
    }
    return (
      <div
        children={children}
        className="d-flex justify-content-center"
      />
    );
  }

  // 描画
  render() {
    const { size } = this.state;
    return (
      <div className="container-fluid mb-4">
        <div className="d-flex justify-content-center py-3">
          <h1>Sketch classifier</h1>
        </div>
        <Seeker
          size={size}
          updateSize={_size => this.updateSize(_size)}
        />
        <Canvases
          size={size}
          updatePixels={(index, pixels) => this.updatePixels(index, pixels)}
        />
        <div className="d-flex justify-content-center">
          <Button
            title={"学習させる"}
            onClick={() => this.startLearning()}
          />
        </div>
        <div className="d-flex justify-content-center mt-5">
          <div className="d-flex align-items-center flex-column">
            <h5>テストデータ</h5>
            <DrawCanvas
              updatePixels={() => {}}
              setTestPixels={pixels => this.setTestPixels(pixels)}
            />
            <Button
              title={"テストする"}
              onClick={() => this.checkTestData()}
            />
            <h5 className="mt-5">結果</h5>
            <div className="d-flex justify-content-center">
              {this.createResult()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
