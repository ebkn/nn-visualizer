// 学習結果
let output;
// 学習回数
let repeatCount = 0;

const run = () => {
  let loss;
  while (true) {
    // 損失関数を小さくするように線形変換の成分を変えていく。
    loss = runNN();
    repeatCount++;

    //損失が十分小さくなったら学習作業をやめる
    if (loss < 0.001) break;
  }

  output = evaluate(testInput);
}

run();

document.getElementById("repeatCount").innerHTML = `
  ${repeatCount} 回学習しました。
`;
document.getElementById("output").innerHTML = `
  ${output[0]} : ${output[1]}
`;
