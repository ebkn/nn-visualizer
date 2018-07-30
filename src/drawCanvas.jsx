import React, { Component } from 'react';

const WIDTH = 100;
const HEIGHT = 100;
const style = {
  margin: '5px',
  border: '1px solid gray',
  backgroundColor: 'white',
};

class DrawCanvas extends Component {
  constructor(_, state) {
    super();
    let pixels = [];
    for (let j=0; j<HEIGHT; j++) {
      for (let i=0; i<WIDTH; i++) {
        pixels[i] = 0;
      }
    }
    this.state = {
      pixels: pixels,
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
    this.state.pixels = ctx.getImageData(0, 0, WIDTH, HEIGHT).data.filter((_, i) => i%4 == 3);
  }

  startDrawing(x, y) {
    const ctx = this.getContext();
    ctx.beginPath();
    ctx.fillStyle = '#00000';
    ctx.lineWidth = 4;
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
  }

  render() {
    return (
      <canvas
        ref="canvas"
        onMouseDown={e => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        onMouseUp={() => this.endDrawing()}
        onMouseLeave={() => this.endDrawing()}
        onMouseMove={e => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        width={WIDTH}
        height={HEIGHT}
        style={style}
      />
    );
  }
};
export default DrawCanvas;
