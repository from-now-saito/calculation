'use strict';

//input要素の生成
for(let i = 0; i < 25; i++){
  const input = document.createElement('input');
  input.value = 0;  //ここでvalueの初期値を０にしないと、後の計算が進まない
  input.className = 'sourceArg'
  document.querySelector('form').appendChild(input);
}

// 全てのinputタグを配列に格納
const input = Array.from(document.querySelectorAll('.sourceArg'));

// //配列inputの各要素の値を数値データとして配列sourceに格納
const source = input.map(element => parseFloat(element.value));

// 横軸を取得、対応する番号を割り振り
const lateral = [0, 1, 2, 3, 4];
const latSource = ['A', 'B', 'C', 'D', 'E']; //項目を配列に格納
let latNums;

//引数の一文字目に対応する数値を決定
function srcLat(args){
  for(let i = 0; i < latSource.length; i++){
    if(latSource[i] === args.value[0]){
      return lateral[i];
    }
  }
}

//縦軸１～５を取得、対応する番号を割り振り、項目を配列に格納
const vertical = [0, 5, 10, 15, 20];
const verSource = ['1', '2', '3', '4', '5']; 
let verNums; 

//引数の二文字目に対応する数値を決定
function srcVer(args){
  for(let i = 0; i < verSource.length; i++){
    if(verSource[i] === args.value[1]){
      return vertical[i];
    }
  }
}

// 計算に用いるセルを格納
let cells = [];

// 計算結果
let result;

//計算に用いるセルを配列に挿入、演算
function calclation(){
  cells = [];
  const args = Array.from(document.querySelectorAll('.arg')); 
  // 縦軸・横軸それぞれ、対応する番号を格納、和によって何番目のセルか指定する
  latNums = args.map(srcLat);
  verNums = args.map(srcVer);
  for(let i = 0; i < args.length; i++){
    let element = latNums[i] + verNums[i];
    cells.push(element)
  }
  // 結果
  result = calc1(cells);
  calc2(cells);
  document.getElementById('calcRes').textContent = `計算結果は ${result} です。`;
}

//「計算」ボタンをクリックして、計算を実行
document.querySelector('.btn').addEventListener('click', calclation);

// 計算の種類に応じ演算
function calc1(){
  const radios = Array.from(document.getElementById('calc1').querySelectorAll('input'));
  for (let i = 0; i < radios.length; i++) {
    if(radios[i].checked === true){
      if(i === 0){
        return Number(input[cells[0]].value) + Number(input[cells[1]].value);
      }else if(i === 1){
        return Number(input[cells[0]].value) - Number(input[cells[1]].value);
      }else if(i === 2){
        return Number(input[cells[0]].value) * Number(input[cells[1]].value);
      }else if(i === 3){
        return Number(input[cells[0]].value) / Number(input[cells[1]].value);
      }
    }
  }
  if(radios[3].checked === false){
    return 0;
  }
};

// 計算の種類に応じ演算
function calc2(){
  const radios = Array.from(document.getElementById('calc2').querySelectorAll('input'));
  for (let i = 0; i < radios.length; i++) {
    if(radios[i].checked === true){
      if(i === 0){
        result = result + Number(input[cells[2]].value);
        return result;
      }else if(i === 1){
        result = result - Number(input[cells[2]].value);
        return result;
      }else if(i === 2){
        result = result * Number(input[cells[2]].value);
        return result;
      }else if(i === 3){
        result = result / Number(input[cells[2]].value);
        return result;
      }
    }
  }
  if(radios[3].checked === false){
    return result;
  }
};
