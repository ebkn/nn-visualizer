import React, { Component } from 'react';

class StartButton extends Component {
  render() {
    return (
      <button
        onClick={() => this.props.startLearning()}
      >
        学習させる
      </button>
    );
  }
}
export default StartButton;
