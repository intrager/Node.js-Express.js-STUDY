/*
function a() {
  console.log('A');
}
*/
// a라는 변수의 값으로써 함수를 정하고 있다. js에서는 함수가 값이다.
var a = function() {  // 이름이 없는 익명 함수.
  console.log('A');
}
// a();  // 변수 a 뒤에 () 기호를 넣음으로써, a라는 변수가 담고 있는 값인 함수를 실행할 수 있다.

// 이 기능에 대한 실행이 끝난 다음에, 이 기능을 실행한 쪽에게 함수의 실행이 끝났으니까 그 다음 일을 하세요
function slowfunc(callback) { // 콜백 받고
  callback(); // 콜백 실행
}

slowfunc(a); // 이 함수가 실행이 되고, callback이라는 파라미터는 a가 가리키는 함수를 갖게 됨.
// 그러고 나서 slowfunc 함수 안(body)에서 callback이라는 함수를 호출하면, 저 a가 가리키는 함수 body에 있는 console.log('A')가 실행됨.
