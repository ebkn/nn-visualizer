// ニューラルネットワークの計算

// 学習作業（行列W1,W2,W3の値の調節）
const runNN = () => {
  //println("loss = "+lossFunction());
  for (let calcPair of calcPairs) {
    for (let j=0; j<calcPair[1]; j++) {
      for (let i=0; i<calcPair[0]; i++) {
        const der = derivative(calcPair[2], i, j);
        if (der<-0.0001 || 0.0001<der) {//微分が0に近いときは扱わない。
          const dx = lossFunction() / der;// 損失関数の値を微分で割る
          calcPair[2][i][j] -= clump(dx);// dxを引く
        }
      }
    }
  }
  return lossFunction();
}

// 損失関数
const lossFunction = () => {
  let loss = 0.0;
  for (let i=0; i<dataSize; i++) {
    const output = evaluate(teacher[i]);
    for (let j=0; j<outputSize; j++) {
      loss += (output[j] - answer[i][j]) * (output[j] - answer[i][j]);
    }
  }
  return loss;
}

// 行列wの(i,j)成分に関する微分
const derivative = (w, i, j) => {
  const tmp = w[i][j];
  const value0 = lossFunction();
  w[i][j] += 0.01;
  const value1 = lossFunction();
  w[i][j] = tmp;
  return (value1 - value0) / 0.01;
}

// クランピング関数。値を急激に変化させないように制御する。
const clump = x => {
  if (x > 0.1) return 0.1;
  if (x < -0.1) return -0.1;
  return x;
}

// 活性化関数
const activation = x => {
  // return Math.max(0,x);// ReLU
  return 1 / (1 + Math.exp(-x));//sigmoid
}

const evaluate = input => {
  let p1 = [];
  let p2 = [];
  let p3 = [];
  for (let j=0; j<middleLayerSize1; j++) {
    //線形変換
    p1[j] = 0.0;
    for (let i=0; i<inputSize; i++) {
      p1[j] += input[i] * W1[i][j];
    }
    //活性化
    p1[j] = activation(p1[j]);
  }
  for (let j=0; j<middleLayerSize2; j++) {
    //線形変換
    p2[j] = 0.0;
    for (let i=0; i<middleLayerSize1; i++) {
      p2[j] += p1[i] * W2[i][j];
    }
    //活性化
    p2[j] = activation(p2[j]);
  }
  for (let j=0; j<outputSize; j++) {
    //線形変換
    p3[j] = 0.0;
    for (let i=0; i<middleLayerSize2; i++) {
      p3[j] += p2[i] * W3[i][j];
    }
    //活性化
    p3[j] = activation(p3[j]);
  }
  return p3;
}
