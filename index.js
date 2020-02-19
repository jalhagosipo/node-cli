#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,   // process.stdin : 콘솔입력스트림
  output: process.stdout, // process.stdout : 콘솔출력스트림
});

// 화면 지움
console.clear();

const answerCallback = (answer) => {
  if (answer === 'y') {
    console.log('감사합니다!');
    rl.close();
  } else if (answer === 'n') {
    console.log('죄송합니다!');
    rl.close();
  } else {
    console.clear();
    console.log('y 또는 n만 입력하세요.');
    rl.question('예제가 재미있습니까? (y/n) ', answerCallback);
  }
};

// 첫번째인자 : 질문내용, 두번째인자 : 콜백함수는 답변을 매개변수로 가지고 있음
rl.question('예제가 재미있습니까? (y/n) ', answerCallback);