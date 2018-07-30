class NNCalculator {
  constructor(size) {
    this.dataSize = size.dataSize;
    this.inputSize = size.inputSize;
    this.middleLayerSize1 = size.middleLayerSize1;
    this.middleLayerSize2 = size.middleLayerSize2;
    this.outputSize = size.outputSize;
    this.W1 = new Array(this.inputSize);
    this.W2 = new Array(this.middleLayerSize1);
    this.W3 = new Array(this.middleLayerSize2);
    // コードの短縮のためまとめた
    this.initializeLayers();
    // 教師データ
    this.teacher = [
      [1,0,0], [1, 1, 1], [0, 1, 1], [1, 0, 1]
    ];
    this.answer = [
      [1, 0], [0, 1], [0, 1], [1, 0]
    ];
    // テストデータ
    this.testInput = [1, 0, 0]
  }

  initializeLayers() {
    for (let calcPair of this.calcPairs()) {
      for (let i=0; i<calcPair[0]; i++) {
        calcPair[2][i] = new Array(calcPair[1]).fill(0);
      }
    }
    for (let calcPair of this.calcPairs()) {
      for (let i=0; i<calcPair[0]; i++) {
        for (let j=0; j<calcPair[1]; j++) {
          calcPair[2][i][j] = Math.random();
        }
      }
    }
  }

  setDatas(data) {
    this.teacher = data.teacher;
    this.answer = data.answer;
  }

  calcPairs() {
    return [
      [this.inputSize, this.middleLayerSize1, this.W1],
      [this.middleLayerSize1, this.middleLayerSize2, this.W2],
      [this.middleLayerSize2, this.outputSize, this.W3],
    ];
  }

  run() {
    // 学習回数
    let repeatCount = 0;
    let loss;
    while (true) {
      // 損失関数を小さくするように線形変換の成分を変えていく。
      loss = this.runNN();
      repeatCount++;

      //損失が十分小さくなったら学習作業をやめる
      if (loss < 0.001) break;
    }

    const output = this.evaluate(this.testInput);

    console.log(`${repeatCount} 回学習しました。`);
    console.log(`${output[0]} : ${output[1]}`);
  }

  // 学習作業（行列W1,W2,W3の値の調節）
  runNN() {
    for (let calcPair of this.calcPairs()) {
      for (let j=0; j<calcPair[1]; j++) {
        for (let i=0; i<calcPair[0]; i++) {
          const der = this.derivative(calcPair[2], i, j);
          if (der<-0.0001 || 0.0001<der) {//微分が0に近いときは扱わない。
            const dx = this.lossFunction() / der;// 損失関数の値を微分で割る
            calcPair[2][i][j] -= this.clump(dx);// dxを引く
          }
        }
      }
    }
    return this.lossFunction();
  }

  // 損失関数
  lossFunction() {
    let loss = 0.0;
    for (let i=0; i<this.dataSize; i++) {
      const output = this.evaluate(this.teacher[i]);
      for (let j=0; j<this.outputSize; j++) {
        loss += (output[j] - this.answer[i][j]) * (output[j] - this.answer[i][j]);
      }
    }
    return loss;
  }

  // 行列wの(i,j)成分に関する微分
  derivative(w, i, j) {
    const tmp = w[i][j];
    const value0 = this.lossFunction();
    w[i][j] += 0.01;
    const value1 = this.lossFunction();
    w[i][j] = tmp;
    return (value1 - value0) / 0.01;
  }

  evaluate(input) {
    let p1 = [];
    let p2 = [];
    let p3 = [];
    for (let j=0; j<this.middleLayerSize1; j++) {
      //線形変換
      p1[j] = 0.0;
      for (let i=0; i<this.inputSize; i++) {
        p1[j] += input[i] * this.W1[i][j];
      }
      //活性化
      p1[j] = this.activation(p1[j]);
    }
    for (let j=0; j<this.middleLayerSize2; j++) {
      //線形変換
      p2[j] = 0.0;
      for (let i=0; i<this.middleLayerSize1; i++) {
        p2[j] += p1[i] * this.W2[i][j];
      }
      //活性化
      p2[j] = this.activation(p2[j]);
    }
    for (let j=0; j<this.outputSize; j++) {
      //線形変換
      p3[j] = 0.0;
      for (let i=0; i<this.middleLayerSize2; i++) {
        p3[j] += p2[i] * this.W3[i][j];
      }
      //活性化
      p3[j] = this.activation(p3[j]);
    }
    return p3;
  }

  // クランピング関数。値を急激に変化させないように制御する。
  clump(x) {
    if (x > 0.1) return 0.1;
    if (x < -0.1) return -0.1;
    return x;
  }
  // 活性化関数
  activation(x) {
    // return Math.max(0,x);// ReLU
    return 1 / (1 + Math.exp(-x));//sigmoid
  }
}
export default NNCalculator;
