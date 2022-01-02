var number = [1,400,12,34];
var i = 0;

var total = 0;

while(i < number.length) {  // 배열의 개수와 while 조건문에다가 (만약에ㅇㅇ)설정한 정적인 값이 있을 때  배열 개수 < 정적값이라면 출력 시 끝에는 undefined가 뜸.
  console.log(number[i]);
  total = total + number[i];
  i = i + 1;
}
console.log(`total : ${total}`);
