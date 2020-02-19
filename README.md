## node-cli
- CLI(command line interface) 프로그램 만들기

# v0.1
- 'Hello CLI' 문자열 출력
- `npm init` 으로 package.json생성됨
- `#!/usr/bin/env node` : /usr/bin/env의 node 명령어로 이 파일을 실행하라는 뜻 (맨위에 있어야함)
    - 리눅스, 유닉스 기반의 운영체제에서만 동작. 윈도우에서는 단순 주석으로 취급
-   ``` 
    "bin": {
        "cli": "./index.js"
    }
    ```
    - pacakage.json에 추가
    - bin 속성이 콘솔 명령어(`cli`)와 해당 명령어 호출 시 실행 파일(`index.js`)을 설정하는 객체
- `npm i -g` : 현재 패키지를 전역 설치
- `console.log('Hello CLI', process.argv);`추가
    - process.argv로 명령어에 어떤 옵션이 주어졌는지 확인할 수 있음 -> 옵션목록 배열로 표시
    - index.js를 수정했다고해서 다시 설치할 필요는 없음
    - `cli ab cd e`로 확인할 수 있음

## v0.2
- 사용자로부터 입력 받기
- 노드 내장 readline모듈을 통해 사용자로부터 입력을 받고, 그에 따른 결과를 출력
    - y 또는 n을 입력하고 그에따른 결과를 출력