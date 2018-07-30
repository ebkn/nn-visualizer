import React, { Component } from 'react';
import DrawCanvas from './DrawCanvas';

// sizeの数canvasを描画するクラス
class Canvases extends Component {
  createCanvases() {
    const { size } = this.props;
    let canvases = [];
    for (let i=0; i<size.outputSize; i++) {
      canvases.push(this.createTitleEle(i));
      let children = [];
      for (let n=0; n<size.dataSize; n++) {
        children.push(this.createCanvasEle(i*size.dataSize + n));
      }
      canvases.push(this.createParentEle(i, children));
    }
    return canvases;
  }

  // タイトル部分を描画
  createTitleEle(index) {
    return (
      <h5
        key={`title${index}`}
        className="pt-3 pb-1 text-center"
      >クラスタ[{index}]</h5>
    );
  }

  // キャンバス部分を描画
  createCanvasEle(index) {
    return (
      <DrawCanvas
        key={index}
        updatePixels={pixels => this.props.updatePixels(index, pixels)}
        setTestPixels={() => {}}
      />
    );
  }

  // キャンバスの周りを囲う要素を描画
  createParentEle(index, children) {
    return (
      <div
        key={`parent${index}`}
        children={children}
        className="d-flex justify-content-around mb-3 border"
      />
    );
  }

  render() {
    return (
      <div className="container py-1">
        {this.createCanvases()}
      </div>
    );
  }
}
export default Canvases;
