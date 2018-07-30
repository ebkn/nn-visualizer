// teacher dataSize
const dataSize = 4;// 教師データの個数
const inputSize = 3;//入力ベクトルのサイズ
const middleLayerSize1 = 6;//中間層のサイズ
const middleLayerSize2 = 6;//中間層のサイズ
const outputSize = 2;//出力ベクトルのサイズ

let W1 = new Array(inputSize);
let W2 = new Array(middleLayerSize1);
let W3 = new Array(middleLayerSize2);

// コードの短縮のためまとめた
const calcPairs = [
  [inputSize, middleLayerSize1, W1],
  [middleLayerSize1, middleLayerSize2, W2],
  [middleLayerSize2, outputSize, W3],
];

// 初期化
for (let calcPair of calcPairs) {
  for (let i=0; i<calcPair[0]; i++) {
    calcPair[2][i] = new Array(calcPair[1]).fill(0);
  }
}
for (let calcPair of calcPairs) {
  for (let i=0; i<calcPair[0]; i++) {
    for (let j=0; j<calcPair[1]; j++) {
      calcPair[2][i][j] = Math.random();
    }
  }
}

// 教師データ。入力と出力のペア
// const teacher = [
//   [1,0,0], [1, 1, 1], [0, 1, 1], [1, 0, 1]
// ];
// const answer = [
//   [1, 0], [0, 1], [0, 1], [1, 0]
// ];
// // テストデータ
// const testInput = [1, 0, 0];
const teacher = [
];
