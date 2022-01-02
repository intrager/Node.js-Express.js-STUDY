//  Math: js가 내장하고 있는 객체 // round(반올림) 라는 함수도 js에 내장돼있음.
console.log(Math.round(1.6));  // 2
console.log(Math.round(1.4));  // 1

function sum(first, second) { // parameter, 입력 값에 따라 console로 출력되는 결과가 달라짐.
  console.log('A');
  return first + second;  // result로 함수의 실행을 멈추고, 즉시 first + second의 값을 반환함
  console.log('B'); // return문 때문에 얘는 패스
}
console.log(sum(2,4)); // 6  // argument, 인자

// Math.round(1.6) 이 함수의 출력을 받아서 다양하게 활용 가능
/*
filewrite('result.txt', Math.round(1.6)); // 가짜임
console.log(Math.round(1.6));
email('egoing@aaa.com', Math.round(1.6)); // 가짜임
*/
