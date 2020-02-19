#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta chart="utf-8" />
  <title>Template</title>
</head>
<body>
  <h1>Hello</h1>
  <p>CLI</p>
</body>
</html>`;

const routerTemplate = `const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;`;

const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const mkdirp = (dir) => {
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = (type, name, directory) => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
        // 터미널에 색을 추가하는 chalk
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(chalk.green(pathToFile, '생성 완료'));
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(chalk.green(pathToFile, '생성 완료'));
    }
  } else {
    console.error(chalk.bold.red('html 또는 express-router 둘 중 하나를 입력하세요.'));
  }
};

let triggered = false;
// version : 프로그램의 버전 설정
// 첫번째인자 : 버전, 두번째인자 : 버전을 보여줄 옵션, 여러개인 경우 ','로 구분
// usage : 명령어의 사용법 설정
// 명령어에 -h,-help를 붙였을때 나타나는 설명서에 표시됨
// []는 필수가 아닌 선택이라는 뜻. 
program
  .version('0.0.1', '-v, --version')
  .usage('[options]');

// command : 명령어 설정
// <>는 필수, type을 안넣으면 에러
// alias : cli template html = cli tmpl html
// action : 실제 동작을 정의하는 메서드
program
  .command('template <type>')
  .usage('--name <name> --path [path]')
  .description('템플릿을 생성합니다.')
  .alias('tmpl')
  .option('-n, --name <name>', '파일명을 입력하세요.', 'index')
  .option('-d, --directory [path]', '생성 경로를 입력하세요', '.')
  .action((type, options) => {
    makeTemplate(type, options.name, options.directory);
    triggered = true;
  });

// *은 와일드카드. 나머지 모든명령어를 의미(template을 제외한 나머지)
program
  .command('*', { noHelp: true })
  .action(() => {
    console.log('해당 명령어를 찾을 수 없습니다.');
    // 설명서를 보여주는 옵션
    program.help();
    triggered = true;
  });

// parse : program객체의 마지막에 붙이는 메서드
// process.argv를 받아서 명령어와 옵션을 파싱
program
  .parse(process.argv);

if (!triggered) {
    // prompt : 인자로 질문목록을 받고, 프로미스를 통해 answer를 반환
    // type : 질문의 종류 (list: 다중택일, input:평범한 답변, confirm:y/n)
    // name : 질문의 이름. 
    // message : 사용자에게 표시되는 문자열
    // choices : type이 checkbox, list등인경우 선택지넣는곳
    // default : 답을 적지 않았을 경우 적용되는 기본값
  inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: '템플릿 종류를 선택하세요.',
    choices: ['html', 'express-router'],
  }, {
    type: 'input',
    name: 'name',
    message: '파일의 이름을 입력하세요.',
    default: 'index',
  }, {
    type: 'input',
    name: 'directory',
    message: '파일이 위치할 폴더의 경로를 입력하세요.',
    default: '.',
  }, {
    type: 'confirm',
    name: 'confirm',
    message: '생성하시겠습니까?',
  }])
    .then((answers) => {
      if (answers.confirm) {
        makeTemplate(answers.type, answers.name, answers.directory);
        console.log(chalk.rgb(128, 128, 128)('터미널을 종료합니다.'));
      }
    });
}