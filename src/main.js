//teacher dataSize
const dataSize = 4;// 教師データの個数
const inputSize = 3;//入力ベクトルのサイズ
const middleLayerSize1 = 6;//中間層のサイズ
const middleLayerSize2 = 6;//中間層のサイズ
const outputSize = 2;//出力ベクトルのサイズ

// 初期化
let W1 = new Array(inputSize);
let W2 = new Array(middleLayerSize1);
let W3 = new Array(middleLayerSize2);

// コードの短縮のためまとめた
const calcPairs = [
  [inputSize, middleLayerSize1, W1],
  [middleLayerSize1, middleLayerSize2, W2],
  [middleLayerSize2, outputSize, W3],
];
for (let calcPair of calcPairs) {
  for (let i=0; i<calcPair[0]; i++) {
    calcPair[2][i] = new Array(calcPair[1]).fill(0);
  }
}

//教師データ。入力と出力のペア
const teacher = [
  [1,0,0], [1, 1, 1], [0, 1, 1], [1, 0, 1]
];
const answer = [
  [1, 0], [0, 1], [0, 1], [1, 0]
];

const initWeight = () => {
  //実験２：乱数の範囲を変更して，学習回数に変化があるかどうかを観察しよう
  for (let calcPair of calcPairs) {
    for (let i=0; i<calcPair[0]; i++) {
      for (let j=0; j<calcPair[1]; j++) {
        calcPair[2][i][j] = Math.random();
      }
    }
  }
}

const run = () => {
  initWeight();//線形変換を乱数で初期化
  let loss;
  let repeatCount = 0;
  do {
    loss = runNN();// 損失関数を小さくするように線形変換の成分を変えていく。
    repeatCount++;
  } while (loss > 0.001);//損失が十分小さくなったら学習作業をやめる
  console.log("学習回数：" + repeatCount);

  //実験１　インプットデータを自由に設定して，出力が好ましいものかどうかを観察しよう。
  const input = [1, 0, 0];//試しに入力してみる
  const output = evaluate(input);
  console.log(output[0] , output[1]);  //試しの入力に対する出力
}

const activation = x => {
  //実験３：活性化関数をいろいろな式で試してみよう。
  //学習回数に違いはあるだろうか
  //インターネットなどで，ほかの活性化関数についても調べてみよう。
  //return max(0,x);// ReLU
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

const lossFunction = () => {//損失関数
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

run();
