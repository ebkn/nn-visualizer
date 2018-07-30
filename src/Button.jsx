import React, { Component } from 'react';

// ボタンを描画するクラス
class Button extends Component {
  render() {
    return (
      <button
        onClick={() => this.props.onClick()}
        className="d-block px-5 py-2 bg-info white-text"
      >
        {this.props.title}
      </button>
    );
  }
}
export default Button;
