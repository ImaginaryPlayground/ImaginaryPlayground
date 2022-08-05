// 1. child-process모듈의 spawn 취득
//child-process의 spawn을 통해 "python print.py" 명령어를 실행하여 파이썬 코드를 구동한다.

const spawn = require('child_process').spawn;

// import로 불러오기 
//import { spawn } from 'child_process';

// 2. spawn을 통해 "python 파이썬파일.py" 명령어 실행
const result = spawn('python', ['print.py']);


// 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
//stdout의 'data' 이벤트 리스터를 통해 결과를 받아서 출력한다.
//위 코드에서 data를 toString()없이 사용하면, 버퍼가 출력되니 주의.

result.stdout.on('data', function(data) {
    console.log(data.toString());
});

// 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
result.stderr.on('data', function(data) {
    console.log(data.toString());
});
