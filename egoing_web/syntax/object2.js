// array, obejct

var f = function () { // js 함수는 처리해야 될 일에 대한 정보를 담고 있는 일종의 구문(statement) / 값
  console.log(1+2); // 처리 방법들
  console.log(1+1);
}
console.log(f);
f();
// var i = if(true) {console.log(1)};  // if라는 조건문이라는 구문이 값이 아님
// var w = while(true) {console.log(1)};

var a = [f];
a[0](); // 배열의 원소로써 함수가 존재할 수 있음

var o = {
  func:f
}
o.func();
