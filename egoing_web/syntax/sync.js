var fs = require('fs');

/*
// readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

console.log('A');
// 함수를 세 번째 인자로 줘야함
// 노드js가 syntax/sample.txt 파일을 읽는 작업이 끝나면 세 번째 인자로 준 저 함수를 실행시키면서, 첫 번째 인자에는 err가 있다면 err를 인자로 제공. 두 번째 파라미터에는 파일의 내용을 인자로써 공급해주도록 약속돼있음.
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){ //syntax/sample.txt를 읽어와. 근데 시간이 걸리니까 작업이 끝나거든 (내가)전달한 세 번째 인자인 function(err, result){ console.log(result); } 를 실행시키셈. -> 내부적으로 실행시킬 거임. -> 이 작업이 끝난 다음에 처리할 일을 ->
  console.log(result);  // 여기에다가 배치해놓으면 거기(result)있는 작업이 처리가 될 거다. -> callback
}); // 비동기일 때 이 부분이 실행이 되면서 console.log('C')를 바로 실행하러 갈 거임. 즉, 출력은 console.log('C')가 먼저 나올 것.
// readFileSync일 때에는(동기) AB C
// readFile일 때는(비동기) ACB
console.log('C');
