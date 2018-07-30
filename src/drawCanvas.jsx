import React, { Component } from 'react';

const WIDTH = 25;
const HEIGHT = 25;
const style = {
  width: WIDTH*4,
  height: HEIGHT*4,
  margin: '5px',
  border: '1px solid #9E9E9E',
  backgroundColor: 'white',
};

class DrawCanvas extends Component {
  constructor(props, state) {
    super(props);
    this.state = {
      mousePoint: {
        x: null,
        y: null,
      },
      drawing: false,
    };
  }

  getContext() {
    return this.refs.canvas.getContext('2d');
  }

  loadPixels() {
    const ctx = this.getContext();
    // 輝度を取得する
    this.props.updatePixels(ctx.getImageData(0, 0, WIDTH, HEIGHT).data.filter((_, i) => i%4 == 3));
  }

  setTestPixels() {
    const ctx = this.getContext();
    // 輝度を取得する
    this.props.setTestPixels(ctx.getImageData(0, 0, WIDTH, HEIGHT).data.filter((_, i) => i%4 == 3));
  }

  startDrawing(x, y) {
    const ctx = this.getContext();
    ctx.beginPath();
    ctx.fillStyle = '#00000';
    ctx.lineWidth = 1;
    ctx.moveTo(x, y);
    this.setState({ drawing: true, mousePoint: { x, y } });
  }

  draw(x, y) {
    if (!this.state.drawing) {
      return;
    }
    const ctx = this.getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
    this.setState({ mousePoint: { x, y } })
  }

  endDrawing() {
    this.setState({ drawing: false });
    this.loadPixels();
    this.setTestPixels();
  }

  render() {
    return (
      <canvas
        ref="canvas"
        onMouseDown={e => this.startDrawing(e.nativeEvent.offsetX/4, e.nativeEvent.offsetY/4)}
        onMouseUp={() => this.endDrawing()}
        onMouseLeave={() => this.endDrawing()}
        onMouseMove={e => this.draw(e.nativeEvent.offsetX/4, e.nativeEvent.offsetY/4)}
        width={WIDTH}
        height={HEIGHT}
        style={style}
      />
    );
  }
};
export default DrawCanvas;
