import React, { Component } from 'react'

class Result extends Component {
  createResult() {
    const { size, output } = this.props;
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

  render() {
    return (
      <div className="d-flex justify-content-center">
        {this.createResult()}
      </div>
    );
  }
}
export default Result;
